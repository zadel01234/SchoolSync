"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { FaSchool, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { GraduationCap } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UserRole } from "@/types";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Role definitions                                                   */
/* ------------------------------------------------------------------ */
const roles: {
  role: UserRole;
  label: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  border: string;
  ring: string;
}[] = [
  {
    role: "school_admin",
    label: "School Owner / Admin",
    description: "Manage students, teachers, fees, and all school operations",
    icon: <FaSchool className="h-10 w-10 text-indigo-500" />,
    gradient: "from-indigo-500/10 to-violet-500/10",
    border: "border-indigo-300 dark:border-indigo-700",
    ring: "ring-indigo-500/40",
  },
  {
    role: "teacher",
    label: "Teacher",
    description: "Mark attendance, post assignments, and manage classes",
    icon: <FaChalkboardTeacher className="h-10 w-10 text-emerald-500" />,
    gradient: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-300 dark:border-emerald-700",
    ring: "ring-emerald-500/40",
  },
  {
    role: "parent",
    label: "Parent / Guardian",
    description: "Track your child's attendance, fees, and academic results",
    icon: <HiUsers className="h-10 w-10 text-amber-500" />,
    gradient: "from-amber-500/10 to-orange-500/10",
    border: "border-amber-300 dark:border-amber-700",
    ring: "ring-amber-500/40",
  },
  {
    role: "student",
    label: "Student",
    description: "View your timetable, assignments, and exam results",
    icon: <FaUserGraduate className="h-10 w-10 text-blue-500" />,
    gradient: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-300 dark:border-blue-700",
    ring: "ring-blue-500/40",
  },
];

/* ------------------------------------------------------------------ */
/*  Detail-form fields per role                                        */
/* ------------------------------------------------------------------ */
interface DetailField {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}

const detailFieldsByRole: Record<string, DetailField[]> = {
  school_admin: [
    { name: "schoolName", label: "School name", placeholder: "e.g. Greenfield Academy", required: true },
    { name: "schoolAddress", label: "School address", placeholder: "e.g. 14 Victoria Island, Lagos" },
    { name: "phone", label: "Phone number", placeholder: "+234 800 000 0000", type: "tel" },
  ],
  teacher: [
    { name: "schoolName", label: "School name", placeholder: "e.g. Greenfield Academy", required: true },
    { name: "subject", label: "Primary subject", placeholder: "e.g. Mathematics" },
    { name: "classAssigned", label: "Class assigned", placeholder: "e.g. JSS 2A" },
  ],
  parent: [
    { name: "schoolName", label: "Child's school", placeholder: "e.g. Greenfield Academy", required: true },
    { name: "childName", label: "Child's full name", placeholder: "e.g. Adebayo Johnson", required: true },
    { name: "childClass", label: "Child's class", placeholder: "e.g. Primary 4" },
  ],
  student: [
    { name: "schoolName", label: "School name", placeholder: "e.g. Greenfield Academy", required: true },
    { name: "className", label: "Your class", placeholder: "e.g. SS 1B", required: true },
    { name: "admissionNumber", label: "Admission number", placeholder: "e.g. STU/2025/001" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/* ------------------------------------------------------------------ */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function SelectRolePage() {
  const router = useRouter();
  const { completeSetup, user } = useAuthStore();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [details, setDetails] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Go to step 2 */
  const handleNext = () => {
    if (!selectedRole) return;
    setDirection(1);
    setStep(2);
  };

  /* Back to step 1 */
  const handleBack = () => {
    setDirection(-1);
    setStep(1);
  };

  /* Submit and complete setup */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setIsSubmitting(true);

    // Simulate a brief save delay
    setTimeout(() => {
      completeSetup(selectedRole, details.schoolName);

      // Route to the correct dashboard
      if (selectedRole === "super_admin" || selectedRole === "school_admin") {
        router.push("/dashboard/admin");
      } else {
        router.push(`/dashboard/${selectedRole}`);
      }
    }, 600);
  };

  const currentFields = selectedRole ? detailFieldsByRole[selectedRole] ?? [] : [];
  const requiredFieldsFilled = currentFields
    .filter((f) => f.required)
    .every((f) => details[f.name]?.trim());

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 bg-[hsl(var(--background))]">
      <div className="w-full max-w-lg">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300",
                  step >= s
                    ? "gradient-primary text-white shadow-md"
                    : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                )}
              >
                {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
              </div>
              <span
                className={cn(
                  "text-sm font-medium hidden sm:inline transition-colors",
                  step >= s
                    ? "text-[hsl(var(--foreground))]"
                    : "text-[hsl(var(--muted-foreground))]"
                )}
              >
                {s === 1 ? "Select role" : "Your details"}
              </span>
              {s < 2 && (
                <div
                  className={cn(
                    "h-px w-10 transition-colors duration-300",
                    step > 1 ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--border))]"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary shadow-lg">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
        </motion.div>

        <AnimatePresence mode="wait" custom={direction}>
          {/* ------------------------------------------------- */}
          {/*  STEP 1 — Choose Role                              */}
          {/* ------------------------------------------------- */}
          {step === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
                  How will you use SchoolSync?
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">
                  {user?.firstName ? `Hi ${user.firstName}! ` : ""}Select your role to personalise your experience
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {roles.map((r, index) => {
                  const isSelected = selectedRole === r.role;
                  return (
                    <motion.button
                      key={r.role}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.06 }}
                      type="button"
                      onClick={() => setSelectedRole(r.role)}
                      className={cn(
                        "group relative flex flex-col items-center gap-2.5 rounded-2xl border-2 bg-gradient-to-br p-5 text-center transition-all duration-200",
                        "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                        r.gradient,
                        isSelected
                          ? `${r.border} ring-2 ${r.ring} shadow-lg scale-[1.02]`
                          : "border-transparent"
                      )}
                    >
                      {/* Selected checkmark */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2.5 right-2.5"
                        >
                          <CheckCircle2 className="h-5 w-5 text-[hsl(var(--primary))]" />
                        </motion.div>
                      )}

                      <div className="flex items-center justify-center p-2">{r.icon}</div>
                      <div>
                        <p className="font-heading font-semibold text-[hsl(var(--foreground))] text-sm">
                          {r.label}
                        </p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5 leading-relaxed">
                          {r.description}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <Button
                size="lg"
                className="w-full"
                disabled={!selectedRole}
                onClick={handleNext}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* ------------------------------------------------- */}
          {/*  STEP 2 — Fill Details                              */}
          {/* ------------------------------------------------- */}
          {step === 2 && selectedRole && (
            <motion.div
              key="step-2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
                  Almost there!
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">
                  Fill in a few details to set up your{" "}
                  <span className="font-medium text-[hsl(var(--foreground))]">
                    {roles.find((r) => r.role === selectedRole)?.label}
                  </span>{" "}
                  account
                </p>
              </div>

              {/* Selected role badge */}
              <div className="flex items-center justify-center">
                <div
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border bg-gradient-to-r",
                    roles.find((r) => r.role === selectedRole)?.gradient,
                    roles.find((r) => r.role === selectedRole)?.border
                  )}
                >
                  <span className="flex items-center scale-75">
                    {roles.find((r) => r.role === selectedRole)?.icon}
                  </span>
                  {roles.find((r) => r.role === selectedRole)?.label}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {currentFields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.08 }}
                  >
                    <Input
                      label={field.label}
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={details[field.name] || ""}
                      onChange={(e) =>
                        setDetails((prev) => ({
                          ...prev,
                          [field.name]: e.target.value,
                        }))
                      }
                    />
                  </motion.div>
                ))}

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={handleBack}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-[2]"
                    loading={isSubmitting}
                    disabled={!requiredFieldsFilled}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Started
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <p className="text-center text-xs text-[hsl(var(--muted-foreground))] mt-8">
          You can change your role later from Settings
        </p>
      </div>
    </div>
  );
}

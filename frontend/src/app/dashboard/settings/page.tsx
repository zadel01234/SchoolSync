"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { School, Upload, Save, CheckCircle2, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth-store";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // School profile form
  const [schoolForm, setSchoolForm] = useState({
    name: "Greenfield Academy",
    email: "admin@greenfield.edu.ng",
    phone: "+234 801 234 5678",
    address: "12 Education Lane, Lagos",
    session: "2025/2026",
    term: "First Term",
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleUploadLogo = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (PNG, JPG).");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }, 1000);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-heading font-bold">Settings</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Manage your school profile and system preferences</p>
      </motion.div>

      {/* Profile Card */}
      {user && (
        <motion.div variants={staggerItem}>
          <Card padding="md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex items-center gap-4">
                <UserAvatar name={`${user.firstName} ${user.lastName}`} src={user.avatar} size="lg" />
                <div>
                  <p className="font-semibold text-lg">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">{user.email}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] capitalize mt-0.5">{user.role.replace("_", " ")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* School Profile */}
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><School className="h-5 w-5" />School Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <form onSubmit={handleSaveChanges}>
              {/* Logo upload */}
              <div className="flex items-center gap-4 mb-6">
                {logoPreview ? (
                  <div className="h-20 w-20 rounded-xl overflow-hidden border border-[hsl(var(--border))]">
                    <img src={logoPreview} alt="School logo" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                    <School className="h-8 w-8" />
                  </div>
                )}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button type="button" variant="outline" size="sm" leftIcon={<Upload className="h-4 w-4" />} onClick={handleUploadLogo}>
                    Upload Logo
                  </Button>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                    {logoPreview ? "✓ Logo selected" : "PNG, JPG up to 2MB"}
                  </p>
                </div>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="School Name"
                  value={schoolForm.name}
                  onChange={(e) => setSchoolForm({ ...schoolForm, name: e.target.value })}
                />
                <Input
                  label="Email"
                  type="email"
                  value={schoolForm.email}
                  onChange={(e) => setSchoolForm({ ...schoolForm, email: e.target.value })}
                />
                <Input
                  label="Phone Number"
                  value={schoolForm.phone}
                  onChange={(e) => setSchoolForm({ ...schoolForm, phone: e.target.value })}
                />
                <Input
                  label="Address"
                  value={schoolForm.address}
                  onChange={(e) => setSchoolForm({ ...schoolForm, address: e.target.value })}
                />
                <Input
                  label="Current Session"
                  value={schoolForm.session}
                  onChange={(e) => setSchoolForm({ ...schoolForm, session: e.target.value })}
                />
                <Input
                  label="Current Term"
                  value={schoolForm.term}
                  onChange={(e) => setSchoolForm({ ...schoolForm, term: e.target.value })}
                />
              </div>

              {/* Save button */}
              <div className="flex items-center justify-end gap-3 pt-4">
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-sm text-[hsl(var(--success))] font-medium"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Changes saved!
                  </motion.div>
                )}
                <Button type="submit" leftIcon={<Save className="h-4 w-4" />} loading={isSaving}>
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div variants={staggerItem}>
        <Card padding="md" className="border-[hsl(var(--destructive))]/30">
          <CardHeader>
            <CardTitle className="text-[hsl(var(--destructive))]">Account</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">Sign out of your SchoolSync account on this device.</p>
            <Button variant="destructive" leftIcon={<LogOut className="h-4 w-4" />} onClick={handleLogout}>
              Log Out
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

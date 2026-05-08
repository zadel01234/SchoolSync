import { z } from "zod";

/**
 * SchoolSync Zod Validation Schemas
 */

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/\d/, "Must contain a number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const otpSchema = z.object({
  code: z.string().length(6, "OTP must be 6 digits").regex(/^\d+$/, "OTP must contain only numbers"),
});

export const studentEnrollmentSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  middleName: z.string().optional(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female"]),
  classId: z.string().min(1, "Please select a class"),
  parentEmail: z.string().email("Please enter parent email"),
  parentPhone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().optional(),
  bloodGroup: z.string().optional(),
});

export const schoolProfileSchema = z.object({
  name: z.string().min(2, "School name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Address is required"),
  type: z.enum(["primary", "secondary", "both"]),
  currentSession: z.string().min(1, "Session is required"),
  currentTerm: z.enum(["first", "second", "third"]),
});

export const feeSetupSchema = z.object({
  name: z.string().min(2, "Fee name is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  term: z.string().min(1, "Term is required"),
  session: z.string().min(1, "Session is required"),
  classIds: z.array(z.string()).min(1, "Select at least one class"),
  description: z.string().optional(),
});

export const announcementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  targetRoles: z.array(z.string()).min(1, "Select at least one audience"),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type OTPFormData = z.infer<typeof otpSchema>;
export type StudentEnrollmentFormData = z.infer<typeof studentEnrollmentSchema>;
export type SchoolProfileFormData = z.infer<typeof schoolProfileSchema>;
export type FeeSetupFormData = z.infer<typeof feeSetupSchema>;
export type AnnouncementFormData = z.infer<typeof announcementSchema>;

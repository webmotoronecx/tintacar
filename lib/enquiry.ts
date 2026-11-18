import { z } from "zod";

// Shared contract for the store enquiry form and /api/enquiry
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.email("Please enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .max(20)
    .regex(/^[0-9+()\s-]*$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(5, "Please enter a message").max(2000),
  store: z.string().trim().max(100).optional().or(z.literal("")),
  // Honeypot: real visitors never see or fill this field
  company: z.string().max(200).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type EnquiryResponse = {
  success: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof EnquiryInput, string>>;
};

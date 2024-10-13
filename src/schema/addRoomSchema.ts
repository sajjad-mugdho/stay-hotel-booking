import * as z from "zod";

const RoomAddSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  bedCount: z
    .string()
    .transform((val) => parseInt(val, 10)) // Convert to number
    .refine((val) => !isNaN(val), { message: "Must be a valid number" })
    .refine((val) => val >= 0, {
      message: "Bed count must be a non-negative integer",
    }),
  bedRoomCount: z
    .string()
    .transform((val) => parseInt(val, 10)) // Convert to number
    .refine((val) => !isNaN(val), { message: "Must be a valid number" })
    .refine((val) => val >= 0, {
      message: "Bedroom count must be a non-negative integer",
    }),
  guestCount: z
    .string()
    .transform((val) => parseInt(val, 10)) // Convert to number
    .refine((val) => !isNaN(val), { message: "Must be a valid number" })
    .refine((val) => val >= 0, {
      message: "Guest count must be a non-negative integer",
    }),
  bathroomCount: z
    .string()
    .transform((val) => parseInt(val, 10)) // Convert to number
    .refine((val) => !isNaN(val), { message: "Must be a valid number" })
    .refine((val) => val >= 0, {
      message: "Bathroom count must be a non-negative integer",
    }),
  kingBed: z
    .string()
    .transform((val) => parseInt(val, 10)) // Convert to number
    .refine((val) => !isNaN(val), { message: "Must be a valid number" })
    .refine((val) => val >= 0, {
      message: "King bed count must be a non-negative integer",
    }),
  queenBed: z
    .string()
    .transform((val) => parseInt(val, 10)) // Convert to number
    .refine((val) => !isNaN(val), { message: "Must be a valid number" })
    .refine((val) => val >= 0, {
      message: "Queen bed count must be a non-negative integer",
    }),
  image: z.string().min(3, { message: "Image is required" }),
  roomPrice: z
    .string()
    .transform((val) => parseFloat(val)) // Convert to float
    .refine((val) => !isNaN(val), { message: "Must be a valid number" })
    .refine((val) => val >= 0, {
      message: "Room price must be a non-negative number",
    }),
  breakFastPrice: z
    .string()
    .transform((val) => parseFloat(val)) // Convert to float
    .refine((val) => !isNaN(val), { message: "Must be a valid number" })
    .refine((val) => val >= 0, {
      message: "Breakfast price must be a non-negative number",
    }),
  roomService: z.boolean().optional(),
  tv: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  airCondition: z.boolean().optional(),
  heating: z.boolean().optional(),
  balcony: z.boolean().optional(),
  oceanView: z.boolean().optional(),
  mountainView: z.boolean().optional(),
  forestView: z.boolean().optional(),
  soundProof: z.boolean().optional(),
});

type RoomAddSchemaType = z.infer<typeof RoomAddSchema>;

export { RoomAddSchema };
export type { RoomAddSchemaType };

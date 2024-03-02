import * as z from "zod";

const RoomAddSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  bedCount: z
    .number()
    .int()
    .min(0, { message: "Bed count must be a non-negative integer" }),
  bedRoomCount: z
    .number()
    .int()
    .min(0, { message: "Bedroom count must be a non-negative integer" }),
  guestCount: z
    .number()
    .int()
    .min(0, { message: "Guest count must be a non-negative integer" }),
  kingBed: z
    .number()
    .int()
    .min(0, { message: "King bed count must be a non-negative integer" }),
  queenBed: z
    .number()
    .int()
    .min(0, { message: "Queen bed count must be a non-negative integer" }),
  image: z.string().min(3, { message: "Image is required" }),
  roomPrice: z
    .number()
    .min(0, { message: "Room price must be a non-negative number" }),
  breakFastPrice: z
    .number()
    .min(0, { message: "Breakfast price must be a non-negative number" }),
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

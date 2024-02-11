"use client";
import { HotelAddSchema, HotelAddSchemaType } from "@/schema/addHotelSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hotel, Room } from "@prisma/client";
import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { useToast } from "../ui/use-toast";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { Button } from "../ui/button";
import { Loader2, XCircle } from "lucide-react";

export type HotelWithRooms = Hotel & {
  rooms: Room[];
};

interface AddHotelFromProps {
  hotel: HotelWithRooms | null;
}

const AddHotelForm = ({ hotel }: AddHotelFromProps) => {
  const [image, setImage] = useState<string | undefined>(hotel?.image);
  const [imageIsDeleting, setImageIsDeleting] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<HotelAddSchemaType>({
    resolver: zodResolver(HotelAddSchema),
    defaultValues: {
      title: "",
      description: "",
      country: "",
      city: "",
      state: "",
      image: "",
      locationDescription: "",
      gym: false,
      spa: false,
      laundry: false,
      restaurant: false,
      bar: false,
      swimmingPool: false,
      freeWifi: false,
      freeParking: false,
      bikeRental: false,
      movieNight: false,
      coffeeShop: false,
    },
  });

  const onSubmit = (values: HotelAddSchemaType) => {
    console.log(values);
  };

  const handleImageDelete = async (image: string) => {
    setImageIsDeleting(true);
    const imageKey = image.substring(image.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage("");
          toast({
            variant: "default",
            title: "Image Deleted",
            description: "Image has been deleted",
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast({
          variant: "destructive",
          title: "Error Deleting Image",
          description: "Image has not been deleted",
        });
      })
      .finally(() => {
        setImageIsDeleting(false);
      });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h3 className="text-lg font-semibold">
            {hotel ? "Update your hotel" : "Describe your hotel"}
          </h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-1 flex-col gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Title *</FormLabel>

                    <FormControl>
                      <Input placeholder="Beatch Hotel..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a title for your hotel
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Description *</FormLabel>

                    <FormControl>
                      <Textarea
                        placeholder="Beatch Hotel is parked with many awesome amunities..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a title for your hotel
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Checked Box */}

              <div>
                <FormLabel>Choose Amenities</FormLabel>

                <FormDescription>
                  Choose amenities fit in your hotel
                </FormDescription>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <FormField
                    control={form.control}
                    name="gym"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Gym</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="spa"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Spa</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="laundry"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Laundry</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="restaurant"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Restaurant</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bar"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Bar</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="swimmingPool"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Swimming Pool</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="freeWifi"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Free Wifi</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="freeParking"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Parking</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bikeRental"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Bike Rental</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="movieNight"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Movie Night</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coffeeShop"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Coffee Shop</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-3">
                    <FormLabel>Upload Image *</FormLabel>
                    <FormDescription>
                      Upload an image of your Room
                    </FormDescription>

                    <FormControl className="px-5">
                      {image ? (
                        <>
                          <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px]  mt-4">
                            <Image
                              src={image}
                              alt="hotel-image"
                              className="object-contain"
                              width={400}
                              height={400}
                            />
                            <Button
                              onClick={() => handleImageDelete(image)}
                              type="button"
                              size="sm"
                              variant="ghost"
                              className="absolute right-[-12px] top-0"
                            >
                              {imageIsDeleting ? <Loader2 /> : <XCircle />}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col items-center justify-center max-w-[4000px] rounded mt-4 p-12 border-2 border-dotted ">
                            <UploadButton
                              endpoint="imageUploader"
                              onClientUploadComplete={(res) => {
                                console.log("Files: ", res);
                                setImage(res[0].url);
                                toast({
                                  variant: "default",
                                  title: "Image Uploaded",
                                  description: "Image has been uploaded",
                                });
                              }}
                              onUploadError={(error: Error) => {
                                console.log("upload", error);
                                toast({
                                  variant: "destructive",
                                  title: "Erorr Uploading Image",
                                  description: "Image has not been uploaded",
                                });
                              }}
                            />
                          </div>
                        </>
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-1 flex-col gap-6">part-2</div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddHotelForm;

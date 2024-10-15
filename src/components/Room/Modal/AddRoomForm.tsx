"use client";

import CheckboxGroup from "@/components/hotel/SelectItems";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button as Button2 } from "@/components/ui/button-2";
import { toast } from "@/components/ui/use-toast";
import { UploadButton } from "@/lib/uploadthing";
import { RoomAddSchema, RoomAddSchemaType } from "@/schema/addRoomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hotel, Room } from "@prisma/client";
import axios from "axios";
import { Edit, Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type RoomProps = {
  hotel?: Hotel & {
    rooms: Room[];
  };
  room?: Room;
  handleDialogOpen: () => void;
};

const AddRoom = ({ hotel, room, handleDialogOpen }: RoomProps) => {
  const router = useRouter();
  const [image, setImage] = useState<string | undefined>(room?.image);
  const [imageIsDeleting, setImageIsDeleting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const toast = useToast();

  const form2 = useForm<RoomAddSchemaType>({
    resolver: zodResolver(RoomAddSchema),
    // @ts-ignore
    defaultValues: room! || {
      title: "",
      description: "",
      bedCount: "",
      guestCount: "",
      kingBed: "",
      queenBed: "",
      roomPrice: "",
      breakFastPrice: "",
      roomService: false,
      tv: false,
      freeWifi: false,
      airCondition: false,
      heating: false,
      balcony: false,
      oceanView: false,
      mountainView: false,
      forestView: false,
      soundProof: false,
    },
  });

  // const onSubmit2 = (values: RoomAddSchemaType) => {
  //   console.log("values", values);
  //   if (hotel && room) {
  //     //update
  //     setIsLoading(true);
  //     axios
  //       .patch(`/api/room/${room.id}`, values)
  //       .then((res) => {
  //         toast({
  //           variant: "success",
  //           title: "Success",
  //           description: "🎉 Room Edited Successfully",
  //         });
  //         router.refresh();
  //         handleDialogOpen();
  //         setIsLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast({
  //           variant: "destructive",
  //           title: "Error",
  //           description: "Something went wrong",
  //         });
  //         setIsLoading(false);
  //       });
  //   } else {
  //     setIsLoading(true);
  //     console.log("TEST ROOM");
  //     axios
  //       .post("/api/room", { ...values, hotelId: hotel?.id })
  //       .then((res) => {
  //         toast({
  //           variant: "success",
  //           title: "Success",
  //           description: "🎉 Room Created",
  //         });
  //         router.refresh();
  //         handleDialogOpen();
  //         setIsLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast({
  //           variant: "destructive",
  //           title: "Error",
  //           description: "Something went wrong",
  //         });
  //         setIsLoading(false);
  //       });
  //   }
  // };

  useEffect(() => {
    if (typeof image === "string") {
      form2.setValue("image", image, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [image]);

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
            title: " Deleted",
            description: "📌 Image has been deleted",
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

  const handleAddRoom = async () => {
    const formData = form2.getValues();
    console.log("Add Room", formData);

    if (hotel && room) {
      //update
      setIsLoading(true);
      axios
        .patch(`/api/room/${room.id}`, formData)
        .then((res) => {
          toast({
            variant: "success",
            title: "Success",
            description: "🎉 Room Edited Successfully",
          });
          router.refresh();
          handleDialogOpen();
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong",
          });
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      console.log("TEST ROOM");
      axios
        .post("/api/room", { ...formData, hotelId: hotel?.id })
        .then((res) => {
          toast({
            variant: "success",
            title: "Success",
            description: "🎉 Room Created",
          });
          router.refresh();
          handleDialogOpen();
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong",
          });
          setIsLoading(false);
        });
    }
  };
  return (
    <div className="max-h-[75vh] overflow-y-auto scrollbar-hide px-2">
      <Form {...form2}>
        <form className="space-y-6">
          <FormField
            control={form2.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Title *</FormLabel>

                <FormControl>
                  <Input placeholder="Beach room..." {...field} />
                </FormControl>
                <FormDescription>Provide your room name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form2.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Description *</FormLabel>

                <FormControl>
                  <Textarea placeholder="Beach site room..." {...field} />
                </FormControl>
                <FormDescription>
                  Is there anything spacial about your room
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="">
            <FormLabel>Choice room amenities</FormLabel>
            <FormDescription>What make this room a good choice</FormDescription>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <CheckboxGroup
                label="24 hours Room Service"
                name="roomService"
                control={form2.control}
              />
              <CheckboxGroup
                label="Free Wifi"
                name="freeWifi"
                control={form2.control}
              />
              <CheckboxGroup label="TV" name="tv" control={form2.control} />
              <CheckboxGroup
                label="Air Condition"
                name="airCondition"
                control={form2.control}
              />
              <CheckboxGroup
                label="Heating"
                name="heating"
                control={form2.control}
              />

              <CheckboxGroup
                label="Ocean View"
                name="oceanView"
                control={form2.control}
              />
              <CheckboxGroup
                label="Mountain View"
                name="mountainView"
                control={form2.control}
              />
              <CheckboxGroup
                label="Forest View"
                name="forestView"
                control={form2.control}
              />
              <CheckboxGroup
                label="Sound Proof"
                name="soundProof"
                control={form2.control}
              />
            </div>
          </div>
          <FormField
            control={form2.control}
            name="image"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-3">
                <FormLabel>Upload Image *</FormLabel>
                <FormDescription>Upload an image of your Room</FormDescription>

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
          <div className="flex flex-row gap-6">
            <div className="flex-1 flex flex-col gap-6">
              <FormField
                control={form2.control}
                name="roomPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Price In USD *</FormLabel>
                    <FormDescription>
                      state the price of the room in USD per night
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="100"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form2.control}
                name="bedCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bed Count *</FormLabel>
                    <FormDescription>
                      How many beds are available for this room?
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={8}
                        placeholder="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form2.control}
                name="guestCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guest Count *</FormLabel>
                    <FormDescription>
                      How many guest are allow for this room?
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={10}
                        placeholder="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1 flex flex-col gap-6">
              <FormField
                control={form2.control}
                name="breakFastPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Breakfast Price In USD</FormLabel>
                    <FormDescription>
                      Breakfast price for this room
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form2.control}
                name="kingBed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>King Bed</FormLabel>
                    <FormDescription>
                      How many king beds are available for this room?
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={8}
                        placeholder="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form2.control}
                name="queenBed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Queen Bed</FormLabel>
                    <FormDescription>
                      How many queen beds are available for this room?
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={10}
                        placeholder="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-between gap-5 flex-wrap">
            {room ? (
              <>
                <Button2
                  onClick={() => handleAddRoom()}
                  isLoading={isLoading}
                  type="button"
                >
                  <Edit className="w-5 h-5 mr-3" /> Update{" "}
                </Button2>
                {/*  */}
                {/* <Button2>
                  <EyeIcon className="w-5 h-5 mr-3" /> View{" "}
                </Button2> */}
                {/*  */}

                {/*  */}
                {/* <Button2
                  variant="destructive"
                  // isLoading={hotelIsDeleting}
                  // onClick={() => handleDeleteButton(hotel)}
                >
                  <Trash2 className="w-5 h-5 mr-3" /> Delete{" "}
                </Button2> */}
              </>
            ) : (
              <>
                <Button2
                  onClick={() => {
                    // form2.handleSubmit(onSubmit2);
                    console.log("test");
                    handleAddRoom();
                  }}
                  variant="outline"
                  isLoading={isLoading}
                  type="button"
                >
                  <Edit className="w-3 h-3 mr-3" /> Submit111{" "}
                </Button2>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddRoom;

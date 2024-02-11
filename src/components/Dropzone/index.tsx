import { Upload } from "lucide-react";
import { Dispatch, DragEvent, SetStateAction, useRef } from "react";

import ImagePreviewSection from "./ImagePreviewSection";

const DRAG_OVER_CLASS = ["bg-zinc-200", "border-2", "border-zinc-300"];

async function checkAndGetImages(files: File[]) {
  const { imageValidator: imageValidator } = await import("@/validators");
  const { valid, data, message, invalidFile } =
    await imageValidator.areValidImages(files);

  // if any file(s) are invalid, show a toast with the error message
  // but not returning, so that the valid files can be set
  if (!valid) {
    const { toast } = await import("react-hot-toast");

    const errorMessage = `${message} (File: ${invalidFile?.name})`;
    toast.error(errorMessage);
  }

  return data;
}

type DropzoneProps = {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  type?: "create" | "edit";
  className?: string;
};
const Dropzone = ({
  type = "create",
  className,
  images,
  setImages,
}: DropzoneProps) => {
  const dropZone = useRef<HTMLDivElement>(null);

  const setFilesInState = async (files: FileList) => {
    // check if the total number of images is less than the maximum allowed
    const { MAXIMUM_NUMBER_OF_IMAGES } = await import("@/CONSTANTS/limits");
    const validLength =
      images.length + files.length <= MAXIMUM_NUMBER_OF_IMAGES;
    if (!validLength) {
      const { toast } = await import("react-hot-toast");
      toast.error(`Max ${MAXIMUM_NUMBER_OF_IMAGES} images are allowed`);

      // return if the current number of images is already the maximum allowed
      if (images.length >= MAXIMUM_NUMBER_OF_IMAGES) return;
    }

    const { fileValidator } = await import("@/validators");

    // remove duplicate files
    // show warning if any duplicate files are found
    const uniqueFiles = fileValidator.removeDuplicates(files, images);
    if (uniqueFiles.length !== files.length) {
      const { toast } = await import("react-hot-toast");
      toast("Duplicate images found. Ignoring them", { icon: "⚠️" });
    }

    // return if no unique files are found
    if (!uniqueFiles.length) return;

    // get the files array for the space left
    const lengthLeft = MAXIMUM_NUMBER_OF_IMAGES - images.length;
    const filesArray = fileValidator.getFilesOfMaxLength(
      uniqueFiles,
      lengthLeft
    );

    // check if the files are valid images
    const data = await checkAndGetImages(filesArray);
    if (!data.length) return;

    // set the images
    setImages((prev) => [...prev, ...data]);
  };

  const handleDrop = async (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    dropZone.current?.classList.remove(...DRAG_OVER_CLASS);

    // get file
    const files = e.dataTransfer?.files;
    if (!files?.length) return;

    // set images
    setFilesInState(files);
  };

  const handleImageChange = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target?.files?.length) return;

    // set images
    setFilesInState(target.files);
  };

  const handleClick = () => {
    // create a file input element
    const input = document.createElement("input");

    // set the attributes
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;

    // add event listener
    input.onchange = handleImageChange;

    // click the input
    input.click();

    // remove the input
    input.remove();
  };

  const dragDropEvents = {
    onClick: handleClick,
    onDrop: handleDrop,
    onDragStart: (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.clearData();
    },
    onDragOver: (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
    },
    onDragEnter: (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      dropZone.current?.classList.add(...DRAG_OVER_CLASS);
    },
    onDragLeave: (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      dropZone.current?.classList.remove(...DRAG_OVER_CLASS);
    },
  };

  return (
    <>
      <div className={className}>
        <div className="bg-gray-50 dark:bg-transparent sm:dark:bg-gray-800 text-zinc-700 dark:text-zinc-300 rounded-lg sm:p-5 space-y-6">
          <div className="relative text-xl font-bold">
            <div className="absolute left-0 bg-mint p-2 h-full rounded"></div>
            <p className="ml-6">Images</p>
          </div>

          <div className="space-y-1">
            <label htmlFor="dropzone" className="text-sm font-medium">
              Cover Images
            </label>

            <div className={"space-y-2"}>
              <div
                id="dropzone"
                role="button"
                ref={dropZone}
                className="grid place-content-center w-full h-40 bg-zinc-100 dark:bg-gray-700 rounded-lg p-3"
                {...dragDropEvents}
              >
                <div className="flex items-center gap-1.5 bg-background rounded-lg px-3 py-2 max-w-xs pointer-events-none select-none">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Click or Drop Images
                  </span>
                </div>
              </div>

              <ImagePreviewSection images={images} setImages={setImages} />
            </div>
          </div>
        </div>

        {type === "edit" && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Note: Adding new images will replace the old ones.
            <br />
            Leaving it empty will not change the images
          </p>
        )}
      </div>
    </>
  );
};

export default Dropzone;

import { X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

type ImagePreviewSectionProps = {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
};

export default function ImagePreviewSection({
  images,
  setImages,
}: ImagePreviewSectionProps) {
  const removeImage = (url: string, index: number) => {
    // revoke the URL
    URL.revokeObjectURL(url);

    // remove the image from the state
    setImages((prevImages) => [
      ...prevImages.slice(0, index),
      ...prevImages.slice(index + 1),
    ]);
  };

  const [draggedItem, setDraggedItem] = useState<File | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    url: string,
    index: number
  ) => {
    // revoke the URL
    URL.revokeObjectURL(url);

    if (images[index]) {
      setDraggedItem(images[index]);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("application/json", JSON.stringify({ index }));
    }
  };

  const handleDragOver = (index: number, url: string) => {
    // revoke the URL
    URL.revokeObjectURL(url);

    if (draggedItem) {
      const draggedOverItem = images[index];

      if (draggedItem === draggedOverItem) {
        return;
      }

      const items = images.filter((image) => image !== draggedItem);
      items.splice(index, 0, draggedItem);
      setImages(items);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <>
      {images.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {images.map((image, index) => {
            const imageSrc = URL.createObjectURL(image);

            return (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, imageSrc, index)}
                onDragOver={() => handleDragOver(index, imageSrc)}
                onDragEnd={handleDragEnd}
                className={`relative h-12 sm:h-16 aspect-video border rounded overflow-hidden bg-muted cursor-grab`}
              >
                <button
                  type="button"
                  onClick={() => removeImage(imageSrc, index)}
                  className="absolute z-10 top-0 right-0 m-1 p-0.5 bg-black border border-gray-600 rounded-full bg-opacity-50 hover:bg-opacity-100"
                >
                  <X className="w-3 h-3 text-white" />
                </button>

                <Image
                  src={imageSrc}
                  alt="placeholder"
                  fill
                  className="object-contain pointer-events-none select-none"
                />

                <div
                  className={`absolute inset-0 flex items-center justify-center text-white ${
                    draggedItem === image ? `bg-rose-500` : `bg-black`
                  } bg-opacity-50 pointer-events-none`}
                >
                  <span className="text-xs">
                    {index + 1} / {images.length}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Image Modal Component
const ImageModal = ({
  isOpen,
  images,
  currentIndex,
  closeModal,
  changeImage,
  setCurrentIndex,
  dragRef,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleClick,
}: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center" style={{ zIndex: 51 }}>
      <div className="relative w-full max-w-4xl h-full p-4 rounded-md">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-white text-3xl z-10 px-3.5 py-1 hover:bg-gray-400 hover:opacity-80 active:bg-gray-700 rounded-lg"
        >
          &times;
        </button>

        {/* Main Image */}
        <div className="relative w-full h-[82vh]">
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="contain"
            className="rounded-md"
            draggable="false" // Prevent image from being dragged
          />
          <div className="absolute top-1/2 left-0 right-0 flex justify-between px-1 z-10">
            <button
              onClick={() => changeImage("prev")}
              className="text-white text-3xl py-4 px-4 hover:bg-gray-400 hover:opacity-80 active:bg-gray-700 rounded-md"
            >
              &#10094;
            </button>
            <button
              onClick={() => changeImage("next")}
              className="text-white text-3xl py-4 px-4 hover:bg-gray-400 hover:opacity-80 active:bg-gray-700 rounded-md"
            >
              &#10095;
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div
          className="absolute bottom-2 left-0 right-0 flex gap-2 px-4 py-2 bg-black bg-opacity-50 z-10 overflow-x-hidden cursor-pointer"
          style={{ userSelect: "none" }}
          ref={dragRef}
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseUp={(e) => handleMouseUp(e)}
          onMouseLeave={(e) => handleMouseUp(e)}
        >
          {images.map((image: string, idx: number) => (
            <button
              key={idx}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${currentIndex === idx ? "border-4 border-white" : ""
                }`}
              onClick={(e) => handleClick(e, idx)}
            >
              <Image
                src={image}
                alt={`Thumb ${idx + 1}`}
                width={80}
                height={60}
                className="object-cover rounded-md no-drag" // Disable image drag
                draggable="false" // Ensure the image is not draggable
              />
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
      </div>
    </div>
  );
};

// Main Image Gallery Component
const ImageModalGallery = ({ images, children }: { images: string[]; children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragRef = useRef<any>(null); // Ref for the thumbnails container
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [isClickPrevented, setIsClickPrevented] = useState(false); // Flag to prevent click selection after drag

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const changeImage = (direction: "prev" | "next") => {
    setCurrentIndex((prevIndex) => {
      const newIndex =
        direction === "prev"
          ? prevIndex === 0
            ? images.length - 1
            : prevIndex - 1
          : prevIndex === images.length - 1
            ? 0
            : prevIndex + 1;

      // Scroll to active thumbnail when index changes and center it
      setTimeout(() => {
        if (dragRef.current) {
          const activeThumbnail = dragRef.current.children[newIndex];
          if (activeThumbnail) {
            const containerWidth = dragRef.current.offsetWidth;
            const thumbnailWidth = activeThumbnail.offsetWidth;
            const offset = activeThumbnail.offsetLeft + thumbnailWidth / 2 - containerWidth / 2;
            dragRef.current.scrollLeft = offset;
          }
        }
      }, 0);

      return newIndex;
    });
  };

  // Drag-to-scroll logic
  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    setStartPos(e.clientX);
    setIsClickPrevented(true); // Prevent click until dragging finishes

    // Prevent default image dragging behavior
    e.preventDefault();
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    const distance = e.clientX - startPos;
    dragRef.current.scrollLeft -= distance;
    setStartPos(e.clientX);
  };

  const handleMouseUp = (e: any) => {
    setIsDragging(false);
    setIsClickPrevented(false); // Allow clicks after drag is finished
  };

  const handleClick = (e: any, idx: number) => {
    if (isClickPrevented) {
      e.preventDefault(); // Prevent click action if dragging was in progress
      return;
    }
    setCurrentIndex(idx); // Otherwise, select the thumbnail
  };

  return (
    <div>

      <div
        className="cursor-pointer"
        onClick={() => openModal(0)}
      >
        {children}
      </div>


      {/* Image Modal with custom content (children) */}
      <ImageModal
        isOpen={isModalOpen}
        images={images}
        currentIndex={currentIndex}
        closeModal={closeModal}
        changeImage={changeImage}
        setCurrentIndex={setCurrentIndex}
        dragRef={dragRef}
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        handleClick={handleClick}
      >
      </ImageModal>
    </div>
  );
};

export default ImageModalGallery;

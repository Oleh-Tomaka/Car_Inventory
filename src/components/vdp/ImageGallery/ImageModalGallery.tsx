import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ImageModal = ({
  isOpen,
  images,
  currentIndex,
  closeModal,
  changeImage,
  dragRef,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleClick,
  mainImageDragRef,
  handleMainImageMouseDown,
  handleMainImageMouseMove,
  handleMainImageMouseUp,
  mainImageTranslate,
}: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center" style={{ zIndex: 51 }}>
      <div className="relative w-full max-w-4xl h-full p-4 rounded-md">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="fixed top-4 right-4 text-3xl rounded-full z-30 px-2 py-2 bg-white hover:bg-gray-100 active:bg-gray-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main Image */}
        <div 
          className="relative w-full h-[82vh] overflow-hidden"
          ref={mainImageDragRef}
          onMouseDown={handleMainImageMouseDown}
          onMouseMove={handleMainImageMouseMove}
          onMouseUp={handleMainImageMouseUp}
          onMouseLeave={handleMainImageMouseUp}
        >
          <div 
            className="w-full h-full transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mainImageTranslate.x}px, ${mainImageTranslate.y}px)`,
              cursor: 'grab'
            }}
          >
            <Image
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              layout="fill"
              objectFit="contain"
              className="rounded-md select-none pointer-events-none"
              draggable="false"
            />
          </div>
          <div className="absolute top-1/2 translate-y-[-50%] left-0 right-0 flex justify-between px-1 z-10"
            style={{cursor: 'grab'}}
          >
            <button
              onClick={() => changeImage("prev")}
              className="text-white text-3xl py-[40px] px-4 ml-[-30px] hover:opacity-80 active:opacity-100 rounded-md"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={() => changeImage("next")}
              className="text-white text-3xl py-[40px] px-4 mr-[-30px] hover:opacity-80 active:opacity-100 rounded-md"
            >
              <ChevronRight className="w-8 h-8" />
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
                className="object-cover rounded-md no-drag"
                draggable="false"
              />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

const ImageModalGallery = ({ images, children }: { images: string[]; children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragRef = useRef<any>(null);
  const mainImageDragRef = useRef<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [isClickPrevented, setIsClickPrevented] = useState(false);
  const [isMainImageDragging, setIsMainImageDragging] = useState(false);
  const [mainImageStartPos, setMainImageStartPos] = useState({ x: 0, y: 0 });
  const [mainImageTranslate, setMainImageTranslate] = useState({ x: 0, y: 0 });
  const DRAG_THRESHOLD = 50; 

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const scrollThumbnailIntoView = (index: number) => {
    if (!dragRef.current) return;
    
    const container = dragRef.current;
    const thumbnails = container.children;
    const activeThumbnail = thumbnails[index];
    
    if (!activeThumbnail) return;

    const containerWidth = container.offsetWidth;
    const thumbnailWidth = activeThumbnail.offsetWidth;
    const thumbnailLeft = activeThumbnail.offsetLeft;
    const thumbnailRight = thumbnailLeft + thumbnailWidth;
    
    const containerCenter = containerWidth / 2;
    const thumbnailCenter = thumbnailLeft + (thumbnailWidth / 2);
    
    const scrollPosition = thumbnailCenter - containerCenter;
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  const updateCurrentIndex = (newIndex: number) => {
    setCurrentIndex(newIndex);
    scrollThumbnailIntoView(newIndex);
  };

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    setStartPos(e.clientX);
    setIsClickPrevented(true); 
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
    setIsClickPrevented(false); 
  };

  const handleClick = (e: any, idx: number) => {
    if (isClickPrevented) {
      e.preventDefault(); 
      return;
    }
    setCurrentIndex(idx);
  };

  const handleMainImageMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLButtonElement) return;
    setIsMainImageDragging(true);
    setMainImageStartPos({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  };

  const handleMainImageMouseMove = (e: React.MouseEvent) => {
    if (!isMainImageDragging) return;
    
    const deltaX = e.clientX - mainImageStartPos.x;
    
    setMainImageTranslate({
      x: deltaX * 0.5, 
      y: 0
    });
  };

  const handleMainImageMouseUp = (e: React.MouseEvent) => {
    if (!isMainImageDragging) return;
    
    const deltaX = e.clientX - mainImageStartPos.x;
    setIsMainImageDragging(false);

    if (Math.abs(deltaX) > DRAG_THRESHOLD) {
      if (deltaX > 0) {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        updateCurrentIndex(newIndex);
      } else {
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        updateCurrentIndex(newIndex);
      }
    }

    setMainImageTranslate({ x: 0, y: 0 });
  };

  useEffect(() => {
    scrollThumbnailIntoView(currentIndex);
  }, [currentIndex]);

  return (
    <div>
      <div
        className="cursor-pointer"
        onClick={() => openModal(0)}
      >
        {children}
      </div>

      <ImageModal
        isOpen={isModalOpen}
        images={images}
        currentIndex={currentIndex}
        closeModal={closeModal}
        changeImage={(direction: "prev" | "next") => {
          const newIndex = direction === "prev"
            ? (currentIndex === 0 ? images.length - 1 : currentIndex - 1)
            : (currentIndex === images.length - 1 ? 0 : currentIndex + 1);
          updateCurrentIndex(newIndex);
        }}
        setCurrentIndex={updateCurrentIndex}
        dragRef={dragRef}
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        handleClick={handleClick}
        mainImageDragRef={mainImageDragRef}
        handleMainImageMouseDown={handleMainImageMouseDown}
        handleMainImageMouseMove={handleMainImageMouseMove}
        handleMainImageMouseUp={handleMainImageMouseUp}
        mainImageTranslate={mainImageTranslate}
      />
    </div>
  );
};

export default ImageModalGallery;

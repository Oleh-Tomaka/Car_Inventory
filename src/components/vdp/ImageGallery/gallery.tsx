import Image from "next/image";
import ImageModalGallery from "./ImageModalGallery";

interface ImageGalleryProps {
  images: string[];
}
const DEFAULT_IMAGES = [
'http://vehicle-photos-published.vauto.com/c6/6b/29/af-cc67-43c5-a18e-5e444281c959/image-1.jpg', 
'http://vehicle-photos-published.vauto.com/c6/6b/29/af-cc67-43c5-a18e-5e444281c959/image-2.jpg', 
'http://vehicle-photos-published.vauto.com/c6/6b/29/af-cc67-43c5-a18e-5e444281c959/image-3.jpg', 
'http://vehicle-photos-published.vauto.com/c6/6b/29/af-cc67-43c5-a18e-5e444281c959/image-4.jpg', 
'http://vehicle-photos-published.vauto.com/c6/6b/29/af-cc67-43c5-a18e-5e444281c959/image-5.jpg'
];
const ImageGallery = ({ images = [] }: ImageGalleryProps) => {
  images = images.length > 0 && images.some(image => image !== '') ? images : DEFAULT_IMAGES;
  const mainImage = images[0];
  const thumbnails = images.slice(1, 5);

  return (
    <div className="flex gap-2 rounded-[16px] overflow-hidden relative">
      {/* Left: Main Image */}
      <div className="w-full md:w-[58%] relative aspect-[3/2]">
        <Image
          src={mainImage}
          alt="Main car image"
          fill
          className="object-cover"
        />
        <div className="block md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2">
           <Image src="/images/Bullet.svg" alt="Bullet" width={134} height={4} />
         </div>
      </div>

      {/* Right: Thumbnails grid */}
      <div className="hidden md:w-[42%] md:flex flex-col gap-2">
        <div className="h-1/2 flex gap-2">
          {thumbnails.slice(0, 2).map((src, idx) => (
            <div key={idx} className="w-1/2 relative aspect-[3/2]">
              <Image src={src} alt={`Thumb ${idx}`} fill className="object-cover" />
            </div>
          ))}
        </div>
        <div className="h-1/2 flex gap-2">
          {thumbnails.slice(2, 4).map((src, idx) => (
            <div key={idx} className="w-1/2 relative aspect-[3/2]">
              <Image src={src} alt={`Thumb ${idx + 2}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-2 right-2">
        <ImageModalGallery images={images}>
          <button className=" flex items-center gap-2 text-sm text-gray-700 bg-white px-3 py-1 rounded-[12px] shadow border">
            <Image src="/images/camera.svg" alt="Gallery" width={18} height={18} />
            All Photos
          </button>
        </ImageModalGallery>
      </div>
    </div>
  );
};

export default ImageGallery;

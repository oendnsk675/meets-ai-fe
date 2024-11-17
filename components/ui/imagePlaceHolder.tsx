import Image from "next/image";

const ImagePlaceHolder = ({ alt = "image" }) => {
  return (
    <Image
      src="/image/placeholder.svg"
      alt={alt}
      fill
      className="w-full h-full object-none"
    />
  );
};

export default ImagePlaceHolder;

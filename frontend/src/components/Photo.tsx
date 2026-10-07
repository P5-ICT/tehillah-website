import Image from "next/image";

type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  position?: string;
  priority?: boolean;
};

/** A photo that fills its box (give the box a height with className) and is cropped neatly. */
export function Photo({ src, alt, className = "", sizes = "100vw", position = "50% 50%", priority = false }: PhotoProps) {
  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}

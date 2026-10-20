import type { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { Section, SectionTitle } from "@/components/Section";
import { photoAlbums } from "@/content/site";

export const metadata: Metadata = {
  title: "Photos",
  description: "Photos of Tehillah's safe haven, crèche, community health work and events in Elsies River.",
};

export default function PhotosPage() {
  return (
    <>
      {photoAlbums.map((album, index) => (
        <Section key={album.title} tone={index % 2 === 1 ? "cream" : "white"}>
          <div className="flex flex-col gap-9">
            <SectionTitle as={index === 0 ? "h1" : "h2"} title={album.title} intro={album.intro} />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {album.photos.map((photo) => (
                <figure key={photo.image} className="flex flex-col gap-2.5">
                  <Photo
                    src={photo.image}
                    alt={photo.alt}
                    className="h-64 w-full rounded-xl md:h-72"
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  />
                  <figcaption className="text-base font-semibold">{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Section>
      ))}
    </>
  );
}

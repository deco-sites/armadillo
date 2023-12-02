import Image from "apps/website/components/Image.tsx";

import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Banner {
  image: ImageWidget;
  width?: number;
  height?: number;
  /** @description Image's alt text */
  alt: string;
  link: string;
}

export interface Props {
  biggestBanner: {
    image: ImageWidget;
    width?: number;
    height?: number;
    alt: string;
    link: string;
  };
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
}

function BiggestBanner({
  image,
  width,
  height,
  alt,
  link,
  preload,
}: {
  image: ImageWidget;
  width?: number;
  height?: number;
  alt: string;
  link: string;
  preload?: boolean;
}) {
  return (
    <a href={link ?? "#"} class="relative overflow-y-hidden w-full">
      <Image
        src={image}
        alt={alt}
        width={width ?? 2500}
        height={height ?? 1000}
        loading={preload ? "eager" : "lazy"}
      />
    </a>
  );
}

export default function DynamicGallery(
  { biggestBanner, images, preload }: Props,
) {
  if (!images || images.length === 0) return null;

  return (
    <section class="flex w-full h-full py-5">
      {images && images.length > 1 && (
        <div class="flex flex-col gap-3 w-full h-full">
          {biggestBanner && (
            <BiggestBanner
              image={biggestBanner.image}
              width={biggestBanner.width}
              height={biggestBanner.height}
              alt={biggestBanner.alt}
              link={biggestBanner.link}
              preload={preload}
            />
          )}

          <div class="grid grid-cols-2 items-center justify-between w-full gap-3">
            {images?.map((item) => (
              <a
                href={item.link ?? "#"}
                class="relative overflow-y-hidden w-full"
              >
                <Image
                  src={item.image}
                  width={item.width || 1250}
                  height={item.height || 1000}
                  alt={item.alt}
                  loading={preload ? "eager" : "lazy"}
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

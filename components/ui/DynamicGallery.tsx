import type { ImageWidget } from "apps/admin/widgets.ts";

import BannerCarousel from "$store/components/ui/BannerCarousel.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Banner {
  /** @description desktop otimized image */
  desktop: {
    image: ImageWidget;
    width?: number;
    height?: number;
  };
  /** @description mobile otimized image */
  mobile: {
    image: ImageWidget;
    width?: number;
    height?: number;
  };
  /** @description Image's alt text */
  alt: string;
  link: string;
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  isSlider?: boolean;
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
  { images, preload, interval, isSlider }: Props,
) {
  if (!images || images.length === 0) return null;

  if (isSlider) {
    return (
      <BannerCarousel images={images} preload={preload} interval={interval} />
    );
  }

  return (
    <section class="flex w-full h-full py-5">
      {images && images.length > 1 && (
        <div class="flex flex-col gap-3 w-full h-full">
          <BiggestBanner
            image={images[0].desktop.image}
            width={images[0].desktop.width}
            height={images[0].desktop.height}
            alt={images[0].alt}
            link={images[0].link}
            preload={preload}
          />

          <div class="grid grid-cols-2 items-center justify-between w-full gap-3">
            {images.filter((_, i) => i !== 0).map((item) => (
              <a
                href={item.link ?? "#"}
                class="relative overflow-y-hidden w-full"
              >
                <Image
                  src={item.desktop.image}
                  width={item.desktop.width || 1250}
                  height={item.desktop.height || 1000}
                  alt={item.alt}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

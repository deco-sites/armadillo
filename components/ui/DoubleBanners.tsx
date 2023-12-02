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
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
}

export default function DoubleBanners({ images, preload }: Props) {
  if (!images || images.length === 0) return null;

  return (
    <div class="grid grid-cols-2 items-center justify-between w-full gap-6">
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
  );
}

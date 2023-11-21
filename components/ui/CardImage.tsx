import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  images?: {
    icon: ImageWidget;
    link: string;
    description: string;
  }[];
}
export default function CardImage({ images }: Props) {
  return (
    <section class="flex items-center justify-center lg:max-w-[90%] mx-auto w-full h-full py-8">
      <div class="w-full h-full flex items-center justify-center flex-col md:flex-row flex-wrap gap-1.5 md:gap-3">
        {images?.map((image) => (
          <a href={image.link}>
            <Image
              class="p-2"
              src={image.icon}
              alt={image.description}
              width={274}
              height={263}
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

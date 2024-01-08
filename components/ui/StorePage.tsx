import Header from "$store/components/ui/SectionHeader.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

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
}

export interface Store {
  name: string;
  phone?: string;
  phoneCel: string;
  address: string;
}

export interface Props {
  title?: string;
  stores?: Store[];
  preload?: boolean;
  image: Banner;
}

export default function Testimonials(
  props: Props,
) {
  const id = useId();
  const { title, preload, image, stores } = { ...props };

  return (
    <>
      <Picture preload={preload}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={preload ? "high" : "auto"}
          src={image.mobile.image}
          width={image.mobile.width ?? 360}
          height={image.mobile.height ?? 600}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={preload ? "high" : "auto"}
          src={image.desktop.image}
          width={image.desktop.width ?? 1440}
          height={image.desktop.height ?? 600}
        />
        <img
          class="object-cover w-full h-full"
          loading={preload ? "eager" : "lazy"}
          src={image.desktop.image}
          alt={image.alt}
        />
      </Picture>
      <div class="w-full container px-4 py-8 flex flex-col lg:py-5 lg:px-0">
        <h1 class="text-[35px] font-semibold font-sans">{title}</h1>
        <div class="flex w-full  flex-row flex-wrap  justify-start">
          {stores?.map((store) => {
            return (
              <div class="flex flex-col w-1/2 gap-2 pb-2">
                <h2 class="font-bold text-[12px]">{store.name}</h2>

                <span class="font-semibold text-[12px]">{store.address}</span>

                <span class="text-gray-500 text-[12px]">{store.phone}</span>

                <span class="text-gray-500 text-[12px] flex flex-row ">
                  {store.phoneCel}{" "}
                  <a
                    href={`https://wa.me/${
                      store.phoneCel.replace(" ", "").replace(/[\(\)]/g, "")
                        .replace(/-/g, "").replace(/\s/g, "")
                    }`}
                    target="_blank"
                    class="flex flex-row bg-[#25d366] rounded-full gap-1 text-center items-centerx' px-2 text-white ml-3"
                  >
                    <Icon
                      id={"WhatsApp"}
                      size={14}
                      stroke={"0.01"}
                    />WhatsApp
                  </a>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

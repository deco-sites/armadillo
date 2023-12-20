import {
  SendEventOnClick,
  SendEventOnView,
} from "$store/components/Analytics.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

/**
 * @titleBy alt
 */
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
}

const DEFAULT_PROPS = {
  images: [],
  preload: true,
};

function BannerItem(
  { image, lcp, id }: { image: Banner; lcp?: boolean; id: string },
) {
  const {
    alt,
    mobile,
    desktop,
  } = image;

  return (
    <a
      id={id}
      href={alt ?? "#"}
      aria-label="Banners"
      class="relative overflow-y-hidden w-full"
    >
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile.image}
          width={mobile.width ?? 360}
          height={mobile.height ?? 600}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop.image}
          width={desktop.width ?? 1440}
          height={desktop.height ?? 600}
        />
        <img
          class="object-cover w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop.image}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function Dots({ images, interval = 0 }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-16 sm:w-20 h-0.5 rounded group-disabled:animate-progress bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton>
          <Icon
            class="text-base-100"
            size={40}
            id="ChevronLeft"
            strokeWidth={2}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton>
          <Icon
            class="text-base-100 rotate-180"
            size={40}
            id="ChevronLeft"
            strokeWidth={2}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel(props: Props) {
  const id = useId();
  const { images, preload, interval } = { ...DEFAULT_PROPS, ...props };

  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
        {images?.map((image, index) => {
          const params = { promotion_name: image.alt };

          return (
            <Slider.Item index={index} class="carousel-item w-full">
              <BannerItem
                image={image}
                lcp={index === 0 && preload}
                id={`${id}::${index}`}
              />
              <SendEventOnClick
                id={`${id}::${index}`}
                event={{ name: "select_promotion", params }}
              />
              <SendEventOnView
                id={`${id}::${index}`}
                event={{ name: "view_promotion", params }}
              />
            </Slider.Item>
          );
        })}
      </Slider>

      {images && images.length > 1 && (
        <>
          <Buttons />

          <Dots images={images} interval={interval} />

          <SliderJS
            rootId={id}
            interval={interval && interval * 1e3}
            infinite
          />
        </>
      )}
    </div>
  );
}

export default BannerCarousel;

import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import ShareButton from "$store/components/product/ShareButton.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();

  if (props.page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [], url } },
    layout: { width, height },
  } = props;
  const aspectRatio = `${width} / ${height}`;

  const breadcrumb = {
    ...props.page.breadcrumbList,
    itemListElement: props.page.breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: props.page.breadcrumbList.numberOfItems - 1,
  };

  return (
    <>
      <Breadcrumb itemListElement={breadcrumb.itemListElement} />

      <div id={id} class="grid grid-flow-row lg:grid-flow-col sm:pt-10">
        {/* Image Slider */}
        <div class="relative order-1 lg:order-2">
          <Slider class="carousel carousel-center gap-6 w-screen sm:w-[40vw]">
            {images.map((img, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-full"
              >
                <Image
                  class="w-full"
                  sizes="(max-width: 640px) 100vw, 40vw"
                  style={{ aspectRatio }}
                  src={img.url!}
                  alt={img.alternateName}
                  width={width}
                  height={height}
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </Slider.Item>
            ))}
          </Slider>

          <Slider.PrevButton
            class="no-animation absolute left-2 top-1/2"
            disabled
          >
            <Icon size={40} height={40} id="ChevronLeft" strokeWidth={1.75} />
          </Slider.PrevButton>

          <Slider.NextButton
            class="no-animation absolute right-2 top-1/2 rotate-180"
            disabled={images.length < 2}
          >
            <Icon size={40} height={40} id="ChevronLeft" strokeWidth={1.75} />
          </Slider.NextButton>

          {
            /* <div class="absolute top-2 right-2 bg-base-100 rounded-full">
            <ProductImageZoom
              images={images}
              width={700}
              height={Math.trunc(700 * height / width)}
            />
          </div> */
          }
        </div>

        {/* Dots */}
        <ul class="carousel carousel-center gap-1 px-4 sm:px-0 lg:flex-col order-2 sm:order-1">
          {images.map((img, index) => (
            <li class="carousel-item min-w-[63px] xl:min-w-[100px]">
              <Slider.Dot index={index}>
                <Image
                  style={{ aspectRatio: "2:3" }}
                  class="group-disabled:border-base-300 border"
                  width={80}
                  height={120}
                  src={img.url!}
                  alt={img.alternateName}
                />
              </Slider.Dot>
            </li>
          ))}
        </ul>

        <SliderJS rootId={id} />
      </div>

      {url && <ShareButton url={url} />}
    </>
  );
}

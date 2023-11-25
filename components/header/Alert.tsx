import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <section id={id}>
      {/* Mobile View */}
      <Slider class="carousel lg:hidden carousel-center w-screen gap-6 bg-black">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span class="text-sm text-white uppercase flex justify-center items-center w-screen h-[38px]">
              {alert}
            </span>
          </Slider.Item>
        ))}
      </Slider>

      {/* Desktop View */}
      <div class="hidden lg:flex items-center justify-center w-full bg-black">
        <div class="flex items-center justify-between max-w-[95%] mx-auto w-full">
          {alerts.map((alert) => (
            <span class="text-sm text-white uppercase flex justify-center items-center w-full h-[38px]">
              {alert}
            </span>
          ))}
        </div>
      </div>

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </section>
  );
}

export default Alert;

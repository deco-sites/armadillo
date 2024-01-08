import Header from "$store/components/ui/SectionHeader.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: string;
  description?: HTMLWidget;
}

export default function Testimonials(
  props: Props,
) {
  const id = useId();
  const { title, description } = { ...props };

  return (
    <div class="w-full container px-4 py-8 flex flex-col lg:py-5 lg:px-0 max-w-4xl">
      <div class="w-full flex py-10 flex-col">
        <h1 class="text-[35px] font-semibold font-sans">{title}</h1>

        <div
          class="gap-4 font-sans w-full container px-4 py-4 flex flex-col  lg:py-5 lg:px-0 max-w-4xl"
          dangerouslySetInnerHTML={{ __html: description! }}
        >
        </div>
      </div>
    </div>
  );
}

import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  title: string;
  description?: HTMLWidget;
}

export default function SectionDescription(
  { title, description }: Props,
) {
  return (
    <section class="w-full h-full flex flex-col items-center justify-center text-center gap-2 my-4 px-4 lg:px-0 pb-4">
      <div class="container h-full flex flex-col">
        <div>
          <h1 class="text-base font-medium">{title}</h1>
        </div>
        <p
          dangerouslySetInnerHTML={{ __html: description || "" }}
          class="text-base font-medium"
        />
      </div>
    </section>
  );
}

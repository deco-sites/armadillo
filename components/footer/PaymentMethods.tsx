import type { ImageWidget } from "apps/admin/widgets.ts";

export interface PaymentItem {
  image: ImageWidget;
  description: string;
  width?: number;
  height?: number;
}

export default function PaymentMethods(
  { content }: { content?: { title?: string; items?: PaymentItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4">
          {content.title && <span class="text-lg">{content.title}</span>}
          <ul class="flex items-center gap-4 flex-wrap">
            {content.items.map((item) => {
              return (
                <li
                  title={item.description}
                >
                  <div>
                    <img
                      src={item.image}
                      alt={item.description}
                      width={item.width || 45}
                      height={item.height || 45}
                      loading="lazy"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { headerHeight } from "./constants.ts";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  const image = item?.image?.[0];

  return (
    <li class="group flex items-center">
      <a href={url} class="flex items-center justify-center gap-0.5 px-4 py-3">
        <span
          class={`group-hover:underline text-xs font-bold ${
            name && ["bazar"].includes(name.toLowerCase()) && "text-[#449349]"
          }`}
        >
          {name}
        </span>
        {children && children.length > 0 && (
          <Icon
            id="ChevronDown"
            strokeWidth={1}
            size={12}
            class="group-hover:rotate-180 transition-transform duration-150"
          />
        )}
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start gap-6 w-screen"
            style={{ top: "0px", left: "0px", marginTop: "105px" }}
          >
            <ul class="flex items-start w-full max-w-[80%] gap-6">
              {children.map((node) => (
                <li class="p-6">
                  <a class="hover:underline" href={node.url}>
                    <span>{node.name}</span>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.url}>
                          <span class="text-xs">{leaf.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            {image?.url && (
              <Image
                class="p-6"
                src={image.url}
                alt={image.alternateName}
                width={300}
                height={332}
                loading="lazy"
              />
            )}
          </div>
        )}
    </li>
  );
}

export default NavItem;

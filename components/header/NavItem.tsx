import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { headerHeight } from "./constants.ts";

import type { ImageWidget } from "apps/admin/widgets.ts";

export interface SiteNavigationElementLeaf {
  /** @hidden */
  "@type": "SiteNavigationElement";
  additionalType?: string;
  identifier?: string;
  images?: Array<{
    url: ImageWidget;
    alternateName: string;
    width?: number;
    height?: number;
  }>;
  /** The name of the item. */
  name?: string;
  /** URL of the item. */
  url?: string;
}

export interface SiteNavigationElement extends SiteNavigationElementLeaf {
  // TODO: The schema generator is not handling recursive types leading to an infinite loop
  // Lets circunvent this issue by enumerating the max allowed depth
  children?: Array<
    SiteNavigationElementLeaf & {
      children?: Array<
        SiteNavigationElementLeaf & {
          children?: Array<
            SiteNavigationElementLeaf & {
              children?: Array<
                SiteNavigationElementLeaf & {
                  children?: SiteNavigationElementLeaf[];
                }
              >;
            }
          >;
        }
      >;
    }
  >;
}

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  const images = item?.images ?? [];

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
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start gap-6 w-screen lg:min-h-[180px]"
            style={{ top: "0px", left: "0px", marginTop: "105px" }}
          >
            <ul class="flex items-start w-full max-w-[40%] gap-6">
              {children.map((node) => (
                <li class="pl-6 py-6">
                  <a class="hover:underline" href={node.url}>
                    <span>{node.name}</span>
                  </a>

                  <ul class="flex flex-col gap-0.5 mt-4 min-w-[360px]">
                    {node.children?.map((leaf) => (
                      <li class="hover:bg-[#449349] p-1.5 w-full font-bold cursor-pointer">
                        <a href={leaf.url}>
                          <span class="text-sm">{leaf.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <div class="flex flex-wrap w-full h-full items-center gap-4">
              {images && images?.map((image) => (
                <>
                  {image.url && (
                    <Image
                      class="py-7"
                      src={image.url}
                      alt={image.alternateName}
                      width={image.width || 326}
                      height={image.height || 340}
                      loading="lazy"
                    />
                  )}
                </>
              ))}
            </div>
          </div>
        )}
    </li>
  );
}

export default NavItem;

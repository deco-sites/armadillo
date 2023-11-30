import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import type { SiteNavigationElement } from "./NavItem.tsx";

export interface Props {
  items: SiteNavigationElement[];
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  return (
    <div class="collapse collapse-plus">
      <input type="checkbox" />
      <div
        class={`collapse-title ${
          item.name && item.name.includes("BAZAR") &&
          "text-[#449349]"
        }`}
      >
        {item.name}
      </div>
      <div class="collapse-content">
        <ul>
          {item.children?.map((node) => {
            const items = node.children;

            return (
              <>
                {items?.map((item) => (
                  <li class="pl-2">
                    <a
                      href={item.url}
                      class="w-full block py-2.5 font-bold text-sm"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Menu({ items }: Props) {
  const { displayMenu } = useUI();

  return (
    <div class="flex flex-col h-full px-4 overflow-y-scroll">
      <div class="flex items-center justify-between w-full pt-1 pb-4">
        <button
          aria-label="close menu"
          class="py-2"
          onClick={() => {
            displayMenu.value = false;
          }}
        >
          <Icon id="XMark" size={32} strokeWidth={2} />
        </button>

        <a
          class="py-2"
          href="/account"
          aria-label="go to account"
        >
          <Icon id="User" size={36} strokeWidth={2} />
        </a>
      </div>

      <ul class="flex-grow flex flex-col font-bold text-sm">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}

        <li class="font-bold text-sm collapse-title uppercase">
          <a href="/lojas">Lojas</a>
        </li>

        <li class="font-bold text-sm collapse-title uppercase">
          <a href="/account">Login</a>
        </li>
      </ul>

      <div class="flex flex-col py-2 gap-2 uppercase">
        <Image
          src={"https://armadillo.vteximg.com.br/arquivos/mobile_navmenu.jpg?v=638336649369470000"}
          alt={"Image"}
          width={375}
          height={469}
          loading="lazy"
        />
        <p>Novidades</p>
        <a
          href="/roupas/verao-24?O=OrderByReleaseDateDESC"
          aria-label="confira"
          class="text-gray-400 text-sm"
        >
          Confira
        </a>
      </div>
    </div>
  );
}

export default Menu;

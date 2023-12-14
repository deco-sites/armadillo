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
                      class="w-full block py-2.5 font-bold text-xs"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="21"
            width="24"
            viewBox="0 0 448 512"
          >
            <path
              fill="#000000"
              d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
            />
          </svg>
        </a>
      </div>

      <ul class="flex-grow flex flex-col font-bold text-xs">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}

        <li class="font-bold text-xs collapse-title uppercase">
          <a href="/lojas">Lojas</a>
        </li>

        <li class="font-bold text-xs collapse-title uppercase">
          <a href="/account">Login</a>
        </li>
      </ul>

      <div class="flex flex-col pt-2 pb-10 gap-2 uppercase">
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

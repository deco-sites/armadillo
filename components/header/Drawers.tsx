import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
}

const Aside = (
  { title, onClose, children, isFullWidth = false, isMinicart = false }: {
    title?: string;
    onClose?: () => void;
    children: ComponentChildren;
    isFullWidth?: boolean;
    isMinicart?: boolean;
  },
) => (
  <div
    class={`grid grid-rows-[auto_1fr] max-w-[100%] ${
      isFullWidth && "w-full"
    } z-[999999] ${
      isMinicart
        ? "h-[86.70vh] absolute right-0 top-[126px] bg-whitesmoke lg:w-[700px]"
        : "h-full bg-base-100"
    }`}
  >
    {title && (
      <div class="flex justify-center items-center pt-10 pb-2">
        {isMinicart && (
          <Image
            src="https://armadillo.vteximg.com.br/arquivos/backpack.png?v=637180013501100000"
            alt="Bag Icon"
            width={56}
            height={56}
            loading="lazy"
          />
        )}
        <h1 class="px-4 py-3">
          <span class="font-bold text-xl uppercase">{title}</span>
        </h1>
        {onClose && (
          <Button
            class="btn btn-ghost absolute top-4 right-4 z-[1000]"
            onClick={onClose}
          >
            <Icon id="XMark" size={24} strokeWidth={2} />
          </Button>
        )}
      </div>
    )}
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, searchbar, children, platform }: Props) {
  const { displayCart, displayMenu, displaySearchDrawer } = useUI();

  return (
    <Drawer // left drawer
      open={displayMenu.value}
      onClose={() => {
        displayMenu.value = false;
      }}
      aside={
        <Aside
          isFullWidth={true}
          onClose={() => {
            displayMenu.value = false;
          }}
        >
          {displayMenu.value && <Menu {...menu} />}
        </Aside>
      }
    >
      <Drawer // right drawer
        class="drawer-end"
        open={displayCart.value !== false}
        onClose={() => displayCart.value = false}
        hasOverlay={false}
        aside={
          <Aside
            title="Minha mochila"
            isMinicart={true}
            onClose={() => displayCart.value = false}
          >
            <Cart platform={platform} />
          </Aside>
        }
      >
        {children}
      </Drawer>
    </Drawer>
  );
}

export default Drawers;

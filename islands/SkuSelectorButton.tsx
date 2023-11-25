import { useCart } from "apps/vtex/hooks/useCart.ts";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
  link: string;
}

const colors: Record<string, string> = {
  "azul-clara": "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-marinho": "bg-[#000080] ring-[#000080]",
  "branca": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "cinza": "bg-[#808080] ring-[#808080]",
  "cinza-escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "laranja": "bg-[#FFA500] ring-[#FFA500]",
  "marrom": "bg-[#A52A2A] ring-[#A52A2A]",
  "preta": "bg-[#161616] ring-[#161616]",
  "verde-clara": "bg-[#90EE90] ring-[#90EE90]",
  "vermelha": "bg-[#FF0000] ring-[#FF0000]",

  // Color variants - only applied when no color as content is passed
  "active": "bg-neutral-focus text-neutral-content ring-neutral-focus ",
  "disabled": "bg-neutral-content text-neutral",
  "default": "bg-base-100 text-primary",
};

export default function SkuSelectorButton({ variant, content, link }: Props) {
  const { addItems } = useCart();
  const { displayCart } = useUI();

  const getSkuFromLink = (link: string) => {
    const match = link.match(/skuId=(\d+)/);
    return match ? match[1] : null;
  };

  const skuId = getSkuFromLink(link);

  const onAddItem = () => {
    if (!skuId) return;

    addItems({
      orderItems: [{
        id: skuId!,
        seller: "1",
        quantity: 1,
      }],
    });

    displayCart.value = true;
  };

  return (
    <button onClick={onAddItem} class="avatar placeholder text-xs">
      <div
        class={`flex items-center justify-center w-8 h-8 border border-black text-black`}
      >
        <span class="uppercase">
          {colors[content] ? "" : content.substring(0, 2)}
        </span>
      </div>
    </button>
  );
}

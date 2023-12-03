import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import Avatar from "$store/components/product/Avatar.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const { image, name, price: { sale, list }, quantity } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  function extractSizeAndColor(inputString: string) {
    const matches = inputString.match(/(\d+|[a-zA-Z]+)/g);
    let size = "";
    let color = "";

    if (matches && matches.length >= 2) {
      size = matches[matches.length - 1];
      color = matches[matches.length - 2];
    }

    return { size, color };
  }

  const { color, size } = extractSizeAndColor(name);

  const formattedName = size && color
    ? name.replace(new RegExp(`\\b${size}\\b|\\b${color}\\b`, "gi"), "").trim()
    : name;

  return (
    <div class="flex items-center justify-between gap-2 w-[90%]">
      <div class="flex items-center gap-1.5 lg:min-w-[400px]">
        <Button
          disabled={loading || isGift}
          loading={loading}
          class="btn-ghost btn-square"
          onClick={withLoading(async () => {
            const analyticsItem = itemToAnalyticsItem(index);

            await onUpdateQuantity(0, index);

            analyticsItem && sendEvent({
              name: "remove_from_cart",
              params: { items: [analyticsItem] },
            });
          })}
        >
          <Icon id="XMark" size={16} strokeWidth={2} />
        </Button>

        <Image
          src={image?.src.replace("216-300", "80-120")}
          alt={image?.alt}
          style={{ aspectRatio: "18:25" }}
          width={80}
          height={120}
          class="h-full object-contain"
        />

        <div class="flex flex-col gap-2">
          <span>{formattedName}</span>

          <div class="flex items-center gap-2.5">
            <Avatar
              content={color}
              variant={"default"}
            />

            <span class="flex items-center justify-center text-sm border border-[#ccc] p-2 w-[30px] h-[30px]">
              {size}
            </span>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2">
        {
          /* <span class="line-through text-base-300 text-sm">
          {formatPrice(list, currency, locale)}
        </span> */
        }
        <span class="text-sm text-black">
          {isGift
            ? <span>Grátis</span>
            : (
              <div class="flex flex-col items-center justify-center">
                {formatPrice(sale, currency, locale)}
              </div>
            )}
        </span>
      </div>

      <div>
        {quantity}
      </div>
    </div>
  );
}

export default CartItem;

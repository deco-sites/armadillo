import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { useState } from "preact/hooks";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import SellerCode from "./SellerCode.tsx";
import Shipping from "./Shipping.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon?: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;
  const [shippingValue, setShippingValue] = useState<number | null>(null);

  return (
    <div
      class="flex flex-col justify-center items-center overflow-hidden"
      style={{ minWidth: "calc(min(100vw, 700px))", maxWidth: "700px" }}
    >
      {isEmtpy
        ? (
          <div class="flex flex-col gap-6">
            <span class="font-bold text-2xl text-[#449349]">
              Seu carrinho está vazio!
            </span>
            <Button
              class="btn-primary btn-block bg-[#449349] hover:bg-[#449349] text-white uppercase"
              onClick={() => {
                displayCart.value = false;
              }}
            >
              Escolher produtos
            </Button>
          </div>
        )
        : (
          <>
            {/* Cart Items */}
            <ul
              role="list"
              class="mt-6 px-2 flex-grow overflow-y-auto flex flex-col gap-6 w-full"
            >
              {items.map((item, index) => (
                <li key={index}>
                  <CartItem
                    item={item}
                    index={index}
                    locale={locale}
                    currency={currency}
                    onUpdateQuantity={onUpdateQuantity}
                    itemToAnalyticsItem={itemToAnalyticsItem}
                  />
                </li>
              ))}
            </ul>

            {/* Cart Footer */}
            <footer class="w-full">
              {/* Subtotal */}
              <div class="w-full flex justify-between px-4 text-sm pt-6 pb-2">
                <span>Total dos itens</span>
                <span class="px-4">
                  {formatPrice(subtotal, currency, locale)}
                </span>
              </div>

              {/* Free Shipping Bar */}
              {shippingValue !== null && (
                <FreeShippingProgressBar
                  total={total}
                  locale={locale}
                  currency={currency}
                  target={freeShippingTarget}
                  shippingValue={shippingValue}
                />
              )}

              <div class="border-t border-base-200 py-2 flex flex-col">
                {onAddCoupon && (
                  <SellerCode
                    onAddCoupon={onAddCoupon}
                    title="Código do vendedor"
                    placeholder="Insira o código do vendedor"
                  />
                )}
              </div>

              <div class="border-t border-base-200 py-2 flex flex-col">
                {
                  /* {discounts > 0 && (
                  <div class="flex justify-between items-center px-4">
                    <span class="text-sm">Descontos</span>
                    <span class="text-sm">
                      {formatPrice(discounts, currency, locale)}
                    </span>
                  </div>
                )} */
                }
                {onAddCoupon && (
                  <Coupon onAddCoupon={onAddCoupon} coupon={coupon} />
                )}
              </div>

              {shippingValue === null && (
                <div class="border-t border-base-200 py-2 flex flex-col">
                  <Shipping
                    shippingValue={shippingValue}
                    setShippingValue={setShippingValue}
                  />
                </div>
              )}

              {/* Total */}
              <div class="border-t border-base-200 pt-4 flex flex-col justify-end items-end gap-2 px-4 text-sm">
                <div class="flex justify-between items-center w-full">
                  <span>Total</span>
                  <span class="font-medium pr-4">
                    {formatPrice(total, currency, locale)}
                  </span>
                </div>
                {
                  /* <span class="text-sm text-base-300">
                  Taxas e fretes serão calculados no checkout
                </span> */
                }
              </div>

              <div class="flex items-center justify-between gap-3 p-4">
                <div class="inline-block w-full">
                  <Button
                    class="btn-primary btn-block bg-[#449349] hover:bg-[#449349] text-white uppercase"
                    disabled={loading}
                    onClick={() => {
                      displayCart.value = false;
                    }}
                  >
                    Continuar comprando
                  </Button>
                </div>

                <a class="inline-block w-full" href={checkoutHref}>
                  <Button
                    data-deco="buy-button"
                    class="btn-primary btn-block bg-[#449349] hover:bg-[#449349] text-white uppercase"
                    disabled={loading || isEmtpy}
                    onClick={() => {
                      sendEvent({
                        name: "begin_checkout",
                        params: {
                          coupon,
                          currency,
                          value: total - discounts,
                          items: items
                            .map((_, index) => itemToAnalyticsItem(index))
                            .filter((x): x is AnalyticsItem => Boolean(x)),
                        },
                      });
                    }}
                  >
                    Ir para sua mochila
                  </Button>
                </a>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;

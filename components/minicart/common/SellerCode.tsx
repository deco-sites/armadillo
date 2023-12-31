import Button from "$store/components/ui/Button.tsx";
import { useState } from "preact/hooks";
import { useCart } from "apps/vtex/hooks/useCart.ts";

export interface Props {
  title?: string;
  placeholder?: string;
  coupon?: string;
}

function Coupon({ title, placeholder }: Props) {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(true);
  const [coupon, setCoupon] = useState("");

  const { sendAttachment } = useCart();

  return (
    <div class="flex justify-between items-center pl-4 pr-8 w-full">
      <span class="text-sm">{title || "Cupom"}</span>
      {display
        ? (
          <form
            class="flex items-center gap-0.5 h-[37px] text-[13px]"
            onSubmit={async (e) => {
              e.preventDefault();
              const { currentTarget: { elements } } = e;

              const input = elements.namedItem(
                "sellerCode",
              ) as HTMLInputElement;
              const text = input.value;

              if (!text) return;

              try {
                setLoading(true);
                await sendAttachment({
                  attachment: "marketingData",
                  body: { utmCampaign: text, utmiCampaign: text },
                });
                setDisplay(false);
              } finally {
                setLoading(false);
                setCoupon(text);
              }
            }}
          >
            <input
              name="sellerCode"
              class="border border-black/40 p-2 w-[280px] h-[37px] placeholder:text-[13px] placeholder:text-black text-black bg-transparent"
              type="text"
              value={coupon ?? ""}
              placeholder={placeholder || "Insira seu cupom"}
            />
            <Button
              class="w-[35px] h-[37px] border border-black text-[#9f9f9f]"
              type="submit"
              htmlFor="sellerCode"
              hasBtnClass={false}
              loading={loading}
            >
              OK
            </Button>
          </form>
        )
        : (
          <span class="text-[13px]">
            {coupon}
          </span>
        )}
    </div>
  );
}

export default Coupon;

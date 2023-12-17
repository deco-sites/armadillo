import Button from "$store/components/ui/Button.tsx";
import { useState } from "preact/hooks";

export interface Props {
  title?: string;
  placeholder?: string;
  coupon?: string;
  onAddCoupon: (text: string) => Promise<void>;
}

function Coupon({ coupon, onAddCoupon, title, placeholder }: Props) {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(true);

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

              const input = elements.namedItem("coupon") as HTMLInputElement;
              const text = input.value;

              if (!text) return;

              try {
                setLoading(true);
                await onAddCoupon(text);
                setDisplay(false);
              } finally {
                setLoading(false);
              }
            }}
          >
            <input
              name="coupon"
              class="border border-black/40 p-2 w-[280px] h-[37px] placeholder:text-[13px] placeholder:text-black text-black bg-transparent"
              type="text"
              value={coupon ?? ""}
              placeholder={placeholder || "Insira seu cupom"}
            />
            <Button
              class="w-[35px] h-[37px] border border-black text-[#9f9f9f]"
              type="submit"
              htmlFor="coupon"
              hasBtnClass={false}
              loading={loading}
            >
              OK
            </Button>
          </form>
        )
        : (
          <span class="text-[13px]">
            {coupon ?? "Cupom adicionado"}
          </span>
        )}
    </div>
  );
}

export default Coupon;

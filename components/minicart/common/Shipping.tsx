import Button from "$store/components/ui/Button.tsx";
import { useEffect, useState } from "preact/hooks";
import { useCart } from "apps/vtex/hooks/useCart.ts";

interface Props {
  shippingValue: number | null;
  setShippingValue: (value: number | null) => void;
}

function Shipping({ shippingValue, setShippingValue }: Props) {
  const { simulate, cart } = useCart();
  const { items } = cart.value ?? { items: [] };
  const [loading, setLoading] = useState(false);
  const [cep, setCep] = useState("");

  useEffect(() => {
    async function shippingCalculate() {
      setLoading(true);

      if (shippingValue && items.length > 0) {
        const shippingValueCalculated = await simulate({
          items: items.map((item) => ({
            id: Number(item.id),
            quantity: item.quantity,
            seller: item.seller,
          })),
          postalCode: cep,
          country: "BRA",
        });

        const methods = shippingValueCalculated.logisticsInfo?.reduce(
          (initial, { slas }) => {
            const price = slas.length > 0 ? slas[0].price : 0;
            return [...initial, price];
          },
          [] as number[],
        ) ?? [];

        const totalShippingPrice = methods.reduce(
          (sum, price) => sum + price,
          0,
        );

        const price = totalShippingPrice === 0 ? null : totalShippingPrice;

        setShippingValue(price);
      }

      setLoading(false);
    }

    shippingCalculate();
  }, [items]);

  return (
    <div class="flex justify-between items-center pl-4 pr-8 w-full">
      <span class="text-sm">
        Calcular <br /> Frete
      </span>
      <form
        class="flex items-center gap-0.5 h-[37px] text-[13px]"
        onSubmit={async (e) => {
          e.preventDefault();

          const text = cep;
          if (!text || cep === "") return;

          try {
            setLoading(true);

            const shippingValue = await simulate({
              items: items.map((item) => ({
                id: Number(item.id),
                quantity: item.quantity,
                seller: item.seller,
              })),
              postalCode: text,
              country: "BRA",
            });

            const methods = shippingValue.logisticsInfo?.reduce(
              (initial, { slas }) => {
                const price = slas.length > 0 ? slas[0].price : 0;
                return [...initial, price];
              },
              [] as number[],
            ) ?? [];

            const totalShippingPrice = methods.reduce(
              (sum, price) => sum + price,
              0,
            );

            setShippingValue(totalShippingPrice);
          } finally {
            setLoading(false);
          }
        }}
      >
        <input
          name="shipping"
          class="border border-black/40 p-2 w-[280px] h-[37px] placeholder:text-[13px] placeholder:text-black text-black bg-transparent"
          type="text"
          value={cep}
          autocomplete="off"
          onChange={(e) => {
            if (e.target instanceof HTMLInputElement) {
              const newValue = e.target.value;
              const value = newValue.replace("-", "");
              setCep(value);
            }
          }}
          placeholder="Digite o CEP aqui"
        />
        <Button
          class="w-[35px] h-[37px] border border-black text-[#9f9f9f]"
          type="submit"
          htmlFor="shipping"
          hasBtnClass={false}
          loading={loading}
        >
          OK
        </Button>
      </form>
    </div>
  );
}

export default Shipping;

import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
  shippingValue: number;
}

function FreeShippingProgressBar(
  { target, total, currency, locale, shippingValue }: Props,
) {
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  const formattedShipping = (shippingValue / 100)?.toLocaleString(locale, {
    minimumFractionDigits: 2,
  });

  return (
    <div class="flex flex-col w-full gap-2 pl-4 pr-8 text-sm">
      <p class="flex items-center justify-between w-full">
        <span>Total do Frete</span>
        {shippingValue && shippingValue > 0 && (
          <span>R$ {formattedShipping}</span>
        )}
      </p>

      {remaining > 0
        ? (
          <span>
            Faltam apenas {formatPrice(remaining, currency, locale)} para ganhar
            {" "}
            <b>frete grátis</b>
          </span>
        )
        : <span>Você ganhou frete grátis!</span>}

      <span class="opacity-70">
        Confira opções de retirada em loja na área de pagamento
      </span>
    </div>
  );
}

export default FreeShippingProgressBar;

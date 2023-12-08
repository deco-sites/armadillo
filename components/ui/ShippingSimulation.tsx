import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";

export interface Props {
  items: Array<SKU>;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-3 pt-4">
      <span class="text-[13px] font-bold text-black">
        Consulte o prazo e o valor do frete
      </span>

      <div class="flex flex-col gap-1">
        {methods.map((method) => (
          <li class="flex flex-col justify-start items-start gap-0">
            <span class="text-[13px] text-black font-normal">
              Frete {method.name} -{" "}
              {formatShippingEstimate(method.shippingEstimate)}
            </span>

            <span class="text-[13px] font-normal text-[#449349]">
              {method.price === 0 ? "Grátis" : (
                formatPrice(method.price / 100, currencyCode, locale)
              )}
            </span>
          </li>
        ))}
      </div>

      <span class="text-[#808080] font-bold text-xs">
        Confira opções de retirada em loja na área de pagamento
      </span>
    </ul>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(async () => {
    const definitivePostalCode = postalCode.value.replace("-", "");

    if (definitivePostalCode.length !== 8) {
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: definitivePostalCode,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
    }
  }, []);

  return (
    <div class="flex flex-col">
      <div class="flex flex-col">
        <span class="text-[13px] text-[#808080] font-normal">Frete</span>
      </div>

      <form
        class="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSimulation();
        }}
      >
        <input
          as="input"
          type="text"
          class="border border-[#767676] bg-ice-cube text-sm text-black w-full h-8 max-w-[195px] pl-1"
          placeholder=""
          aria-label="shipping simulation"
          value={postalCode.value}
          maxLength={9}
          size={9}
          onChange={(e: { currentTarget: { value: string } }) => {
            postalCode.value = e.currentTarget.value;
          }}
        />
        <Button
          type="submit"
          loading={loading.value}
          class="max-w-[73px] uppercase flex items-center justify-center min-h-8 max-h-8 rounded-none border border-black bg-[#ddd] hover:bg-[#ddd] w-full text-[#666] text-xs font-medium"
        >
          Calcular
        </Button>
      </form>

      <div class="flex flex-col pt-4">
        <a
          class="text-[13px] text-[#808080] font-normal"
          target="_blank"
          href="http://www.buscacep.correios.com.br/sistemas/buscacep/"
        >
          Não sei meu cep
        </a>
      </div>

      <div>
        <div>
          <ShippingContent simulation={simulateResult} />
        </div>
      </div>
    </div>
  );
}

export default ShippingSimulation;

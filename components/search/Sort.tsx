import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "O";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

// TODO: move this to the loader
const portugueseMappings = {
  "relevance:desc": "Maior Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais Vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "release:desc": "Menor Relevância",
  "discount:desc": "Maior Desconto",
};

function Sort({ sortOptions }: Props) {
  const sort = useSort();

  return (
    <div class="flex flex-col gap-4 h-[95px] w-full">
      <span class="text-[#999] font-semibold text-xs uppercase">
        Ordenar por:
      </span>

      <select
        id="sort"
        name="sort"
        onInput={applySort}
        class="flex text-[#666] text-sm uppercase justify-center items-center py-0.5 w-full h-[32px] leading-[19px] border border-gray-200"
      >
        {sortOptions.map(({ value, label }) => ({
          value,
          label: portugueseMappings[label as keyof typeof portugueseMappings] ??
            label,
        })).filter(({ label }) => label).map(({ value, label }) => (
          <option key={value} value={value} selected={value === sort}>
            <span class="text-sm">{label}</span>
          </option>
        ))}
      </select>
    </div>
  );
}

export default Sort;

import Sort from "$store/components/search/Sort.tsx";
import Avatar from "$store/components/product/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";

interface Props {
  filters: ProductListingPage["filters"];
  sortOptions?: ProductListingPage["sortOptions"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div
        aria-checked={selected}
        class="checkbox rounded-none border-black w-[15px] h-[15px]"
      />
      <span class="text-black text-[13px]">{label}</span>
      {/* {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>} */}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "Tamanho" || key === "Cor"
    ? `grid-cols-5 xl:grid-cols-6`
    : "grid-cols-2";

  return (
    <ul
      class={`${
        key === "Estilo" ? "w-full justify-between gap-x-2 gap-y-1" : "gap-2"
      } grid ${flexDirection}`}
    >
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "Cor" || key === "Tamanho") {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "activePLP" : "defaultPLP"}
                isPLP={true}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters, sortOptions }: Props) {
  const excludedKeys = ["Brands", "PriceRanges", "Categories", "Departments"];

  return (
    <ul class="grid sm:grid-cols-2 md:grid-cols-4 w-full gap-6 justify-between py-3">
      {filters
        .filter(isToggle)
        .filter((item) => !excludedKeys.includes(item.key))
        .sort((a, b) => {
          const order: Record<string, number> = {
            Estilo: 1,
            Cor: 2,
            Tamanho: 3,
          };

          return order[a.label as keyof typeof order] -
            order[b.label as keyof typeof order];
        })
        .map((filter) => (
          <li
            class={`${
              filter.label === "Estilo" ? "flex-col" : "flex-row"
            } flex items-start justify-start gap-4`}
          >
            <span class="text-[#999] font-semibold text-xs uppercase">
              {filter.label}:
            </span>
            <FilterValues {...filter} />
          </li>
        ))}
      {sortOptions && sortOptions.length > 0 && (
        <Sort sortOptions={sortOptions} />
      )}
    </ul>
  );
}

export default Filters;

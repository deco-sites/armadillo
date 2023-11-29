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
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="font-bold text-[13px]">{label}</span>
      {/* {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>} */}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "Tamanho" || key === "Cor"
    ? "grid-cols-6"
    : "grid-cols-5";

  return (
    <ul class={`grid gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "Cor" || key === "Tamanho") {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
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

function Filters({ filters }: Props) {
  const excludedKeys = ["Brands", "PriceRanges", "Categories", "Departments"];

  return (
    <ul class="flex flex-wrap flex-row gap-6 py-3">
      {filters
        .filter(isToggle)
        .filter((item) => !excludedKeys.includes(item.key))
        .map((filter) => (
          <li
            class={`${
              filter.label === "Estilo" ? "flex-col" : "flex-row"
            } flex items-start justify-start gap-4`}
          >
            <span class="text-[#666] font-bold text-xs uppercase">
              {filter.label}:
            </span>
            <FilterValues {...filter} />
          </li>
        ))}
    </ul>
  );
}

export default Filters;

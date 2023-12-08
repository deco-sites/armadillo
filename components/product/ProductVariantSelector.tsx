import Avatar from "$store/components/product/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);

  return (
    <ul class="flex flex-col gap-6">
      {Object.keys(possibilities)?.filter((item) =>
        !item.includes("Emabalgem Presente")
      )?.map((name) => (
        <li class="flex flex-col lg:flex-row lg:items-center gap-2">
          <span class="text-sm lg:min-w-[120px] uppercase">{name}</span>
          <ul class="flex flex-row gap-3">
            {Object.entries(possibilities[name]).map(([value, link]) => (
              <li>
                <button f-partial={link} f-client-nav>
                  <Avatar
                    content={value}
                    variant={link === url
                      ? "active"
                      : link
                      ? "default"
                      : "disabled"}
                  />
                </button>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;

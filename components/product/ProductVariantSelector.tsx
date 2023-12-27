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

  const excludedKeys = ["Nome", "Sobrenome", "Emabalgem Presente"];

  return (
    <div class="flex flex-col gap-6">
      {Object.keys(possibilities)?.filter((item) =>
        !excludedKeys.includes(item)
      )?.map((name) => (
        <>
          {name === "Tamanho"
            ? (
              <div class="flex flex-col md:flex-row md:items-center justify-between w-full gap-5">
                <li class="flex flex-col lg:flex-row lg:items-center gap-2">
                  <span class="text-sm lg:min-w-[120px] uppercase">{name}</span>
                  <ul class="grid grid-cols-6 gap-3">
                    {Object.entries(possibilities[name])
                      .sort(([sizeA], [sizeB]) => {
                        const order = ["PP", "P", "M", "G", "GG", "3G"];
                        return order.indexOf(sizeA) - order.indexOf(sizeB);
                      })
                      .map(([value, link]) => (
                        <li key={value}>
                          <button
                            aria-label="change size"
                            f-partial={link}
                            f-client-nav
                          >
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
              </div>
            )
            : (
              <div class="flex flex-col lg:flex-row lg:items-center gap-2">
                <span class="text-sm lg:min-w-[120px] uppercase">{name}</span>
                <ul class="flex flex-row gap-3">
                  {Object.entries(possibilities[name]).map(([value, link]) => (
                    <li>
                      <button
                        aria-label="change properties"
                        f-partial={link}
                        f-client-nav
                      >
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
              </div>
            )}
        </>
      ))}
    </div>
  );
}

export default VariantSelector;

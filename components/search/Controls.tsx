import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions }: Props,
) {
  const removeSort = () => {
    const currentUrl = new URL(window?.location?.href);

    currentUrl.search = "";

    window.location.href = currentUrl.toString();
  };

  return (
    <div class="flex flex-col justify-between mb-4 py-4 sm:p-0 lg:max-w-[95%] mx-auto">
      <div class="flex flex-row items-center mb-2">
        <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
      </div>

      <div class="flex flex-col md:flex-row">
        <div class="collapse w-full cursor-default focus:outline-none rounded-none border-none">
          <input
            type="checkbox"
            class="peer w-[178px] h-[32px] absolute !p-0 rounded-none border-none"
          />

          <div class="flex gap-2 w-full">
            <div class="collapse-title w-[195px] h-[32px] !p-0">
              <button
                aria-label="open filters"
                class={displayFilter
                  ? "flex text-[#666] text-sm uppercase justify-center items-center gap-1 py-0.5 w-[170px] h-[32px] leading-[19px] border border-gray-200"
                  : "flex justify-center items-center gap-0.5 py-0.5 w-[168px] h-[32px] leading-[19px] border border-gray-200 sm:hidden"}
              >
                Filtros
                <Icon id="FilterList" width={16} height={16} />
              </button>
            </div>

            <button
              onClick={removeSort}
              aria-label="remove filters"
              class="flex text-[#666] text-sm lowercase justify-center items-center py-0.5 w-[120px] h-[32px] leading-[19px] border border-gray-200"
            >
              Remover filtros
            </button>
          </div>

          <div class="collapse-content p-0">
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} sortOptions={sortOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchControls;

import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
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
  return (
    <div class="flex flex-col justify-between mb-4 p-4 sm:p-0 max-w-[95%] mx-auto">
      <div class="flex flex-row items-center sm:p-0 mb-2">
        <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
      </div>

      {
        /* <div class="flex-grow overflow-auto">
        <Filters filters={filters} />
      </div> */
      }

      <div class="flex flex-row justify-start items-center sm:gap-4">
        <div class="collapse">
          <input type="radio" name="my-accordion-2" checked={false} />

          <div class="collapse-title">
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
          <div class="collapse-content">
            <p>hello</p>
          </div>
        </div>

        {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
      </div>
    </div>
  );
}

export default SearchControls;

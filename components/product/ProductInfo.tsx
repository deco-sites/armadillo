import { SendEventOnView } from "$store/components/Analytics.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "$store/islands/AddToCartButton/nuvemshop.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";

interface Props {
  page: ProductDetailsPage | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

function ProductInfo({ page, layout }: Props) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    breadcrumbList,
    product,
  } = page;
  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const sizeGuide =
    product?.isVariantOf?.additionalProperty?.find((item) =>
      item.name === "Medidas"
    )?.value || null;

  const code =
    product?.additionalProperty?.find((item) => item.name === "RefId")?.value ||
    null;

  return (
    <div class="flex flex-col xl:max-w-[85%] xl:ml-auto sm:pt-10" id={id}>
      {/* Code and name */}
      <div class="flex items-center gap-1 mt-4 sm:mt-8">
        <h1>
          <span class="leading-4 capitalize font-semibold text-black">
            {layout?.name === "concat"
              ? `${isVariantOf?.name} ${name}`
              : layout?.name === "productGroup"
              ? isVariantOf?.name
              : name}
          </span>
        </h1>

        <div>
          {code && (
            <span class="text-xs font-normal text-[#808080]">
              - {code.substring(0, 5)}
            </span>
          )}
        </div>
      </div>
      {/* Description card */}
      <div>
        <span class="text-sm font-light text-[#666]">
          {description && (
            <div
              class="mt-2"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </span>
      </div>
      {/* Prices */}
      <div class="mt-4 pb-2 border-b border-b-black/30">
        <div class="flex flex-row gap-2 items-center">
          {(listPrice ?? 0) > price && (
            <span class="line-through text-base-300">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )}

          {(listPrice ?? 0) > price && <span class="text-base-300">/</span>}

          <span class="text-black font-semibold">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
        </div>
        {installments && (
          <span class="text-sm text-[#666]">
            ou {installments.replace(".", ",")}
          </span>
        )}
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} sizeGuide={sizeGuide} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-6 flex flex-col gap-2 pb-4 border-b border-b-black/30">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <>
                  <AddToCartButtonVTEX
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                    seller={seller}
                  />
                  {
                    /* <WishlistButton
                    variant="full"
                    productID={productID}
                    productGroupID={productGroupID}
                  /> */
                  }
                </>
              )}
              {platform === "wake" && (
                <AddToCartButtonWake
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                />
              )}
              {platform === "linx" && (
                <AddToCartButtonLinx
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  productGroupID={productGroupID}
                />
              )}
              {platform === "vnda" && (
                <AddToCartButtonVNDA
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  additionalProperty={additionalProperty}
                />
              )}
              {platform === "shopify" && (
                <AddToCartButtonShopify
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                />
              )}
              {platform === "nuvemshop" && (
                <AddToCartButtonNuvemshop
                  productGroupID={productGroupID}
                  eventParams={{ items: [eventItem] }}
                  additionalProperty={additionalProperty}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Shipping Simulation */}
      <div class="mt-8">
        {platform === "vtex" && (
          <ShippingSimulation
            items={[{
              id: Number(product.sku),
              quantity: 1,
              seller: seller,
            }]}
          />
        )}
      </div>
      {/* Analytics Event */}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            item_list_id: "product",
            item_list_name: "Product",
            items: [eventItem],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;

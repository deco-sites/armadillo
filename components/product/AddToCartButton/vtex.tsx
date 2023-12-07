import { useCart } from "apps/vtex/hooks/useCart.ts";
import { useState } from "preact/compat";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
}

function AddToCartButton({ seller, productID, eventParams }: Props) {
  const [quantity, setQuantity] = useState(1);

  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      orderItems: [{
        id: productID,
        seller: seller,
        quantity,
      }],
    });

  return (
    <div class="flex flex-col lg:flex-row gap-2 w-full">
      <span class="text-sm lg:min-w-[120px] uppercase">Quantidade</span>

      <div class="flex items-center justify-between w-full">
        <QuantitySelector
          quantity={quantity}
          onChange={setQuantity}
        />

        <Button onAddItem={onAddItem} eventParams={eventParams} />
      </div>
    </div>
  );
}

export default AddToCartButton;

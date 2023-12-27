import Button from "../ui/Button.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(1, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="flex items-center w-min gap-2">
      <Button
        class="join-item hover:bg-transparent font-normal text-xl text-[#424542]"
        onClick={decrement}
        disabled={disabled}
        loading={loading}
        hasBtnClass={false}
      >
        -
      </Button>
      <input
        aria-label="change quantity"
        class="flex items-center justify-center text-center w-[35px] h-[35px] join-item [appearance:textfield] border border-[#999] rounded-none bg-[#f2f2f2]"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        maxLength={3}
        size={3}
      />
      <Button
        class="join-item hover:bg-transparent font-normal text-xl text-[#424542]"
        onClick={increment}
        disabled={disabled}
        loading={loading}
        hasBtnClass={false}
      >
        +
      </Button>
    </div>
  );
}

export default QuantitySelector;

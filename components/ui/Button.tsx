import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export type Props =
  & Omit<JSX.IntrinsicElements["button"], "loading">
  & {
    loading?: boolean;
    hasBtnClass?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, Props>(({
  type = "button",
  class: _class = "",
  loading,
  disabled,
  hasBtnClass = true,
  children,
  ...props
}, ref) => (
  <button
    {...props}
    className={`no-animation ${hasBtnClass && "btn"} ${_class}`}
    disabled={disabled || loading}
    type={type}
    ref={ref}
  >
    {loading ? <span class="loading loading-spinner" /> : children}
  </button>
));

export default Button;

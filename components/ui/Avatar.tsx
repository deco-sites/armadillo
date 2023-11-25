/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

import SkuSelectorButton from "$store/islands/SkuSelectorButton.tsx";

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
  link: string;
}

const variants = {
  active: "ring ring-1 ring-offset-base-100 ring-offset-2",
  disabled:
    `relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-red-800 after:w-full after:block after:-rotate-45 after:content-[""]`,
  default: "border border-base-200 hover:border-primary",
};

function Avatar({ content, link, variant = "default" }: Props) {
  return <SkuSelectorButton content={content} variant={variant} link={link} />;
}

export default Avatar;

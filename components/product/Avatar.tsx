/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "Azul-Clara": "bg-[#87CEFA] ring-[#87CEFA]",
  "Azul-Marinho": "bg-[#000080] ring-[#000080]",
  "Branco": "bg-[#FFFFFF] border border-[#E0E0E0] ring-[#000]",
  "Cinza": "bg-[#808080] ring-[#808080]",
  "Cinza-Escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "Laranja": "bg-[#FFA500] ring-[#FFA500]",
  "Marrom": "bg-[#A52A2A] ring-[#A52A2A]",
  "Preto": "bg-[#161616] ring-[#161616]",
  "Verde-Clara": "bg-[#90EE90] ring-[#90EE90]",
  "Vermelha": "bg-[#FF0000] ring-[#FF0000]",

  // Color variants - only applied when no color as content is passed
  "active": "bg-[#449349] text-white ring-neutral-focus",
  "disabled": "bg-neutral-content text-neutral",
  "default": "hover:bg-[#449349] hover:text-white",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active: "ring ring-1 ring-offset-base-100 ring-offset-2",
  disabled:
    `relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-red-800 after:w-full after:block after:-rotate-45 after:content-[""]`,
  default: "",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div class="avatar placeholder text-xs">
      <div
        class={`rounded-none w-8 h-8 ${colors[content] ?? colors[variant]} ${
          variants[variant]
        }`}
      >
        <span class="uppercase">
          {colors[content] ? "" : content.substring(0, 2)}
        </span>
      </div>
    </div>
  );
}

export default Avatar;

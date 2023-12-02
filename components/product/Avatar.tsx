/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "Amarelo": "bg-[#e6c590]",
  "Areia": "bg-[#ede2ca]",
  "Azul": "bg-[#315794]",
  "Azul%20Marinho": "bg-[#020062]",
  "Azul%20mar": "bg-[#3572ab]",
  "Indigo": "bg-[#043560]",
  "Vinho": "bg-[#852929]",
  "Bordo": "bg-[#5f1f20]",
  "Caqui": "bg-[#ddb386]",
  "Caramelo": "bg-[#c18d5e]",
  "Chumbo": "bg-[#37373e]",
  "Cinza": "bg-[#838587]",
  "Goiaba": "bg-[#b42e58]",
  "Branco": "bg-[#FFFFFF] border border-[#E0E0E0] ring-[#000]",
  "Off%20White": "bg-[#FFFFFF] border border-[#E0E0E0] ring-[#000]",
  "Grafite": "bg-[#FFFFFF] border border-[#E0E0E0] ring-[#000]",
  "Kraft": "bg-[#9c7d45]",
  "Laranja": "bg-[#ff5b00]",
  "Marrom": "bg-[#5a4535]",
  "Preto": "bg-[#3b3838]",
  "Rosa": "bg-[#f1bdd2]",
  "Verde": "bg-[#2b632a]",
  "Verde%20Militar": "bg-[#314302]",
  "Vermelho": "bg-[#a20100]",

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

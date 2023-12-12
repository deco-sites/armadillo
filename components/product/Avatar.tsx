/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "White": "bg-[#fff]",
  "Amarelo": "bg-[#e6c590]",
  "Areia": "bg-[#ede2ca]",
  "Azul": "bg-[#315794]",
  "Azul%20Marinho": "bg-[#020062]",
  "Azul%20mar": "bg-[#3572ab]",
  "Indigo": "bg-[#043560]",
  "Argila": "bg-[#b8956d]",
  "Militar": "bg-[#686657]",
  "Gelo": "bg-[#c3c3b9]",
  "Vinho": "bg-[#852929]",
  "Bordo": "bg-[#5f1f20]",
  "Caqui": "bg-[#ddb386]",
  "Caramelo": "bg-[#c18d5e]",
  "Chumbo": "bg-[#37373e]",
  "Cinza": "bg-[#838587]",
  "Goiaba": "bg-[#b42e58]",
  "Branco": "bg-[#FFFFFF]",
  "Off%20White": "bg-[#FFFFFF]",
  "Off White": "bg-[#FFFFFF]",
  "Grafite": "bg-[#FFFFFF]",
  "Kraft": "bg-[#9c7d45]",
  "Laranja": "bg-[#ff5b00]",
  "Marrom": "bg-[#5a4535]",
  "Preto": "bg-[#3b3838]",
  "Rosa": "bg-[#f1bdd2]",
  "Verde": "bg-[#2b632a]",
  "Verde%20Militar": "bg-[#314302]",
  "Vermelho": "bg-[#a20100]",

  // Color variants - only applied when no color as content is passed
  "active": "bg-[#449349] text-white",
  "disabled": "bg-neutral-content text-neutral",
  "default": "hover:bg-[#449349] hover:text-white",
  "defaultPLP": "border border-black/10 hover:bg-black hover:text-white",
  "activePLP": "border border-black hover:bg-black hover:text-white",
};

interface Props {
  variant?: "active" | "disabled" | "default" | "activePLP" | "defaultPLP";
  content: string;
  isPLP?: boolean;
}

const variants = {
  active: "ring ring-1 ring-offset-base-100 ring-offset-2",
  activePLP: "",
  disabled:
    `relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-red-800 after:w-full after:block after:-rotate-45 after:content-[""]`,
  default: "",
  defaultPLP: "",
};

function Avatar({ content, variant = "default", isPLP = false }: Props) {
  return (
    <div class="avatar placeholder text-xs">
      <div
        class={`${
          !colors[content] ? "ring-[#449349]" : "ring-black"
        } rounded-none w-8 h-8 ${isPLP && "border border-[#c9cdd5]"} ${
          colors[content] ?? colors[variant]
        } ${variants[variant]}`}
      >
        <span class="uppercase">
          {colors[content] ? "" : content.substring(0, 2)}
        </span>
      </div>
    </div>
  );
}

export default Avatar;

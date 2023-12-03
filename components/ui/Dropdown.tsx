import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface Props {
  icon: {
    id: AvailableIcons;
    size?: number;
    stroke?: string;
  };
  title: string;
  items: { label: string; link: string; target?: "_blank" | "_self" }[];
}

function Dropdown({ icon, title, items }: Props) {
  return (
    <div class="fixed bottom-6 left-6 z-40">
      <div class="dropdown dropdown-top">
        <div
          tabIndex={0}
          role="button"
          class="flex items-center justify-center w-[60px] h-[60px] p-1.5 rounded-full bg-[#25d366] text-white"
        >
          {icon && (
            <Icon
              id={icon.id || "WhatsApp"}
              size={icon.size || 32}
              stroke={icon.stroke || "0.01"}
            />
          )}
        </div>

        <ul
          tabIndex={0}
          class="dropdown-content !p-0 z-[1] shadow rounded-box w-[350px] lg:h-[290px] bg-[#bbb]"
        >
          <div class="flex flex-col w-full h-full">
            <div class="bg-[#2c2c2c] rounded-t-2xl text-white font-semibold uppercase border-b border-b-white py-3 pl-6 text-sm">
              {title || "Whatsapp"}
            </div>

            <div class="flex flex-wrap flex-col justify-between gap-3 w-full h-full py-3">
              {items?.map((item) => (
                <div class="w-1/2 pl-6">
                  <li class="flex flex-col gap-3 w-full">
                    <span class="w-full text-sm">{item.label}</span>

                    <a
                      href={item.link}
                      target={item.target || "_self"}
                      aria-label={`go to ${item.label}`}
                      class="flex items-center justify-center text-sm w-[120px] uppercase text-white p-1 bg-[#449349]"
                    >
                      Clique aqui
                    </a>
                  </li>
                </div>
              ))}
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;

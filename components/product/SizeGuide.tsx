export default function SizeGuide(
  { sizeGuide }: { sizeGuide?: string | null },
) {
  if (!sizeGuide) return null;

  // console.log(sizeGuide);

  // Divida as linhas do guia de tamanhos
  const rows = sizeGuide.split(/\r\n|\n/);

  // Inicialize um objeto para armazenar os dados formatados
  const formattedData: { [key: string]: { [key: string]: string } } = {};

  // Preencha o objeto com os dados formatados
  rows.forEach((row, index) => {
    const [size, ...measureValues] = row.split("-");

    if (index === 0) {
      // Cabeçalho da tabela
      formattedData["MEDIDA"] = { P: "P", M: "M", G: "G", GG: "GG" };
    } else {
      // Linhas de dados
      formattedData["LARGURA"] = formattedData["LARGURA"] || {};
      formattedData["COMPRIMENTO"] = formattedData["COMPRIMENTO"] || {};
      formattedData["MANGA"] = formattedData["MANGA"] || {};

      // Caso o size seja um número, converter para string
      const formattedSize = isNaN(Number(size)) ? size : String(size);

      formattedData["LARGURA"][formattedSize] = measureValues[0];
      formattedData["COMPRIMENTO"][formattedSize] = measureValues[1];
      formattedData["MANGA"][formattedSize] = measureValues[2];
    }
  });

  return (
    <>
      <a
        href="#my_modal_8"
        aria-label="share icon"
        class="underline text-xs"
      >
        Guia de Medidas
      </a>

      <div class="modal" role="dialog" id="my_modal_8" aria-label="modal">
        <div class="modal-box place-items-center lg:w-[525px] border border-black/40 rounded-none bg-white">
          <span class="flex items-start text-start text-sm text-[#666] font-semibold">
            Tabela de Medidas
          </span>

          <div class="flex items-center justify-between gap-1.5 mt-2 w-full">
            <table class="w-full">
              <tbody class="w-full">
                {Object.entries(formattedData).map(([measure, sizes]) => (
                  <tr key={measure}>
                    <td class="font-semibold text-[#808080] text-sm">
                      {measure}
                    </td>
                    {Object.entries(sizes).map(([size, value], index) => (
                      <td
                        key={index}
                        class={size === value
                          ? "font-semibold text-[#666] text-sm"
                          : "font-light text-[13px] text-[#808080]"}
                      >
                        {value || "x"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div class="modal-action absolute top-[-15px] right-3">
            <a href="#">X</a>
          </div>
        </div>
      </div>
    </>
  );
}

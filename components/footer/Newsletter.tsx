import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";

import Icon from "$store/components/ui/Icon.tsx";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);
  const isSubmitted = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
      isSubmitted.value = true;
    }
  };

  return (
    <div
      class={`flex ${
        tiled
          ? "flex-col gap-4 lg:flex-row lg:w-full lg:justify-between"
          : "flex-col gap-4"
      }`}
    >
      <div class="flex flex-col gap-4">
        {content?.title && (
          <span class="text-sm font-bold">
            {content?.title}
          </span>
        )}
        {content?.description && <div>{content?.description}</div>}
      </div>
      <div class="flex flex-col gap-4">
        {isSubmitted.value ? <p>obrigado!</p> : (
          <form
            class="flex items-center justify-center w-[90%] sm:w-full lg:min-w-[420px] border-b border-b-black pb-0.5 h-[48px]"
            onSubmit={handleSubmit}
          >
            <div class="flex justify-between items-center w-full h-full">
              <input
                name="email"
                class="flex w-full bg-transparent pl-1.5 focus:outline-none h-full text-black placeholder:text-black uppercase"
                placeholder={content?.form?.placeholder || "insira seu email"}
              />

              <button
                type="submit"
                aria-label="submit newsletter subscription"
                class="disabled:loading pr-1.5 h-full w-12"
                disabled={loading}
              >
                <Icon size={24} id="ChevronRight" strokeWidth={3} />
              </button>
            </div>
          </form>
        )}
        {
          /* {content?.form?.helpText && (
          <div
            class="text-sm"
            dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
          />
        )} */
        }
      </div>
    </div>
  );
}

export default Newsletter;

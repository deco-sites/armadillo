/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { useAutocomplete } from "$store/hooks/useAutocomplete.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef, useState } from "preact/compat";
import type { Platform } from "$store/apps/site.ts";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;

  platform?: Platform;
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  loader,
  platform,
}: Props) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modal = useRef<HTMLDivElement>(null);
  const { setSearch, suggestions, loading } = useAutocomplete();
  const { products = [], searches = [] } = suggestions.value ?? {};

  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);
  const notFound = !hasProducts && !hasTerms &&
    (searchInputRef.current && searchInputRef.current.value.length > 0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modal.current && !modal.current.contains(event.target as HTMLElement) &&
        (searchInputRef.current !== event.target as HTMLInputElement)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal]);

  if (self.window.innerWidth >= 600) {
    displaySearchPopup.value = true;
  }

  return (
    <div class="flex-grow flex flex-col relative z-[70]">
      <form
        id={id}
        action={action}
        class={`flex flex-grow relative h-[40px] px-0 ${
          !displaySearchPopup.value ? "justify-end" : "border-b border-b-black"
        }`}
      >
        <input
          ref={searchInputRef}
          id="search-input"
          class={`${
            !displaySearchPopup.value ? "hidden" : "flex"
          } flex-grow w-[90px] sm:w-[130px] md:w-full outline-none placeholder-shown:sibling:hidden placeholder:text-sm placeholder:text-black`}
          aria-label="Barra de pesquisa"
          aria-expanded={!hasProducts && !hasTerms ? "false" : "true"}
          name={name}
          onClick={() => setShowSuggestions(true)}
          onFocus={() => setShowSuggestions(true)}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (value) {
              setShowSuggestions(true);
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setSearch(value);
          }}
          placeholder={self.window.innerWidth >= 600 ? placeholder : ""}
          role="combobox"
          aria-controls="search-suggestion"
          autocomplete="off"
        />

        {!displaySearchPopup.value
          ? (
            <button
              type="button"
              class="btn-ghost bg-transparent"
              aria-label="Search"
              onClick={(e) => {
                e.preventDefault();

                if (!displaySearchPopup.value) {
                  displaySearchPopup.value = !displaySearchPopup.value;
                }

                return;
              }}
            >
              {loading.value
                ? <span class="loading loading-spinner loading-xs" />
                : <Icon id="MagnifyingGlass" size={24} strokeWidth={0.01} />}
            </button>
          )
          : (
            <button
              type="submit"
              class="btn-ghost bg-transparent"
              aria-label="Search"
              for={id}
              tabIndex={-1}
            >
              {loading.value
                ? <span class="loading loading-spinner loading-xs" />
                : <Icon id="MagnifyingGlass" size={24} strokeWidth={0.01} />}
            </button>
          )}

        {
          /* <Button
          type="button"
          class="join-item btn-ghost btn-square hidden sm:inline-flex"
          onClick={() => displaySearchPopup.value = false}
        >
          <Icon id="XMark" size={24} strokeWidth={2} />
        </Button> */
        }
      </form>

      {showSuggestions && (
        <div
          ref={modal}
          class="flex flex-col gap-3 divide-y-2 absolute flex-grow top-10 px-[15px] -translate-x-[40%] md:translate-x-0 pt-2 rounded-md max-h-[450px] lg:max-h-[960px] w-[300px] sm:w-[450px] bg-white overflow-y-auto z-[9999999]"
        >
          {notFound
            ? (
              <span
                class="font-bold uppercase py-2"
                role="heading"
                aria-level={3}
              >
                Sem sugestões
              </span>
            )
            : (
              <>
                <div class="flex flex-col gap-6 py-2">
                  {
                    /* <span
                    class="font-bold uppercase"
                    role="heading"
                    aria-level={3}
                  >
                    Termos mais buscados
                  </span> */
                  }
                  <ul id="search-suggestion" class="flex flex-col gap-5">
                    {searches?.map(({ term }) => (
                      <li class="flex items-center gap-2">
                        <a
                          href={`/s?q=${term}`}
                          class="flex gap-4 items-center"
                        >
                          <span class="text-xs font-semibold uppercase">
                            {term}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  class={hasProducts ? "flex flex-col py-4 gap-6" : "hidden"}
                >
                  {
                    /* <span
                    class="font-bold uppercase"
                    role="heading"
                    aria-level={3}
                  >
                    Produtos para {searchInputRef.current?.value}
                  </span> */
                  }
                  <div class="flex flex-col gap-2.5 w-full">
                    {products?.map(({ isVariantOf, image: images, url }) => {
                      const [front, back] = images ?? [];

                      return (
                        <a
                          href={url || "#"}
                          class="flex w-full h-full gap-3"
                        >
                          <Image
                            src={front.url || ""}
                            alt={front.alternateName}
                            width={52}
                            height={78}
                            loading="lazy"
                            decoding="async"
                            preload={false}
                          />

                          <h2
                            class="truncate text-black uppercase font-semibold text-xs pt-1.5"
                            dangerouslySetInnerHTML={{
                              __html: isVariantOf?.name ?? name ??
                                "",
                            }}
                          />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
        </div>
      )}
    </div>
  );
}

export default Searchbar;

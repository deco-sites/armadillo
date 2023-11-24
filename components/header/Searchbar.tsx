import Searchbar, {
  Props as SearchbarProps,
} from "$store/components/search/Searchbar.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarModal({ searchbar }: Props) {
  if (!searchbar) {
    return null;
  }

  return (
    <div class="w-full md:max-w-[80%]">
      <Searchbar {...searchbar} />
    </div>
  );
}

export default SearchbarModal;

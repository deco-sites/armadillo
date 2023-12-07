import Icon from "$store/components/ui/Icon.tsx";

export default function ShareButton({ url }: { url: string }) {
  return (
    <div class="hidden lg:flex items-center gap-1.5 lg:pl-[100px]">
      <span class="uppercase text-[#666] text-xs">Share:</span>

      <div class="flex items-center gap-0.5">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
          class="text-[#666]"
          aria-label="Share on Facebook"
        >
          <Icon
            id="Facebook"
            size={20}
            stroke="0.01"
            fill="#666"
            loading="lazy"
          />
        </a>

        <a
          href={`https://twitter.com/home?status=${url}`}
          target="_blank"
          class="text-[#666]"
          aria-label="Share on Twitter"
        >
          <Icon
            id="Twitter"
            size={20}
            stroke="0.01"
            fill="#666"
            loading="lazy"
          />
        </a>

        <a
          href={`https://wa.me/?text=${url}`}
          target="_blank"
          class="text-[#666]"
          aria-label="Share on WhatsApp"
        >
          <Icon
            id="WhatsApp"
            size={20}
            stroke="0.01"
            fill="#666"
            loading="lazy"
          />
        </a>
      </div>
    </div>
  );
}

export interface SocialItem {
  label: string;
  link: string;
}

export default function Social(
  { content }: {
    content?: { title?: string; items?: SocialItem[] };
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4">
          {content.title && <span class="text-lg">{content.title}</span>}
          <ul class="flex lg:flex-col lg:items-start gap-2">
            {content.items.map((item) => {
              return (
                <li>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} Logo`}
                  >
                    <div class="link link-hover text-xs">{item.label}</div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

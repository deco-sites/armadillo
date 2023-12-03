export interface Props {
  app: string;
}

export default function InstagramWidget({ app }: Props) {
  if (!app) return null;

  return (
    <div class="max-w-[50%] mx-auto pt-8 pb-12">
      <script
        src="https://static.elfsight.com/platform/platform.js"
        data-use-service-core
        defer
      />

      <div class={app} data-elfsight-app-lazy />
    </div>
  );
}

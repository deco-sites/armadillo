export interface Props {
  app: string;
}

export default function InstagramWidget({ app }: Props) {
  if (!app) return null;

  return (
    <>
      <script
        src="https://static.elfsight.com/platform/platform.js"
        data-use-service-core
        defer
      />
      <div class={app} data-elfsight-app-lazy />
    </>
  );
}

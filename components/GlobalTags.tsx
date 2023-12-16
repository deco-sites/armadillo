import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />

      <link
        rel="stylesheet"
        type="text/css"
        href="https://vfr-v3-production.sizebay.technology/V4/implantation/index.css"
        id="sizebay__stylesheet"
      />
    </Head>
  );
}

export default GlobalTags;

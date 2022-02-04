import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div className="layout">
      {/* Seo de la apliacion */}
      <Head>
        <title>Quiz App | SWR | SSR | SSG</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Aplicacion web sobre quiz realizada en NextJS haciendo uso de hooks y SSR,SWR,SSG."
        />
      </Head>
      <main>{children}</main>
    </div>
  );
}

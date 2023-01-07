import Head from "next/head"
import NextNprogress from "nextjs-progressbar"

import { ContainerProps } from "../types/navigation"

import { Header } from "./Header"
import { Footer } from "./Footer"

const Container = ({ children = null }: ContainerProps) => {

  return (
    <>
      <NextNprogress color="#f0abfc" startPosition={0.3} stopDelayMs={200} height={2} showOnShallow={true} options={{ showSpinner: false }} />
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow, noarchive" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="author" content={process.env.NEXT_PUBLIC_AUTHOR}></meta>
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_APP_NAME} />
        <meta property="og:image" content="/img/seo-img.jpg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content={process.env.NEXT_PUBLIC_AUTHOR} />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className={`w-full mb-auto`}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Container

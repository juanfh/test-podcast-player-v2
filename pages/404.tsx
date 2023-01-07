import Head from "next/head"
import Link from "next/link"

import { LocaleProps, WebSectionProps } from "../types/navigation"

import Container from "../components/Container"
import { Button } from "../components/common/Button"

export default function Custom404(props: WebSectionProps) {
  const { section, pageContent, locale } = props

  const maintexts = pageContent.maintexts

  return (
    <Container>
      <Head>
        <title>{maintexts.custom404_title}</title>
        <meta name="description" content={maintexts.custom404_short_description} />
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Head>
      <div className="flex justify-center pt-12">
        <div className="max-w-screen-sm text-center">
          <div className="text-xl font-bold text-fuchsia-800 pb-2">{maintexts.custom404_page_title}</div>
          <h1 className="text-sm pb-4">{maintexts.custom404_subtitle}</h1>
          <Link href="/">
            <Button format="link" icon="home" label={maintexts.go_homepage} />
          </Link>
        </div>
      </div>
    </Container>
  )
}

export async function getStaticProps({ locale }: LocaleProps) {
  const maintexts = await import(`../language/${locale}.json`)

  return {
    props: {
      section: "404",
      pageContent: {
        maintexts: maintexts.default,
        data: {}
      },
      locale,
    },
    revalidate: 5,
  }
}

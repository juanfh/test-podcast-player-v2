import { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"

import { LocaleProps, WebSectionProps } from "../types/navigation"
import { PodcastProps } from "../types/podcast"

import { getPodcastsList } from "../utils/getPodcastsList"

import Container from "../components/Container"

import { PodcastCard } from "../components/podcast/PodcastCard"
import { SectionHeader } from "../components/SectionHeader"
import { SearchInput } from "../components/common/SearchInput"
import { Loader } from "../components/common/Loader"
import { PodcastError } from "../components/common/PodcastError"

export default function IndexApp(props: WebSectionProps) {
  const { section, pageContent, locale } = props

  const router = useRouter()

  const maintexts = pageContent.maintexts

  const [searchValue, setSearchValue] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [podcastList, setPodcastList] = useState<PodcastProps[]>([] as PodcastProps[])
  const [filteredPodcastList, setFilteredPodcastList] = useState<PodcastProps[]>([] as PodcastProps[])

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value
    setSearchValue(search)
  }

  const filterPodcastList = () => {
    return podcastList.filter((podcast: PodcastProps) => {
      return podcast.title.toLowerCase().includes(searchValue.toLowerCase()) || podcast.author.toLowerCase().includes(searchValue.toLowerCase())
    })
  }

  useEffect(() => {
    getPodcastsList().then(data => {
      setIsLoading(false)
      setPodcastList(data || [])
      setFilteredPodcastList(data || [])
    })
  }, [])

  useEffect(() => {
    if (searchValue.length > 0) {
      const filteredPodcastList = filterPodcastList()
      setFilteredPodcastList(filteredPodcastList)
    } else {
      setFilteredPodcastList(podcastList)
    }
    /* eslint-disable-next-line */
  }, [searchValue])

  return (
    <Container>
      <Head>
        <title>{maintexts.mainSeoTitle}</title>
        <meta name="description" content={maintexts.mainSeoDescription} />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content={maintexts.mainSeoTitle} />
        <meta name="og:description" property="og:description" content={maintexts.mainSeoDescription} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_HOST} />
        <meta name="twitter:title" content={maintexts.mainSeoTitle} />
        <meta name="twitter:description" content={maintexts.mainSeoDescription} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_HOST} />
        {router.asPath !== "/" && (
          <meta name="robots" content="noindex, nofollow, noarchive" />
        )}
      </Head>
      <SectionHeader title={maintexts.mainSeoTitle} subtitle={maintexts.mainSeoDescription} />
      <div className="grid grid-cols-1 place-items-center">
        <div className="w-full max-w-screen-2xl px-4 py-8">
          {isLoading && (
            <div className="grid grid-cols-1 place-items-center">
              <Loader />
            </div>
          )}
          {!isLoading && podcastList.length > 0 && (
            <>
              <SearchInput value={searchValue} maintexts={maintexts} onChange={handleChangeSearch} className="mb-4" />
              {filteredPodcastList?.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
                    {filteredPodcastList.map((podcast: PodcastProps) => (
                      <PodcastCard key={podcast.id} podcast={podcast} />
                    ))}
                  </div>
                </>
              ) : (
                <PodcastError title={maintexts.sorry} message={maintexts.noResults} />
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  )
}

export async function getStaticProps({ locale }: LocaleProps) {
  const maintexts = await import(`../language/${locale}.json`)

  return {
    props: {
      section: "home",
      pageContent: {
        maintexts: maintexts.default,
        data: {}
      },
      locale,
    },
    revalidate: 5,
  }
}

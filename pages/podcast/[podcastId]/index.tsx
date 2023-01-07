import { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { GetStaticPaths } from "next"

import { LocaleProps, WebSectionProps } from "../../../types/navigation"
import { PodcastWithEpisodesProps } from "../../../types/podcast"

import { deleteHtmlTags } from "../../../utils/deleteHtmlTags"
import { getShortenedString } from "../../../utils/getShortenedString"
import { getPodcastsDetail } from "../../../utils/getPodcastsDetail"

import Container from "../../../components/Container"
import { PodcastDetailCard } from "../../../components/podcast/PodcastDetailCard"
import { PodcastEpisodesList } from "../../../components/podcast/PodcastEpisodesList"
import { Loader } from "../../../components/common/Loader"
import { PodcastError } from "../../../components/common/PodcastError"
import { Button } from "../../../components/common/Button"
import { Icon } from "../../../components/common/Icon"
import { Breadcrumbs } from "../../../components/common/Breadcrumbs"
import { Breadcrumb } from "../../../components/common/Breadcrumb"

export default function PodcastDetail(props: WebSectionProps) {
  const { section, pageContent, locale } = props

  const router = useRouter()

  const maintexts = pageContent.maintexts
  const podcastId = pageContent.data.podcastId

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [podcastDetail, setPodcastDetail] = useState<PodcastWithEpisodesProps | undefined>(undefined)

  const [seoTitle, setSeoTitle] = useState<string>("")
  const [seoDescription, setSeoDescription] = useState<string>("")

  const [schemaName, setSchemaName] = useState<string>("")
  const [schemaUrl, setSchemaUrl] = useState<string>("")

  useEffect(() => {
    getPodcastsDetail(podcastId).then(data => {
      setIsLoading(false)
      setPodcastDetail(data || undefined)
      if (data) {
        setSeoTitle(`${data?.author} - ${data?.title}`)
        data?.summary && setSeoDescription(getShortenedString(deleteHtmlTags(data.summary), 150))

        setSchemaName(data?.title || "")
        setSchemaUrl(`${process.env.NEXT_PUBLIC_HOST}/podcast/${podcastId}`)
      } else {
        setSeoTitle(maintexts.podcast_not_found)
        setSeoDescription(maintexts.podcast_not_found_description)
      }
    })
    /* eslint-disable-next-line */
  }, [podcastId])

  return (
    <Container>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content={seoTitle} />
        <meta name="og:description" property="og:description" content={seoDescription} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_HOST}/podcast/${podcastId}`} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_HOST}/podcast/${podcastId}`} />
        {((!isLoading && !podcastDetail) || (router.asPath !== `/podcast/${podcastId}`)) && (
          <meta name="robots" content="noindex, nofollow, noarchive" />
        )}
      </Head>
      <div className="grid grid-cols-1 place-items-center">
        <div className="w-full max-w-screen-xl px-4 pt-8 pb-16">
          {isLoading && (
            <div className="grid grid-cols-1 place-items-center">
              <Loader />
            </div>
          )}
          {!isLoading && !podcastDetail && (
            <div className="grid grid-cols-1 place-items-center">
              <PodcastError title={maintexts.sorry} message={maintexts.loadingError} label={maintexts.back} />
            </div>
          )}
          {!isLoading && podcastDetail && (
            <>
              <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                <Breadcrumbs>
                  <Breadcrumb url="/" title={maintexts.home} position="1" />
                  <Icon icon="angles-right" />
                  <Breadcrumb url={`/podcast/${podcastId}`} title={podcastDetail.title} position="2" />
                </Breadcrumbs>
                <Button icon="rotate-back" label={maintexts.back_to_podcasts_list} className="w-full sm:w-auto text-xs px-2 py-1" onClick={() => router.back()} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6" itemScope itemType="https://schema.org/PodcastSeries">
                <meta itemProp="url" content={schemaUrl} />
                <meta itemProp="name" content={schemaName} />
                <PodcastDetailCard podcastDetail={podcastDetail} section={section} />
                <PodcastEpisodesList podcastDetail={podcastDetail} locale={locale} maintexts={maintexts} />
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths<{ podcastId: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  }
}

export async function getStaticProps({ params, locale }: LocaleProps) {
  const maintexts = await import(`../../../language/${locale}.json`)
  const podcastId = params?.podcastId || ""

  return {
    props: {
      section: "podcastdetail",
      pageContent: {
        maintexts: maintexts.default,
        data: {
          podcastId,
        }
      },
      locale,
    },
    revalidate: 5,
  }
}

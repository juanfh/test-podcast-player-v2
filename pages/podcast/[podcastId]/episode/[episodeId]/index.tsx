import { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { GetStaticPaths } from "next"

import { LocaleProps, WebSectionProps } from "../../../../../types/navigation"
import { PodcastEpisodeProps, PodcastWithEpisodesProps } from "../../../../../types/podcast"

import { getPodcastsDetail } from "../../../../../utils/getPodcastsDetail"
import { getShortenedString } from "../../../../../utils/getShortenedString"
import { deleteHtmlTags } from "../../../../../utils/deleteHtmlTags"

import Container from "../../../../../components/Container"
import { PodcastDetailCard } from "../../../../../components/podcast/PodcastDetailCard"
import { PodcastEpisodeDetailCard } from "../../../../../components/podcast/PodcastEpisodeDetailCard"
import { Loader } from "../../../../../components/common/Loader"
import { PodcastError } from "../../../../../components/common/PodcastError"
import { Button } from "../../../../../components/common/Button"
import { Icon } from "../../../../../components/common/Icon"
import { Breadcrumbs } from "../../../../../components/common/Breadcrumbs"
import { Breadcrumb } from "../../../../../components/common/Breadcrumb"

export default function EpisodeDetail(props: WebSectionProps) {
  const { section, pageContent, locale } = props

  const router = useRouter()

  const maintexts = pageContent.maintexts
  const podcastId = pageContent.data.podcastId
  const episodeId = pageContent.data.episodeId

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [podcastDetail, setPodcastDetail] = useState<PodcastWithEpisodesProps | undefined>(undefined)
  const [episodeDetail, setEpisodeDetail] = useState<PodcastEpisodeProps | undefined>(undefined)

  const [seoTitle, setSeoTitle] = useState<string>("")
  const [seoDescription, setSeoDescription] = useState<string>("")

  const [schemaName, setSchemaName] = useState<string>("")
  const [schemaUrl, setSchemaUrl] = useState<string>("")

  useEffect(() => {
    getPodcastsDetail(podcastId).then(data => {
      setIsLoading(false)
      setPodcastDetail(data || undefined)

      const episode = data?.episodes?.find((episode: PodcastEpisodeProps) => episode.id === episodeId)
      setEpisodeDetail(episode || undefined)

      if (data) {
        setSeoTitle(`${data?.author} - ${data?.title} ${episode?.title ? `- ${episode?.title}` : maintexts.podcast_not_found}`)
        episode?.content && setSeoDescription(getShortenedString(deleteHtmlTags(episode.content), 150))

        setSchemaName(episode?.title || "")
        setSchemaUrl(`${process.env.NEXT_PUBLIC_HOST}/podcast/${podcastId}/episode/${episodeId}`)
      } else {
        setSeoTitle(maintexts.podcast_not_found)
        setSeoDescription(maintexts.podcast_not_found_description)
      }
    })
    /* eslint-disable-next-line */
  }, [podcastId, episodeId])

  return (
    <Container>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content={seoTitle} />
        <meta name="og:description" property="og:description" content={seoDescription} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_HOST}/podcast/${podcastId}/episode/${episodeId}`} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_HOST}/podcast/${podcastId}/episode/${episodeId}`} />
        {((!isLoading && (!podcastDetail || !episodeDetail)) || (router.asPath !== `/podcast/${podcastId}/episode/${episodeId}`)) && (
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
          {!isLoading && (!podcastDetail || !episodeDetail) && (
            <div className="grid grid-cols-1 place-items-center">
              <PodcastError title={maintexts.sorry} message={maintexts.loadingError} label={maintexts.back} />
            </div>
          )}
          {!isLoading && podcastDetail && episodeDetail && (
            <>
              <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                <Breadcrumbs>
                  <Breadcrumb url="/" title={maintexts.home} position="1" />
                  <Icon icon="angles-right" />
                  <Breadcrumb url={`/podcast/${podcastId}`} title={podcastDetail.title} position="2" />
                  <Icon icon="angles-right" />
                  <Breadcrumb url={`/podcast/${podcastId}/episode/${episodeId}`} title={episodeDetail.title} position="3" />
                </Breadcrumbs>
                <Button icon="rotate-back" label={maintexts.back_to_episodes_list} className="w-full sm:w-auto text-xs px-2 py-1" onClick={() => router.back()} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6" itemScope itemType="https://schema.org/PodcastEpisode">
                <meta itemProp="url" content={schemaUrl} />
                <meta itemProp="name" content={schemaName} />
                <PodcastDetailCard podcastDetail={podcastDetail} section={section} />
                <PodcastEpisodeDetailCard episodeDetail={episodeDetail} />
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths<{ episodeId: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  }
}

export async function getStaticProps({ params, locale }: LocaleProps) {
  const maintexts = await import(`../../../../../language/${locale}.json`)
  const podcastId = params?.podcastId || ""
  const episodeId = params?.episodeId || ""

  return {
    props: {
      section: "episodedetail",
      pageContent: {
        maintexts: maintexts.default,
        data: {
          podcastId,
          episodeId,
        }
      },
      locale,
    },
    revalidate: 5,
  }
}

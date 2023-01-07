import Head from "next/head"
import { useRouter } from "next/router"
import Link from "next/link"
import { GetStaticPaths } from "next"

import { LocaleProps, WebSectionProps } from "../../../types/navigation"
import { PodcastWithEpisodesProps } from "../../../types/podcast"

import { getPodcastsDetail } from "../../api/getPodcastsDetail"

import { deleteHtmlTags } from "../../../utils/deleteHtmlTags"
import { getShortenedString } from "../../../utils/getShortenedString"

import Container from "../../../components/Container"
import { PodcastDetailCard } from "../../../components/podcast/PodcastDetailCard"
import { PodcastEpisodesList } from "../../../components/podcast/PodcastEpisodesList"
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
  const podcastDetail = pageContent.data.podcastDetail

  const seoTitle = podcastDetail ? `${podcastDetail?.author} - ${podcastDetail?.title}` : maintexts.podcast_not_found
  const seoDescription = podcastDetail?.summary ? getShortenedString(deleteHtmlTags(podcastDetail.summary), 150) : maintexts.podcast_not_found_description

  const schemaName = podcastDetail?.title || ""
  const schemaUrl = `${process.env.NEXT_PUBLIC_HOST}/podcast/${podcastId}`

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
        {(!podcastDetail || (router.asPath !== `/podcast/${podcastId}`)) && (
          <meta name="robots" content="noindex, nofollow, noarchive" />
        )}
      </Head>
      <div className="grid grid-cols-1 place-items-center">
        <div className="w-full max-w-screen-xl px-4 pt-8 pb-16">

          {!podcastDetail && (
            <div className="grid grid-cols-1 place-items-center">
              <PodcastError title={maintexts.sorry} message={maintexts.loadingError} label={maintexts.back} />
            </div>
          )}
          {podcastDetail && (
            <>
              <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                <Breadcrumbs>
                  <Breadcrumb url="/" title={maintexts.home} position="1" />
                  <Icon icon="angles-right" />
                  <Breadcrumb url={`/podcast/${podcastId}`} title={podcastDetail.title} position="2" />
                </Breadcrumbs>
                <Link href="/">
                  <Button icon="rotate-back" label={maintexts.back_to_podcasts_list} className="w-full sm:w-auto text-xs px-2 py-1" />
                </Link>
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

  /* const podcastList: PodcastProps[] | undefined = await getPodcastsList()
  const paths = podcastList ? podcastList?.map((podcast) => ({ params: { podcastId: podcast.id } })) : []

  return {
    paths: paths,
    fallback: podcastList ? false : "blocking",
  } */

  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  }
}

export async function getStaticProps({ params, locale }: LocaleProps) {
  const maintexts = await import(`../../../language/${locale}.json`)
  const podcastId = params?.podcastId || ""
  const podcastDetail: PodcastWithEpisodesProps | undefined = await getPodcastsDetail(podcastId)

  return {
    props: {
      section: "podcastdetail",
      pageContent: {
        maintexts: maintexts.default,
        data: {
          podcastId,
          podcastDetail,
        }
      },
      locale,
    },
    revalidate: 5,
  }
}

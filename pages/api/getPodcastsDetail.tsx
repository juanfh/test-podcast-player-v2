

//import { getData } from '../services/getData'
//import { mapPodcastDetail } from '../mappers/mapPodcasts'

import Parser from 'rss-parser'
import { mapPodcastDetail } from '../../mappers/mapPodcasts'

export const getPodcastsDetail = async (podcastId: string) => {

  const response = await fetch(`${process.env.API_URL}/lookup?id=${podcastId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.status !== 200) {
    return undefined
  }

  const data = await response.json()

  if (data?.results?.length > 0 && data?.results[0]?.feedUrl) {

    const parser = new Parser()
    const feed = await parser.parseURL(data?.results[0]?.feedUrl)

    if (feed) {
      const mappedPodcastDetail = mapPodcastDetail(podcastId, feed)
      return mappedPodcastDetail
    }

  } else {
    return undefined
  }

}

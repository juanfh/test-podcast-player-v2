import { getFromLocalStorage } from './localStorage/getFromLocalStorage'
import { saveToLocalStorage } from './localStorage/saveToLocalStorage'

import { getData } from '../services/getData'
import { mapPodcastDetail } from '../mappers/mapPodcasts'

export const getPodcastsDetail = async (podcastId: string) => {

  const podcastLocalDetail = getFromLocalStorage(`podcastDetail-${podcastId}}`)

  if (podcastLocalDetail) {
    saveToLocalStorage(`podcastDetail-${podcastId}}`, podcastLocalDetail)
    return podcastLocalDetail
  } else {
    const newPodcastDetail = await getData({ url: `lookup?id=${podcastId}` })

    if (newPodcastDetail?.results?.length > 0 && newPodcastDetail?.results[0]?.feedUrl) {
      try {
        const feed = await fetch(`/api/getParse`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: newPodcastDetail.results[0].feedUrl })
        }).then(res => res.json()).then(data => data.data ? data.data : data)

        if (feed) {
          const mappedPodcastDetail = mapPodcastDetail(podcastId, feed)
          saveToLocalStorage(`podcastDetail-${podcastId}}`, mappedPodcastDetail)
          return mappedPodcastDetail
        }
      } catch (error) {
        //console.log(error)
        return undefined
      }
    } else {
      return undefined
    }
  }

}

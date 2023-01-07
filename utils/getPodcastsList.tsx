import { getFromLocalStorage } from './localStorage/getFromLocalStorage'
import { saveToLocalStorage } from './localStorage/saveToLocalStorage'

import { getData } from '../services/getData'
import { mapPodcasts } from '../mappers/mapPodcasts'

export const getPodcastsList = async () => {

  const podcastLocalList = getFromLocalStorage('podcastList')

  if (podcastLocalList) {
    saveToLocalStorage('podcastList', podcastLocalList)
    return podcastLocalList
  } else {
    try {
      const newPodcastList = await getData({ url: "us/rss/toppodcasts/limit=100/genre=1310/json" })
      if (newPodcastList?.feed?.entry) {
        const mappedPodcastList = mapPodcasts(newPodcastList.feed.entry)
        saveToLocalStorage('podcastList', mappedPodcastList)
        return mappedPodcastList
      } else {
        return []
      }
    } catch (error) {
      //console.log(error)
      return []
    }

  }

}

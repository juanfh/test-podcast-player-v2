import { mapPodcasts } from "../../mappers/mapPodcasts"

export const getPodcastsList = async () => {

  try {

    const response = await fetch(`${process.env.API_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status !== 200) {
      return undefined
    }

    const data = await response.json()

    if (data?.feed?.entry) {
      return mapPodcasts(data.feed.entry)
    } else {
      return undefined
    }

  } catch (error) {
    //console.log(error)
    return undefined
  }

}

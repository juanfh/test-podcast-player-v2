import { PodcastProps, PodcastWithEpisodesProps } from "../types/podcast"
import { createSlug } from "../utils/createSlug"

export const mapPodcast = (podcast: any): PodcastProps => {
  return {
    id: podcast?.id?.attributes['im:id'] || '',
    title: podcast['im:name']?.label || '',
    author: podcast['im:artist']?.label || '',
    summary: podcast?.summary?.label || '',
    image: podcast['im:image'][2]?.label || '',
    category: podcast?.category?.attributes?.label || '',
  }
}

export const mapPodcasts = (podcasts: any): PodcastProps[] => {
  const data = (podcasts && podcasts.length > 0) ? podcasts.map((podcast: any) => {
    return mapPodcast(podcast)
  }) : []
  return data
}

export const mapPodcastDetail = (podcastId: string, podcast: any): PodcastWithEpisodesProps => {
  return {
    id: podcastId,
    title: podcast?.title || '',
    author: podcast?.itunes?.author || '',
    summary: podcast?.description || '',
    image: podcast?.image?.url || '',
    episodes: podcast?.items?.map((episode: any) => (
      {
        id: episode?.guid ? createSlug(episode.guid) : '',
        season: episode?.itunes?.season || '',
        episode: episode?.itunes?.episode || '',
        title: episode?.title || '',
        image: episode?.itunes?.image || '',
        date: episode?.pubDate || '',
        duration: episode?.itunes?.duration || '',
        content: episode?.content || '',
        url: episode?.enclosure?.url || '',
      }
    ))
  }
}
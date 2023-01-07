export interface PodcastProps {
  id: string,
  title: string,
  author: string,
  summary: string,
  image: string,
  category?: string,
}

export interface PodcastEpisodeProps {
  id: string,
  season: string,
  episode: string,
  title: string,
  image: string,
  date: string,
  duration: string,
  content: string,
  url: string,
}

export interface PodcastWithEpisodesProps extends PodcastProps {
  episodes: PodcastEpisodeProps[]
}
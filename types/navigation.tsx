export interface ContainerProps {
  children?: any
}

export interface LocaleProps {
  params: {
    podcastId: string
    episodeId: string
  }
  locale: string
}

export interface WebSectionProps {
  section: string
  pageContent: {
    maintexts: any
    data: any
  }
  locale: string
  params?: any
}

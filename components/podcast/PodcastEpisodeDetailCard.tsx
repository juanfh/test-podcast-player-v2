import { Interweave } from "interweave"
import { useEffect, useState } from "react"

import { PodcastEpisodeProps } from "../../types/podcast"
import { formatDate } from "../../utils/formatDate"

import { Player } from "../common/Player"

export interface PodcastEpisodeDetailCardProps {
  episodeDetail: PodcastEpisodeProps
}

export const PodcastEpisodeDetailCard = ({ episodeDetail }: PodcastEpisodeDetailCardProps) => {
  const [description, setDescription] = useState<string>("")
  useEffect(() => {
    setDescription(episodeDetail.content)
  }, [episodeDetail])

  return (
    <div className="w-full sm:col-span-2">
      {episodeDetail.date && <meta itemProp="datePublished" content={formatDate(episodeDetail.date, "en", "YYYY-MM-DD")} />}
      {episodeDetail.duration && <meta itemProp="duration" content={episodeDetail.duration} />}
      <div className=" bg-white rounded-lg shadow-lg overflow-hidden p-4 mb-4">
        <h1 className="text-xl font-bold text-fuchsia-800" itemProp="name">{episodeDetail.title}</h1>
        <div className="pt-4 text-left text-sm pb-8">
          <Interweave content={description} className="wysiwygeditor" itemProp="description" />
        </div>
        <div itemProp="associatedMedia" itemScope itemType="https://schema.org/MediaObject">
          <Player url={episodeDetail.url} />
        </div>
      </div>
    </div>
  )

}
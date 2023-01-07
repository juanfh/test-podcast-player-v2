import { Interweave } from "interweave"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { PodcastWithEpisodesProps } from "../../types/podcast"

export interface PodcastDetailCardProps {
  podcastDetail: PodcastWithEpisodesProps
  section: string
}

export const PodcastDetailCard = ({ podcastDetail, section }: PodcastDetailCardProps) => {

  const [description, setDescription] = useState<string>("")
  useEffect(() => {
    setDescription(podcastDetail.summary)
  }, [podcastDetail])

  return (
    <div className="w-full group sm:sticky sm:top-4 place-self-start bg-white rounded-lg shadow-lg p-4">
      <Link href={`/podcast/${podcastDetail.id}`}>
        <div className="leading-0 w-full grid grid-cols-1 place-content-center aspect-1 relative rounded-lg overflow-hidden">
          <Image src={podcastDetail.image} alt={podcastDetail.title} fill className="object-cover" itemProp="image" />
        </div>
      </Link>
      <div className="pt-4 text-center">
        <Link href={`/podcast/${podcastDetail.id}`}>
          {section === "podcastdetail" ? (
            <h1 className="text-xl font-bold text-fuchsia-800 group-hover:text-fuchsia-900 transition-colors duration-300">{podcastDetail.title}</h1>
          ) : (
            <div className="text-xl font-bold text-fuchsia-800 group-hover:text-fuchsia-900 transition-colors duration-300">{podcastDetail.title}</div>
          )}
          <div className="text-xs text-fuchsia-600 group-hover:text-fuchsia-700 transition-colors duration-300">by <span itemProp="author">{podcastDetail.author}</span></div>
        </Link>
        <div className="pt-4 text-left text-sm overflow-hidden">
          <Interweave content={description} className="wysiwygeditor" />
        </div>
      </div>
    </div>
  )
}
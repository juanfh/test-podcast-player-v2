import { useRouter } from "next/router"
import { Button } from "./Button"

export interface PodcastErrorProps {
  title: string
  message: string
  label?: string
}

export const PodcastError = ({ title, message, label }: PodcastErrorProps) => {

  const router = useRouter()

  return (
    <div className="grid grid-cols-1 place-items-center">
      <div className="text-xl font-bold text-fuchsia-800 pb-2">{title}</div>
      <div className="text-sm pb-4">{message}</div>
      {label && <Button icon="rotate-back" label={label} onClick={() => router.back()} />}
    </div>
  )
}
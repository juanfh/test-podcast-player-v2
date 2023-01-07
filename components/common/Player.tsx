export interface PlayerProps {
  url: string
}

export const Player = ({ url }: PlayerProps) => {

  return (
    <audio controls className="w-full">
      <source src={url} type="audio/mpeg" itemProp="contentUrl" />
    </audio>
  )
}
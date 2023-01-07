import Image from "next/image"

export interface SectionHeaderProps {
  title: string
  subtitle: string
}

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {

  return (
    <div className="relative border-b-4 border-white">
      <div className="absolute w-full h-full bg-transparent bg-gradient-to-b from-stone-900 z-10 mix-blend-multiply" />
      <div className="absolute w-full h-full z-20 grid grid-cols-1 place-items-center">
        <div>
          <h1 className="text-4xl font-bold text-white text-center">{title}</h1>
          <div className="text-white text-center">{subtitle}</div>
        </div>
      </div>
      <div className="relative w-full h-80">
        <Image src="/img/header-image.jpg" alt="podcast" fill className="object-cover" />
      </div>
    </div>
  )
}
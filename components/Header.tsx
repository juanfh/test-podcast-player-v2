import Image from "next/image"
import Link from "next/link"

export const Header = () => {

  return (
    <header className="bg-fuchsia-900 flex justify-center items-center border-b-4 border-white shadow-lg">
      <Link href="/">
        <div className="relative w-52 h-20">
          <Image src="/img/logo.svg" alt="logo" fill className="object-contain" />
        </div>
      </Link>
    </header>
  )
}
import Image from "next/image"

export const Loader = () => {

  return (
    <>
      <div className="bg-fuchsia-700 p-2 w-min rounded-lg shadow-lg mb-2">
        <div className="relative w-8 h-8">
          <Image src="/img/loader.svg" alt="loader" fill className="object-contain" />
        </div>
      </div>
      <div className="font-bold text-xs uppercase text-fuchsia-700">Cargando</div>
    </>
  )

}
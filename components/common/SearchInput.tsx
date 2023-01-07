import { Icon } from "./Icon"

export interface SearchInputProps {
  value: string
  maintexts: any
  className?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput = ({ value, maintexts, className = "", onChange }: SearchInputProps) => {

  return (
    <div className={`grid grid-cols-1 place-items-center ${className}`}>
      <div className="w-full max-w-sm text-center">
        <div className="relative">
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 grid grid-cols-1 place-items-center">
            <Icon icon="magnifying-glass" />
          </div>
          <input id="search" name="search" type="text" value={value} placeholder={maintexts.enterSearch} className="w-full pr-4 pl-2 py-2 rounded border border-zinc-300 focus:outline-none focus:border-zinc-300 focus:shadow text-sm bg-white" onChange={onChange} />
        </div>
      </div>
    </div>
  )
}
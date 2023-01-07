import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
  IconPrefix,
  IconName
} from '@fortawesome/fontawesome-svg-core'
import { useEffect, useState } from "react"

export interface IconProps {
  prefix?: IconPrefix
  icon: IconName
  size?: "xs" | "sm" | "lg" | "2x" | "3x" | "5x" | "7x" | "10x"
  onClick?: () => void
}

export const Icon = ({ prefix = "fas", icon, size, onClick, ...otherProps }: IconProps) => {

  const [faIcon, setFaIcon] = useState<any>(null)

  useEffect(() => {
    const coffeeLookup: IconLookup = { prefix: prefix, iconName: icon }
    const coffeeIconDefinition: IconDefinition = findIconDefinition(coffeeLookup)
    setFaIcon(coffeeIconDefinition)
  }, [prefix, icon])

  return (
    <>
      {faIcon && <FontAwesomeIcon icon={faIcon} onClick={onClick} {...otherProps} />}
    </>
  )
}
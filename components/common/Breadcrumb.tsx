import Link from "next/link"

export interface BreadcrumbProps {
  url: string
  title: string
  position: string
}

export const Breadcrumb = ({ url, title, position }: BreadcrumbProps) => {

  return (
    <div itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
      <Link href={url} itemProp="item">
        <span itemProp="name">{title}</span>
        <meta itemProp="position" content={position} />
      </Link>
    </div>
  )
}
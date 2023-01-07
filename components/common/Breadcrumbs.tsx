export const Breadcrumbs = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="flex flex-wrap items-center text-xs text-fuchsia-600 gap-2" itemScope itemType="https://schema.org/BreadcrumbList">
      {children}
    </div>
  )
}
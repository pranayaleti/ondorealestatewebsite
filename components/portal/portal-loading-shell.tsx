export function PortalLoadingShell({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="container flex min-h-[60vh] items-center justify-center py-12">
      <div className="max-w-md rounded-2xl border bg-background/95 p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm text-foreground/70">{description}</p>
      </div>
    </div>
  )
}

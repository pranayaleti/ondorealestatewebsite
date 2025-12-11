import Script from "next/script"

type JsonLdProps = {
  data?: object | object[] | null
  id?: string
}

const flattenData = (data?: object | object[] | null) => {
  if (!data) return []
  return Array.isArray(data) ? data.filter(Boolean) : [data]
}

export function JsonLd({ data, id = "seo-jsonld" }: JsonLdProps) {
  const entries = flattenData(data)
  if (!entries.length) return null

  const payload = entries.length === 1 ? entries[0] : entries

  return (
    <Script id={id} type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(payload)}
    </Script>
  )
}

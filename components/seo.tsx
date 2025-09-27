"use client"

import Head from "next/head"
import React from "react"

type SEOProps = {
  title: string
  description: string
  pathname?: string
  image?: string
  jsonLd?: object | null
}

export default function SEO({ title, description, pathname = "/", image, jsonLd = null }: SEOProps) {
  const domain = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"
  const url = `${domain.replace(/\/$/, "")}${pathname}`
  const ogImage = image || `${domain}/assets/og-image.png`

  return (
    <Head>
      <title>{`${title} | Ondo Real Estate`}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${title} | Ondo Real Estate`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Ondo Real Estate" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | Ondo Real Estate`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* canonical */}
      <link rel="canonical" href={url} />

      {/* JSON-LD for search engines / AI */}
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
    </Head>
  )
}

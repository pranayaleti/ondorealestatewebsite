interface RiskDisclosureProps {
  className?: string
}

export function RiskDisclosure({ className = "" }: RiskDisclosureProps) {
  return (
    <div className={`text-center ${className}`}>
      <h3 className="text-xl font-bold mb-4 dark:text-foreground">Important Disclosures</h3>
      <p className="text-sm text-foreground/70 dark:text-foreground/70 max-w-4xl mx-auto">
        The information provided on this page is for informational purposes only and does not
        constitute an offer to sell, a solicitation of an offer to buy, or a recommendation for any
        security or investment product. All investments involve risk, including the potential loss of
        principal. Past performance does not guarantee future results. Projected returns are
        estimates only and may not reflect actual performance. Please consult with a qualified
        financial advisor, attorney, or tax professional before making any investment decisions.
      </p>
    </div>
  )
}

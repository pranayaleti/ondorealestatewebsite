export type LoanProgram = 'conventional' | 'fha' | 'va' | 'usda'

export function calculateMonthlyPI(principal: number, annualRatePercent: number, termYears: number): number {
  const monthlyRate = (annualRatePercent / 100) / 12
  const totalPayments = termYears * 12
  if (monthlyRate === 0) return totalPayments === 0 ? 0 : principal / totalPayments
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1)
}

export function getLtv(homePrice: number, downPayment: number): number {
  if (homePrice <= 0) return 0
  const loan = Math.max(0, homePrice - downPayment)
  return loan / homePrice
}

export function applyFinancedUpfrontToLoan(baseLoan: number, upfrontFee: number, financed: boolean): number {
  return financed ? baseLoan + upfrontFee : baseLoan
}

export function getProgramDTI(program: LoanProgram): { frontPercent: number; backPercent: number } {
  switch (program) {
    case 'fha':
      // FHA typical manual underwriting guidelines
      return { frontPercent: 31, backPercent: 43 }
    case 'va':
      // VA uses residual income; 41% DTI rule of thumb
      return { frontPercent: 0, backPercent: 41 }
    case 'usda':
      // USDA: 29/41 guidance
      return { frontPercent: 29, backPercent: 41 }
    case 'conventional':
    default:
      // Conventional baseline used publicly
      return { frontPercent: 28, backPercent: 36 }
  }
}

export function estimateConventionalPmiAnnualFactor(ltv: number, creditScore: number): number {
  if (ltv < 0.80) return 0
  // Rough market-average PMI tiers by credit; conservative assumptions
  if (creditScore >= 760) return ltv > 0.90 ? 0.004 : 0.003
  if (creditScore >= 740) return ltv > 0.90 ? 0.005 : 0.004
  if (creditScore >= 700) return 0.008
  if (creditScore >= 660) return 0.011
  return 0.015
}

export function getProgramMI(
  program: LoanProgram,
  baseLoan: number,
  homePrice: number,
  creditScore: number,
  loanTermYears: number,
  downPayment: number
): { monthlyMI: number; upfrontFee: number; description: string } {
  const ltv = getLtv(homePrice, downPayment)

  switch (program) {
    case 'conventional': {
      const annual = estimateConventionalPmiAnnualFactor(ltv, creditScore)
      const monthlyMI = annual > 0 ? (baseLoan * annual) / 12 : 0
      return { monthlyMI, upfrontFee: 0, description: annual > 0 ? 'Conventional PMI' : 'No PMI (LTV < 80%)' }
    }
    case 'fha': {
      // FHA UFMIP ~1.75% upfront; annual MIP commonly 0.55% (>95% LTV) or 0.50% (<=95%) for 30y
      const upfrontFee = baseLoan * 0.0175
      const annualMip = loanTermYears >= 30
        ? (ltv > 0.95 ? 0.0055 : 0.0050)
        : (ltv > 0.95 ? 0.0050 : 0.0045)
      const monthlyMI = (baseLoan * annualMip) / 12
      return { monthlyMI, upfrontFee, description: 'FHA MIP' }
    }
    case 'va': {
      // VA: no monthly MI; funding fee approx by down payment (first use)
      const downPct = homePrice > 0 ? (downPayment / homePrice) : 0
      let feeRate = 0.0215
      if (downPct >= 0.10) feeRate = 0.0125
      else if (downPct >= 0.05) feeRate = 0.015
      const upfrontFee = baseLoan * feeRate
      return { monthlyMI: 0, upfrontFee, description: 'VA Funding Fee' }
    }
    case 'usda': {
      // USDA: 1.0% upfront guarantee fee; 0.35% annual fee monthly
      const upfrontFee = baseLoan * 0.01
      const monthlyMI = (baseLoan * 0.0035) / 12
      return { monthlyMI, upfrontFee, description: 'USDA Guarantee Fee' }
    }
    default:
      return { monthlyMI: 0, upfrontFee: 0, description: '' }
  }
}

export function clampCreditScore(score: number): number {
  if (!Number.isFinite(score)) return 740
  return Math.max(300, Math.min(850, Math.round(score)))
}



import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface RefinanceData {
  currentBalance: number;
  currentRate: number;
  currentPayment: number;
  newRate: number;
  newTerm: number;
  closingCosts: number;
  propertyTax: number;
  insurance: number;
}

interface RefinanceResults {
  newMonthlyPayment: number;
  monthlySavings: number;
  breakEvenMonths: number;
  totalSavings: number;
  interestSavings: number;
  newPI: number;
  newEscrows: number;
  currentPI: number;
}

const RefinanceCalculator: React.FC = () => {
  const [formData, setFormData] = useState<RefinanceData>({
    currentBalance: 200000,
    currentRate: 5.5,
    currentPayment: 1200,
    newRate: 4.0,
    newTerm: 30,
    closingCosts: 3000,
    propertyTax: 3000,
    insurance: 1200
  });

  const [results, setResults] = useState<RefinanceResults | null>(null);

  useEffect(() => {
    calculateRefinance();
  }, [formData]);

  const calculateRefinance = () => {
    const { currentBalance, newRate, newTerm, closingCosts, currentPayment } = formData;
    
    // Calculate monthly interest rate
    const monthlyRate = newRate / 100 / 12;
    const totalPayments = newTerm * 12;
    
    // Calculate new monthly payment (P&I only)
    const newMonthlyPayment = currentBalance * 
      (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    // Add property tax and insurance
    const monthlyTax = formData.propertyTax / 12;
    const monthlyInsurance = formData.insurance / 12;
    const escrows = monthlyTax + monthlyInsurance;
    const totalNewPayment = newMonthlyPayment + escrows;
    
    // Calculate monthly savings
    const monthlySavings = currentPayment - totalNewPayment;
    
    // Calculate break-even months
    const breakEvenMonths = closingCosts / monthlySavings;
    
    // Calculate total savings over loan term (P&I focused minus closing costs)
    const totalSavings = (currentPayment - escrows - newMonthlyPayment) * totalPayments - closingCosts;
    
    // Estimate interest savings by comparing PI over full term
    const interestSavings = (currentPayment - escrows) * totalPayments - (newMonthlyPayment * totalPayments);
    
    setResults({
      newMonthlyPayment: totalNewPayment,
      monthlySavings,
      breakEvenMonths,
      totalSavings,
      interestSavings,
      newPI: newMonthlyPayment,
      newEscrows: escrows,
      currentPI: currentPayment - escrows
    });
  };

  const handleInputChange = (field: keyof RefinanceData, value: number) => {
    setFormData({ ...formData, [field]: value });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted to-muted">
      {/* Header */}
      <div className="bg-background shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/calculators" className="text-primary hover:text-orange-800">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Refinance Calculator</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-card rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Current Mortgage</h2>
            
            <div className="space-y-6">
              {/* Current Balance */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Current Loan Balance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={formData.currentBalance}
                    onChange={(e) => handleInputChange('currentBalance', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="200,000"
                  />
                </div>
              </div>

              {/* Current Rate */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Current Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.currentRate}
                  onChange={(e) => handleInputChange('currentRate', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="5.5"
                />
              </div>

              {/* Current Payment */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Current Monthly Payment
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={formData.currentPayment}
                    onChange={(e) => handleInputChange('currentPayment', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="1,200"
                  />
                </div>
              </div>

              <h2 className="text-xl font-semibold text-foreground mb-6 mt-8">New Mortgage</h2>

              {/* New Rate */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  New Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.newRate}
                  onChange={(e) => handleInputChange('newRate', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="4.0"
                />
              </div>

              {/* New Term */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  New Loan Term (years)
                </label>
                <select
                  value={formData.newTerm}
                  onChange={(e) => handleInputChange('newTerm', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value={15}>15 years</option>
                  <option value={20}>20 years</option>
                  <option value={30}>30 years</option>
                </select>
              </div>

              {/* Closing Costs */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Refinancing Closing Costs
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={formData.closingCosts}
                    onChange={(e) => handleInputChange('closingCosts', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="3,000"
                  />
                </div>
              </div>

              {/* Property Tax */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Annual Property Tax
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={formData.propertyTax}
                    onChange={(e) => handleInputChange('propertyTax', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="3,000"
                  />
                </div>
              </div>

              {/* Insurance */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Annual Homeowners Insurance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={formData.insurance}
                    onChange={(e) => handleInputChange('insurance', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="1,200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {results && (
              <>
                {/* Monthly Savings */}
                <div className="bg-card rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Monthly Payment Comparison</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-sm text-destructive mb-1">Current Payment</p>
                        <p className="text-lg font-semibold text-red-700">{formatCurrency(formData.currentPayment)}</p>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-sm text-primary mb-1">New Payment</p>
                        <p className="text-lg font-semibold text-green-700">{formatCurrency(results.newMonthlyPayment)}</p>
                        <p className="text-xs text-muted-foreground mt-1">P&I: {formatCurrency(results.newPI)} • Escrows: {formatCurrency(results.newEscrows)}</p>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-primary mb-1">Monthly Savings</p>
                        <p className="text-2xl font-bold text-orange-700">{formatCurrency(results.monthlySavings)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Break-Even Analysis */}
                <div className="bg-card rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Break-Even Analysis</h2>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-yellow-600 mb-1">Break-Even Time</p>
                        <p className="text-2xl font-bold text-yellow-700">
                          {results.breakEvenMonths.toFixed(1)} months
                        </p>
                        <p className="text-sm text-yellow-600 mt-1">
                          Time to recoup closing costs
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Closing costs: {formatCurrency(formData.closingCosts)}</p>
                      <p>• Monthly savings: {formatCurrency(results.monthlySavings)}</p>
                      <p>• Break-even: {results.breakEvenMonths.toFixed(1)} months</p>
                    </div>
                  </div>
                </div>

                {/* Total Savings */}
                <div className="bg-card rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Total Savings</h2>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-primary mb-1">Total Savings</p>
                        <p className="text-2xl font-bold text-green-700">{formatCurrency(results.totalSavings)}</p>
                        <p className="text-sm text-primary mt-1">
                          Over {formData.newTerm} years (minus closing costs)
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Interest savings (PI-only est.): {formatCurrency(results.interestSavings)}</p>
                      <p>• Closing costs: {formatCurrency(formData.closingCosts)}</p>
                      <p>• Net savings: {formatCurrency(results.totalSavings)}</p>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-card rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Recommendations</h2>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    {results.breakEvenMonths < 24 ? (
                      <p className="text-primary font-medium">✓ Refinancing looks beneficial with a quick break-even period</p>
                    ) : (
                      <p className="text-yellow-600 font-medium">⚠ Consider if you plan to stay in the home long enough to benefit</p>
                    )}
                    <p>• Factor in your plans to stay in the home</p>
                    <p>• Consider the opportunity cost of closing costs</p>
                    <p>• Shop around for the best rates and fees</p>
                    <p>• Consult with a mortgage professional</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-card rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">About Refinancing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <h3 className="font-medium text-foreground mb-2">When to Consider Refinancing:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Interest rates have dropped significantly</li>
                <li>Your credit score has improved</li>
                <li>You want to change loan terms</li>
                <li>You need to remove PMI</li>
                <li>You want to consolidate debt</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Important Factors:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Break-even time vs. how long you'll stay</li>
                <li>Total closing costs and fees</li>
                <li>Impact on loan term and total interest</li>
                <li>Current market conditions</li>
                <li>Your financial situation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefinanceCalculator;

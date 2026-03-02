"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { LoanProgram, getProgramDTI, getProgramMI, clampCreditScore, calculateMonthlyPI } from '@/lib/mortgage-utils';

interface AffordabilityData {
  annualIncome: number;
  monthlyDebts: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTaxRate: number;
  insuranceRate: number;
  program: LoanProgram;
  creditScore: number;
}

interface AffordabilityResults {
  maxHomePrice: number;
  maxLoanAmount: number;
  monthlyPayment: number;
  debtToIncomeRatio: number;
  frontEndRatio: number;
  backEndRatio: number;
  recommendedHomePrice: number;
}

const AffordabilityCalculator: React.FC = () => {
  const [formData, setFormData] = useState<AffordabilityData>({
    annualIncome: 80000,
    monthlyDebts: 500,
    downPayment: 20000,
    interestRate: 4.5,
    loanTerm: 30,
    propertyTaxRate: 1.2,
    insuranceRate: 0.5,
    program: 'conventional',
    creditScore: 740
  });

  const [results, setResults] = useState<AffordabilityResults | null>(null);

  const calculateAffordability = React.useCallback(() => {
    const { annualIncome, monthlyDebts, downPayment, interestRate, loanTerm, propertyTaxRate, insuranceRate } = formData;
    
    const monthlyIncome = annualIncome / 12;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;
    
    // Calculate maximum monthly payment using program-specific DTI
    const dti = getProgramDTI(formData.program);
    const frontRatio = dti.frontPercent > 0 ? (dti.frontPercent / 100) : 0;
    const backRatio = dti.backPercent / 100;
    const maxFrontEndPayment = frontRatio > 0 ? monthlyIncome * frontRatio : Number.POSITIVE_INFINITY;
    const maxBackEndPayment = (monthlyIncome * backRatio) - monthlyDebts;
    
    // Use the lower of the two ratios
    const maxMonthlyPayment = Math.min(maxFrontEndPayment, maxBackEndPayment);
    
    // Calculate maximum loan amount using the mortgage payment formula
    // P = PMT * (1 - (1 + r)^-n) / r
    // Where P = principal, PMT = monthly payment, r = monthly rate, n = total payments
    const maxLoanAmount = maxMonthlyPayment * 
      (1 - Math.pow(1 + monthlyRate, -totalPayments)) / monthlyRate;
    
    // Calculate property tax and insurance based on home price
    // We need to iterate to find the right home price
    const maxHomePrice = maxLoanAmount + downPayment;
    let adjustedMaxHomePrice = maxHomePrice;
    
    // Iterate to find the correct home price that fits within the payment constraints
    for (let i = 0; i < 10; i++) {
      const monthlyTax = (adjustedMaxHomePrice * propertyTaxRate / 100) / 12;
      const monthlyInsurance = (adjustedMaxHomePrice * insuranceRate / 100) / 12;
      // Approximate MI at this price point for program
      const estLoan = adjustedMaxHomePrice - downPayment;
      const credit = clampCreditScore(formData.creditScore);
      const mi = getProgramMI(formData.program, estLoan, adjustedMaxHomePrice, credit, loanTerm, downPayment).monthlyMI;
      const availableForPandI = maxMonthlyPayment - monthlyTax - monthlyInsurance - mi;
      
      if (availableForPandI > 0) {
        const newMaxLoanAmount = availableForPandI * 
          (1 - Math.pow(1 + monthlyRate, -totalPayments)) / monthlyRate;
        const newMaxHomePrice = newMaxLoanAmount + downPayment;
        
        if (Math.abs(newMaxHomePrice - adjustedMaxHomePrice) < 100) {
          break;
        }
        adjustedMaxHomePrice = newMaxHomePrice;
      } else {
        adjustedMaxHomePrice *= 0.95;
      }
    }
    
    // Calculate final results
    const finalMaxHomePrice = Math.min(maxHomePrice, adjustedMaxHomePrice);
    const finalMaxLoanAmount = finalMaxHomePrice - downPayment;
    
    // Calculate actual monthly payment
    const monthlyTax = (finalMaxHomePrice * propertyTaxRate / 100) / 12;
    const monthlyInsurance = (finalMaxHomePrice * insuranceRate / 100) / 12;
    const monthlyPandI = calculateMonthlyPI(finalMaxLoanAmount, interestRate, loanTerm);
    const credit = clampCreditScore(formData.creditScore);
    const monthlyMI = getProgramMI(formData.program, finalMaxLoanAmount, finalMaxHomePrice, credit, loanTerm, downPayment).monthlyMI;
    
    const totalMonthlyPayment = monthlyPandI + monthlyTax + monthlyInsurance + monthlyMI;
    
    // Calculate ratios
    const debtToIncomeRatio = ((monthlyDebts + totalMonthlyPayment) / monthlyIncome) * 100;
    const frontEndRatio = (totalMonthlyPayment / monthlyIncome) * 100;
    const backEndRatio = ((monthlyDebts + totalMonthlyPayment) / monthlyIncome) * 100;
    
    // Recommended home price (conservative estimate)
    const recommendedHomePrice = finalMaxHomePrice * 0.9;
    
    setResults({
      maxHomePrice: finalMaxHomePrice,
      maxLoanAmount: finalMaxLoanAmount,
      monthlyPayment: totalMonthlyPayment,
      debtToIncomeRatio,
      frontEndRatio,
      backEndRatio,
      recommendedHomePrice
    });
  }, [formData]);

  useEffect(() => {
    calculateAffordability();
  }, [calculateAffordability]);

  const handleInputChange = <K extends keyof AffordabilityData>(field: K, value: AffordabilityData[K]) => {
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
    return `${value.toFixed(1)}%`;
  };

  const downloadPDF = async () => {
    if (!results) return;

    const element = document.getElementById('pdf-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('affordability-analysis.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const getRatioStatus = (ratio: number, type: 'front' | 'back') => {
    if (type === 'front') {
      return ratio <= 28 ? 'text-primary' : ratio <= 31 ? 'text-yellow-600' : 'text-destructive';
    } else {
      return ratio <= 36 ? 'text-primary' : ratio <= 43 ? 'text-yellow-600' : 'text-destructive';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-background shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/calculators" className="text-primary hover:text-primary">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-foreground">Mortgage Affordability Calculator</h1>
            </div>
            {results && (
              <button
                onClick={downloadPDF}
                className="bg-primary hover:opacity-90 text-primary-foreground px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-card rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Enter Your Financial Information</h2>
            
            <div className="space-y-6">
              {/* Annual Income */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Annual Income
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-foreground/70">$</span>
                  <input
                    type="number"
                    value={formData.annualIncome || ''}
                    onChange={(e) => handleInputChange('annualIncome', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="80,000"
                  />
                </div>
              </div>

              {/* Monthly Debts */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Monthly Debt Payments
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-foreground/70">$</span>
                  <input
                    type="number"
                    value={formData.monthlyDebts || ''}
                    onChange={(e) => handleInputChange('monthlyDebts', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="500"
                  />
                </div>
                <p className="text-sm text-foreground/70 mt-1">
                  Credit cards, car loans, student loans, etc.
                </p>
              </div>

              {/* Down Payment */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Available Down Payment
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-foreground/70">$</span>
                  <input
                    type="number"
                    value={formData.downPayment || ''}
                    onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="20,000"
                  />
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Expected Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.interestRate || ''}
                  onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="4.5"
                />
              </div>

              {/* Loan Term */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Loan Term (years)
                </label>
                <select
                  value={formData.loanTerm}
                  onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value={15}>15 years</option>
                  <option value={20}>20 years</option>
                  <option value={30}>30 years</option>
                </select>
              </div>

              {/* Property Tax Rate */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Property Tax Rate (% of home value)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.propertyTaxRate || ''}
                  onChange={(e) => handleInputChange('propertyTaxRate', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="1.2"
                />
              </div>

              {/* Insurance Rate */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Homeowners Insurance Rate (% of home value)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.insuranceRate || ''}
                  onChange={(e) => handleInputChange('insuranceRate', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="0.5"
                />
              </div>

              {/* Loan Program */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Loan Program</label>
                <select
                  value={formData.program}
                  onChange={(e) => handleInputChange('program', e.target.value as LoanProgram)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="conventional">Conventional</option>
                  <option value="fha">FHA</option>
                  <option value="va">VA</option>
                  <option value="usda">USDA</option>
                </select>
              </div>

              {/* Credit Score */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Credit Score</label>
                <input
                  type="number"
                  min={300}
                  max={850}
                  value={formData.creditScore || ''}
                  onChange={(e) => handleInputChange('creditScore', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="740"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {results && (
              <div id="pdf-content">
                {/* Affordability Summary */}
                <div className="bg-card rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">What You Can Afford</h2>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-primary mb-1">Maximum Home Price</p>
                        <p className="text-3xl font-bold text-foreground">{formatCurrency(results.maxHomePrice)}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-sm text-foreground/70 mb-1">Max Loan Amount</p>
                        <p className="text-lg font-semibold text-foreground">{formatCurrency(results.maxLoanAmount)}</p>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-sm text-foreground/70 mb-1">Monthly Payment</p>
                        <p className="text-lg font-semibold text-foreground">{formatCurrency(results.monthlyPayment)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Debt Ratios */}
                <div className="bg-card rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Debt-to-Income Ratios</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/70">Front-End Ratio (Housing):</span>
                      <span className={`font-semibold ${getRatioStatus(results.frontEndRatio, 'front')}`}>
                        {formatPercent(results.frontEndRatio)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/70">Back-End Ratio (Total Debt):</span>
                      <span className={`font-semibold ${getRatioStatus(results.backEndRatio, 'back')}`}>
                        {formatPercent(results.backEndRatio)}
                      </span>
                    </div>
                    
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm text-foreground/70">
                        <strong>Front-End:</strong> Housing expenses ÷ Gross monthly income (target: ≤28%)<br/>
                        <strong>Back-End:</strong> Total debt payments ÷ Gross monthly income (target: ≤36%)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-card rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Recommendations</h2>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">Conservative Home Price</h3>
                      <p className="text-2xl font-bold text-green-700">{formatCurrency(results.recommendedHomePrice)}</p>
                      <p className="text-sm text-primary mt-1">
                        This gives you a 10% buffer for unexpected expenses
                      </p>
                    </div>
                    
                    <div className="space-y-2 text-sm text-foreground/70">
                      <p>• Consider a 20% down payment to avoid PMI</p>
                      <p>• Keep emergency savings separate from down payment</p>
                      <p>• Factor in maintenance costs (1-2% of home value annually)</p>
                      <p>• Account for potential rate increases if using ARM</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-card rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">About This Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-foreground/70">
            <div>
              <h3 className="font-medium text-foreground mb-2">How It Works:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Uses standard 28/36 debt-to-income ratios</li>
                <li>Calculates maximum affordable home price</li>
                <li>Considers property taxes and insurance</li>
                <li>Accounts for existing monthly debt</li>
                <li>Provides conservative recommendations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Important Factors:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Credit score affects interest rates</li>
                <li>Down payment size impacts loan terms</li>
                <li>Property taxes vary by location</li>
                <li>Insurance costs depend on coverage</li>
                <li>Consider future income stability</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffordabilityCalculator;

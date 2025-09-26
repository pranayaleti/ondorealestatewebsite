import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { LoanProgram, calculateMonthlyPI, clampCreditScore, getProgramMI } from '@/lib/mortgage-utils';

interface MortgageData {
  homePrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  propertyTax: number;
  insurance: number;
  pmi: number;
  program: LoanProgram;
  creditScore: number;
  financeUpfront: boolean;
}

interface PaymentBreakdown {
  principal: number;
  interest: number;
  tax: number;
  insurance: number;
  pmi: number;
  monthlyPI: number;
  totalMonthly: number;
  totalYearly: number;
  totalCost: number;
  totalInterest: number;
  amortizationSchedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    remainingBalance: number;
  }>;
}

const MortgagePaymentCalculator: React.FC = () => {
  const [formData, setFormData] = useState<MortgageData>({
    homePrice: 300000,
    downPayment: 60000,
    loanAmount: 240000,
    interestRate: 4.5,
    loanTerm: 30,
    propertyTax: 3000,
    insurance: 1200,
    pmi: 0,
    program: 'conventional',
    creditScore: 740,
    financeUpfront: true
  });

  const [results, setResults] = useState<PaymentBreakdown | null>(null);
  const [showAmortization, setShowAmortization] = useState(false);

  useEffect(() => {
    calculateMortgage();
  }, [formData]);

  const calculateMortgage = () => {
    const { homePrice, downPayment, loanAmount, interestRate, loanTerm, propertyTax, insurance, program } = formData;
    
    // Calculate monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;
    
    // Program MI and upfront fees
    const credit = clampCreditScore(formData.creditScore);
    const { monthlyMI, upfrontFee, description: _miDesc } = getProgramMI(program, loanAmount, homePrice, credit, loanTerm, downPayment);
    const financedLoanAmount = formData.financeUpfront ? loanAmount + upfrontFee : loanAmount;

    // Calculate monthly mortgage payment (P&I) on base loan amount (not financed amount)
    const monthlyPayment = calculateMonthlyPI(loanAmount, formData.interestRate, formData.loanTerm);

    // Calculate monthly property tax and insurance
    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;

    // Monthly MI from program rules
    const monthlyPmi = monthlyMI;

    // Calculate total monthly payment
    const totalMonthly = monthlyPayment + monthlyTax + monthlyInsurance + monthlyPmi;

    // Calculate yearly totals
    const totalYearly = totalMonthly * 12;
    const totalCost = totalYearly * loanTerm;
    // Total interest is on the base loan amount (not financed amount for interest calculation)
    const totalInterest = (monthlyPayment * totalPayments) - loanAmount;

    // Generate amortization schedule starting with financed amount
    const amortizationSchedule = [];
    let remainingBalance = financedLoanAmount;
    
    for (let month = 1; month <= Math.min(360, totalPayments); month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      if (remainingBalance < 0) remainingBalance = 0;
      
      amortizationSchedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: Math.max(0, remainingBalance)
      });
    }
    
    setResults({
      principal: monthlyPayment - (financedLoanAmount * monthlyRate),
      interest: financedLoanAmount * monthlyRate,
      tax: monthlyTax,
      insurance: monthlyInsurance,
      pmi: monthlyPmi,
      monthlyPI: monthlyPayment,
      totalMonthly,
      totalYearly,
      totalCost,
      totalInterest,
      amortizationSchedule
    });
  };

  const handleInputChange = (field: keyof MortgageData, value: any) => {
    const newData = { ...formData, [field]: value };
    
    // Auto-calculate loan amount if home price or down payment changes
    if (field === 'homePrice' || field === 'downPayment') {
      newData.loanAmount = Math.max(0, newData.homePrice - newData.downPayment);
    }
    
    setFormData(newData);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
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

      pdf.save('mortgage-payment-analysis.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/calculators" className="text-blue-600 hover:text-blue-800">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Mortgage Payment Calculator</h1>
            </div>
            {results && (
              <button
                onClick={downloadPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
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
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Enter Your Information</h2>
            
            <div className="space-y-6">
              {/* Home Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.homePrice}
                    onChange={(e) => handleInputChange('homePrice', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="300,000"
                  />
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      value={formData.downPayment}
                      onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="60,000"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={((formData.downPayment / formData.homePrice) * 100).toFixed(1)}
                      onChange={(e) => {
                        const percent = Number(e.target.value);
                        const newDownPayment = (percent / 100) * formData.homePrice;
                        handleInputChange('downPayment', newDownPayment);
                      }}
                      className="w-full pr-8 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="20.0"
                    />
                    <span className="absolute right-3 top-3 text-gray-500">%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {formData.downPayment < formData.homePrice * 0.2 && 
                    "Note: Less than 20% down payment will require PMI"
                  }
                </p>
              </div>

              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange('loanAmount', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="240,000"
                  />
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.interestRate}
                  onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="4.5"
                />
              </div>

              {/* Loan Term */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Term (years)
                </label>
                <select
                  value={formData.loanTerm}
                  onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={15}>15 years</option>
                  <option value={20}>20 years</option>
                  <option value={30}>30 years</option>
                </select>
              </div>

              {/* Property Tax */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Property Tax
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.propertyTax}
                    onChange={(e) => handleInputChange('propertyTax', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="3,000"
                  />
                </div>
              </div>

              {/* Insurance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Homeowners Insurance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.insurance}
                    onChange={(e) => handleInputChange('insurance', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1,200"
                  />
                </div>
              </div>

              {/* Loan Program */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Program
                </label>
                <select
                  value={formData.program}
                  onChange={(e) => handleInputChange('program', e.target.value as LoanProgram)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="conventional">Conventional</option>
                  <option value="fha">FHA</option>
                  <option value="va">VA</option>
                  <option value="usda">USDA</option>
                </select>
              </div>

              {/* Credit Score */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credit Score
                </label>
                <input
                  type="number"
                  min={300}
                  max={850}
                  value={formData.creditScore}
                  onChange={(e) => handleInputChange('creditScore', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="740"
                />
              </div>

              {/* Finance Upfront Fee */}
              <div className="flex items-center space-x-2">
                <input
                  id="financeUpfront"
                  type="checkbox"
                  checked={formData.financeUpfront}
                  onChange={(e) => handleInputChange('financeUpfront', e.target.checked as unknown as number)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="financeUpfront" className="text-sm text-gray-700">Finance upfront fee into loan (FHA/VA/USDA)</label>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {results && (
              <div id="pdf-content">
                {/* Monthly Payment Summary */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Payment Breakdown</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Principal & Interest:</span>
                      <span className="font-semibold">{formatCurrency(results.monthlyPI)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">• Principal (first month):</span>
                      <span className="text-green-600">{formatCurrency(results.principal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">• Interest (first month):</span>
                      <span className="text-red-600">{formatCurrency(results.interest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Tax:</span>
                      <span className="font-semibold">{formatCurrency(results.tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Insurance:</span>
                      <span className="font-semibold">{formatCurrency(results.insurance)}</span>
                    </div>
                    {results.pmi > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">PMI:</span>
                        <span className="font-semibold">{formatCurrency(results.pmi)}</span>
                      </div>
                    )}
                    <hr className="my-3" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Monthly Payment:</span>
                      <span className="text-blue-600">{formatCurrency(results.totalMonthly)}</span>
                    </div>
                  </div>
                </div>

                {/* Cost Summary */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Cost Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Payment:</span>
                      <span className="font-semibold">{formatCurrency(results.totalYearly)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Cost ({formData.loanTerm} years):</span>
                      <span className="font-semibold">{formatCurrency(results.totalCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest:</span>
                      <span className="font-semibold">{formatCurrency(results.totalInterest)}</span>
                    </div>
                  </div>
                </div>

                {/* Amortization Schedule */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Amortization Schedule</h2>
                    <button
                      onClick={() => setShowAmortization(!showAmortization)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {showAmortization ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>
                  
                  {showAmortization && (
                    <div className="max-h-96 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-2 py-2 text-left text-gray-700">Month</th>
                            <th className="px-2 py-2 text-right text-gray-700">Payment</th>
                            <th className="px-2 py-2 text-right text-gray-700">Principal</th>
                            <th className="px-2 py-2 text-right text-gray-700">Interest</th>
                            <th className="px-2 py-2 text-right text-gray-700">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.amortizationSchedule.slice(0, 60).map((row) => (
                            <tr key={row.month} className="border-b border-gray-100">
                              <td className="px-2 py-2 text-gray-600">{row.month}</td>
                              <td className="px-2 py-2 text-right font-medium">{formatCurrency(row.payment)}</td>
                              <td className="px-2 py-2 text-right text-green-600">{formatCurrency(row.principal)}</td>
                              <td className="px-2 py-2 text-right text-red-600">{formatCurrency(row.interest)}</td>
                              <td className="px-2 py-2 text-right text-gray-600">{formatCurrency(row.remainingBalance)}</td>
                            </tr>
                          ))}
                          {results.amortizationSchedule.length > 60 && (
                            <tr className="bg-gray-50">
                              <td colSpan={5} className="px-2 py-2 text-center text-gray-500 text-sm">
                                ... and {results.amortizationSchedule.length - 60} more months
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">What This Calculator Shows:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Monthly mortgage payment breakdown</li>
                <li>Total cost over the loan term</li>
                <li>Interest vs. principal payments</li>
                <li>Amortization schedule</li>
                <li>PMI calculations (if applicable)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Important Notes:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Rates and terms may vary by lender</li>
                <li>Property taxes vary by location</li>
                <li>Insurance costs depend on coverage</li>
                <li>PMI typically required for &lt;20% down</li>
                <li>Consult a mortgage professional for exact rates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgagePaymentCalculator;

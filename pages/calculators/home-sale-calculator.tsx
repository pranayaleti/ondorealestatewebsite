"use client"

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useCalculatorAI } from '@/hooks/useCalculatorAI';
import { AIInsightsPanel } from '@/components/calculators/AIInsightsPanel';
import dynamic from 'next/dynamic';
import { CalculatorPDFDocument } from '@/components/calculators/CalculatorPDFDocument';
import type { AIAnalysis } from '@/lib/api/calculators';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((m) => m.PDFDownloadLink),
  { ssr: false }
);

interface HomeSaleData {
  homeValue: number;
  mortgageBalance: number;
  realtorCommission: number;
  closingCosts: number;
  repairs: number;
  movingCosts: number;
  capitalGainsTax: number;
  originalPurchasePrice?: number;
  originalImprovements?: number;
}

interface HomeSaleResults {
  netProceeds: number;
  totalCosts: number;
  equity: number;
  profit: number;
  basisUsed: number;
}

const HomeSaleCalculator: React.FC = () => {
  const [formData, setFormData] = useState<HomeSaleData>({
    homeValue: 400000,
    mortgageBalance: 250000,
    realtorCommission: 6,
    closingCosts: 8000,
    repairs: 5000,
    movingCosts: 2000,
    capitalGainsTax: 0,
    originalPurchasePrice: 320000,
    originalImprovements: 0
  });

  const [results, setResults] = useState<HomeSaleResults | null>(null);
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const calculateHomeSale = useCallback(() => {
    const { homeValue, mortgageBalance, realtorCommission, closingCosts, repairs, movingCosts, capitalGainsTax } = formData;
    
    // Calculate realtor commission
    const realtorFee = (homeValue * realtorCommission) / 100;
    
    // Calculate total costs
    const totalCosts = realtorFee + closingCosts + repairs + movingCosts + capitalGainsTax;
    
    // Calculate equity
    const equity = homeValue - mortgageBalance;
    
    // Calculate net proceeds
    const netProceeds = homeValue - totalCosts - mortgageBalance;
    
    // Calculate profit using user-provided cost basis (purchase price + improvements)
    const costBasis = (formData.originalPurchasePrice || 0) + (formData.originalImprovements || 0);
    const profit = homeValue - costBasis - totalCosts;
    
    setResults({
      netProceeds,
      totalCosts,
      equity,
      profit,
      basisUsed: costBasis
    });
  }, [formData]);

  const { data: aiAnalysis, loading: aiLoading, error: aiError, analyze } = useCalculatorAI({
    calculatorType: 'home-sale',
    inputs: formData as unknown as Record<string, unknown>,
    results: (results ?? {}) as unknown as Record<string, unknown>,
    location: location || undefined,
    propertyType: propertyType || undefined,
  });

  useEffect(() => {
    calculateHomeSale();
  }, [calculateHomeSale]);

  const handleInputChange = (field: keyof HomeSaleData, value: number) => {
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-background shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/calculators" className="text-primary hover:text-primary">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Home Sale Calculator</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-card rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Enter Your Information</h2>
            
            <div className="space-y-6">
              {/* Home Value */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Estimated Home Sale Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-foreground/70">$</span>
                  <input
                    type="number"
                    value={formData.homeValue || ''}
                    onChange={(e) => handleInputChange('homeValue', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="400,000"
                  />
                </div>
              </div>

              {/* Mortgage Balance */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Remaining Mortgage Balance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-foreground/70">$</span>
                  <input
                    type="number"
                    value={formData.mortgageBalance || ''}
                    onChange={(e) => handleInputChange('mortgageBalance', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="250,000"
                  />
                </div>
              </div>

              {/* Realtor Commission */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Realtor Commission (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.realtorCommission || ''}
                  onChange={(e) => handleInputChange('realtorCommission', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="6.0"
                />
              </div>

              {/* Closing Costs */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Closing Costs
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-foreground/70">$</span>
                  <input
                    type="number"
                    value={formData.closingCosts || ''}
                    onChange={(e) => handleInputChange('closingCosts', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="8,000"
                  />
                </div>
              </div>

              {/* Repairs */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Repairs & Improvements
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-foreground/70">$</span>
                  <input
                    type="number"
                    value={formData.repairs || ''}
                    onChange={(e) => handleInputChange('repairs', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="5,000"
                  />
                </div>
              </div>

              {/* Moving Costs */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Moving Costs
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-foreground/70">$</span>
                  <input
                    type="number"
                    value={formData.movingCosts || ''}
                    onChange={(e) => handleInputChange('movingCosts', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="2,000"
                  />
                </div>
              </div>

              {/* Capital Gains Tax */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Capital Gains Tax (if applicable)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-foreground/70">$</span>
                  <input
                    type="number"
                    value={formData.capitalGainsTax || ''}
                    onChange={(e) => handleInputChange('capitalGainsTax', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="0"
                  />
                </div>
                <p className="text-sm text-foreground/70 mt-1">
                  Usually exempt for primary residence if lived in 2+ years
                </p>
              </div>

              {/* Original Purchase Price */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Original Purchase Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-foreground/70">$</span>
                  <input
                    type="number"
                    value={formData.originalPurchasePrice || ''}
                    onChange={(e) => handleInputChange('originalPurchasePrice', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="320,000"
                  />
                </div>
              </div>

              {/* Capital Improvements */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Capital Improvements (lifetime)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-foreground/70">$</span>
                  <input
                    type="number"
                    value={formData.originalImprovements || ''}
                    onChange={(e) => handleInputChange('originalImprovements', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="0"
                  />
                </div>
                <p className="text-sm text-foreground/70 mt-1">
                  Major improvements increasing basis (e.g., additions, new roof)
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {results && (
              <>
                {/* Net Proceeds */}
                <div className="bg-card rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Sale Results</h2>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-primary mb-1">Net Proceeds</p>
                        <p className="text-3xl font-bold text-green-700">{formatCurrency(results.netProceeds)}</p>
                        <p className="text-sm text-primary mt-1">
                          Cash you'll receive after sale
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-primary mb-1">Total Equity</p>
                        <p className="text-2xl font-bold text-foreground">{formatCurrency(results.equity)}</p>
                        <p className="text-sm text-primary mt-1">
                          Home value minus mortgage
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="bg-card rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Cost Breakdown</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Realtor Commission:</span>
                      <span className="font-semibold">{formatCurrency((formData.homeValue * formData.realtorCommission) / 100)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Closing Costs:</span>
                      <span className="font-semibold">{formatCurrency(formData.closingCosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Repairs & Improvements:</span>
                      <span className="font-semibold">{formatCurrency(formData.repairs)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Moving Costs:</span>
                      <span className="font-semibold">{formatCurrency(formData.movingCosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Capital Gains Tax:</span>
                      <span className="font-semibold">{formatCurrency(formData.capitalGainsTax)}</span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Costs:</span>
                      <span className="text-destructive">{formatCurrency(results.totalCosts)}</span>
                    </div>
                  </div>
                </div>

                {/* Profit Analysis */}
                <div className="bg-card rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Profit Analysis</h2>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-yellow-600 mb-1">Estimated Profit</p>
                        <p className="text-2xl font-bold text-yellow-700">{formatCurrency(results.profit)}</p>
                        <p className="text-sm text-yellow-600 mt-1">
                          After all costs and cost basis
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-foreground/70">
                      <p>• Cost basis used: {formatCurrency(results.basisUsed)}</p>
                      <p>• This is a rough estimate based on available information</p>
                      <p>• Actual costs may vary significantly</p>
                      <p>• Consider consulting a real estate professional</p>
                      <p>• Factor in market conditions and timing</p>
                    </div>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="bg-card rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">AI Analysis</h2>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Location, e.g. Austin, TX"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:ring-1 focus:ring-accent focus:border-accent outline-none"
                    />
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:ring-1 focus:ring-accent focus:border-accent outline-none"
                    >
                      <option value="">Property type (optional)</option>
                      <option>Single Family</option>
                      <option>Multi-Family</option>
                      <option>Condo</option>
                      <option>Commercial</option>
                    </select>
                    <button
                      onClick={() => { calculateHomeSale(); analyze(); }}
                      className="w-full py-2 text-sm font-semibold rounded-md bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
                    >
                      Get AI Analysis
                    </button>
                    <AIInsightsPanel analysis={aiAnalysis} loading={aiLoading} error={aiError} />
                    <PDFDownloadLink
                      document={
                        <CalculatorPDFDocument
                          calculatorType="home-sale"
                          title="Home Sale Net Proceeds Report"
                          inputs={{
                            'Home Value': `$${formData.homeValue.toLocaleString()}`,
                            'Mortgage Balance': `$${formData.mortgageBalance.toLocaleString()}`,
                            'Realtor Commission': `${formData.realtorCommission}%`,
                            'Closing Costs': `$${formData.closingCosts.toLocaleString()}`,
                          }}
                          results={{
                            'Net Proceeds': `$${results!.netProceeds.toFixed(0)}`,
                            'Total Equity': `$${results!.equity.toFixed(0)}`,
                            'Total Costs': `$${results!.totalCosts.toFixed(0)}`,
                            'Estimated Profit': `$${results!.profit.toFixed(0)}`,
                          }}
                          analysis={aiAnalysis ?? undefined}
                          location={location || undefined}
                          generatedAt={new Date()}
                        />
                      }
                      fileName="ondo-home-sale-report.pdf"
                    >
                      {({ loading: pdfLoading }) => (
                        <button
                          disabled={pdfLoading}
                          className="w-full py-2 text-sm font-medium rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
                        >
                          {pdfLoading ? 'Generating PDF…' : '⬇ Download PDF Report'}
                        </button>
                      )}
                    </PDFDownloadLink>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-card rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">About Home Sales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-foreground/70">
            <div>
              <h3 className="font-medium text-foreground mb-2">Common Sale Costs:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Realtor commission (typically 5-6%)</li>
                <li>Closing costs and transfer taxes</li>
                <li>Repairs and staging costs</li>
                <li>Moving and storage expenses</li>
                <li>Capital gains tax (if applicable)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Tips for Maximizing Proceeds:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Improve curb appeal and staging</li>
                <li>Make necessary repairs before listing</li>
                <li>Price competitively for your market</li>
                <li>Consider timing and market conditions</li>
                <li>Negotiate commission rates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSaleCalculator;

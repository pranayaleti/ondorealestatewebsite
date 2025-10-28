"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Calculator as CalcIcon,
  Home as HomeIcon,
  Landmark,
  TrendingUp as TrendingUpIcon,
  Tag,
  ShoppingCart as ShoppingCartIcon,
  ArrowLeftRight,
  PiggyBank,
  ArrowLeftRight as CompareIcon,
  CheckCircle2,
  Clock,
  BarChart3,
  ChevronRight
} from 'lucide-react'

interface CalculatorTile {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  category: string;
  color: string;
}

const CalculatorsPage: React.FC = () => {
  const calculators: CalculatorTile[] = [
    {
      id: 'mortgage-payment',
      name: 'Mortgage Payment Calculator',
      description: 'Calculate your monthly mortgage payment including principal, interest, taxes, and insurance.',
      path: '/calculators/mortgage-payment',
      icon: <CalcIcon className="h-8 w-8" />,
      category: 'Mortgage',
      color: 'from-primary to-primary'
    },
    {
      id: 'affordability',
      name: 'Affordability Calculator',
      description: 'Determine how much house you can afford based on your income and expenses.',
      path: '/calculators/affordability',
      icon: <HomeIcon className="h-8 w-8" />,
      category: 'Mortgage',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'income',
      name: 'Income Calculator',
      description: 'Calculate required income to qualify for a specific mortgage amount.',
      path: '/calculators/income',
      icon: <TrendingUpIcon className="h-8 w-8" />,
      category: 'Mortgage',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'closing-cost',
      name: 'Closing Cost Calculator',
      description: 'Estimate all closing costs when purchasing a home.',
      path: '/calculators/closing-cost',
      icon: <Landmark className="h-8 w-8" />,
      category: 'Purchase',
      color: 'from-primary to-primary'
    },
    {
      id: 'refinance',
      name: 'Refinance Calculator',
      description: 'Analyze the benefits of refinancing your existing mortgage.',
      path: '/calculators/refinance',
      icon: <ArrowLeftRight className="h-8 w-8" />,
      category: 'Mortgage',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'home-sale',
      name: 'Home Sale Calculator',
      description: 'Calculate net proceeds from selling your home after all costs.',
      path: '/calculators/home-sale',
      icon: <Tag className="h-8 w-8" />,
      category: 'Sale',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'buying-power',
      name: 'Buying Power Calculator',
      description: 'Determine your maximum home purchase price based on available funds.',
      path: '/calculators/buying-power',
      icon: <ShoppingCartIcon className="h-8 w-8" />,
      category: 'Purchase',
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'temporary-buydown',
      name: 'Temporary Buydown Calculator',
      description: 'Calculate temporary interest rate buydown benefits and costs.',
      path: '/calculators/temporary-buydown',
      icon: <PiggyBank className="h-8 w-8" />,
      category: 'Mortgage',
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'rent-vs-own',
      name: 'Rent vs Own Calculator',
      description: 'Compare the financial implications of renting versus buying a home.',
      path: '/calculators/rent-vs-own',
      icon: <CompareIcon className="h-8 w-8" />,
      category: 'Analysis',
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 'retirement',
      name: 'Retirement Calculator',
      description: 'Plan your retirement savings and investment strategy for real estate.',
      path: '/calculators/retirement',
      icon: <Landmark className="h-8 w-8" />,
      category: 'Planning', 
      color: 'from-emerald-500 to-emerald-600'
    }
  ]

  const categories = ['All', 'Mortgage', 'Purchase', 'Sale', 'Analysis', 'Planning']

  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredCalculators = selectedCategory === 'All' 
    ? calculators 
    : calculators.filter(calc => calc.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-[#111111] text-white antialiased" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
      {/* Hero Header */}
      <div className="relative border-b border-white/10 bg-gradient-to-r from-black to-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#ff6b00] to-[#ff9500] bg-clip-text text-transparent tracking-tight mx-auto">
              Real Estate Calculators
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Professional-grade tools to help you make informed real estate decisions
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Category Filter Pills */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer border backdrop-blur-sm active:scale-95 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#ff6b00] to-[#ff9500] text-white border-[#ff6b00] shadow-lg shadow-orange-500/30'
                    : 'bg-white/5 text-white border-white/10 hover:border-[#ff6b00]/50 hover:bg-white/[0.08]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCalculators.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-[#b0b0b0]">No calculators found in this category.</p>
            </div>
          ) : (
            filteredCalculators.map((calculator, index) => (
            <div
              key={calculator.id}
              className="animate-fade-in-up animate-fill-both"
              style={{ 
                animationDelay: `${Math.min(index * 0.1, 1)}s`,
              } as React.CSSProperties}
            >
              <Link
                href={calculator.path}
                className="block group h-full"
              >
                <div className="relative h-full rounded-2xl backdrop-blur-lg border border-white/10 bg-white/5 p-6 overflow-hidden transition-all duration-500 hover:border-[#ff6b00]/50 hover:bg-white/[0.07] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,107,0,0.15)]">
                  {/* Animated Glow Border on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff6b00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff9500] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-semibold bg-[#ff6b00]/20 text-[#ff9500] px-3 py-1 rounded-full border border-[#ff6b00]/30 backdrop-blur-sm">
                      {calculator.category}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="mb-6 relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#ff6b00] to-[#ff9500] flex items-center justify-center text-white shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-all duration-300">
                      {calculator.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">
                    {calculator.name}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-6">
                    {calculator.description}
                  </p>

                  {/* Use Calculator Button */}
                  <div className="flex items-center gap-2 text-[#ff6b00] group-hover:text-[#ff9500] font-semibold text-sm transition-colors">
                    <span>Use Calculator</span>
                    <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>
          )))}
        </div>

        {/* Why Use Our Calculators Section */}
        <div className="mt-24 mb-12 animate-fade-in-up">
          <div className="relative backdrop-blur-lg border border-white/10 bg-white/5 rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#ff6b00] to-[#ff9500] bg-clip-text text-transparent">
                Why Use Our Calculators?
              </h2>
              <p className="text-gray-300 mb-12 max-w-2xl">
                Professional tools designed for accuracy and speed
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ff6b00]/20 to-[#ff9500]/20 flex items-center justify-center backdrop-blur-sm border border-[#ff6b00]/30 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle2 className="h-10 w-10 text-[#ff9500]" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b00] to-[#ff9500] rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Accurate Calculations</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">Professional-grade calculations using current market rates and formulas</p>
                </div>

                <div className="text-center group">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ff6b00]/20 to-[#ff9500]/20 flex items-center justify-center backdrop-blur-sm border border-[#ff6b00]/30 group-hover:scale-110 transition-transform duration-300">
                      <Clock className="h-10 w-10 text-[#ff9500]" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b00] to-[#ff9500] rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Save Time</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">Quick calculations that would take hours to do manually</p>
                </div>

                <div className="text-center group">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ff6b00]/20 to-[#ff9500]/20 flex items-center justify-center backdrop-blur-sm border border-[#ff6b00]/30 group-hover:scale-110 transition-transform duration-300">
                      <BarChart3 className="h-10 w-10 text-[#ff9500]" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b00] to-[#ff9500] rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Make Better Decisions</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">Compare scenarios and understand the financial impact of your choices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center">
          <p className="text-sm text-gray-400 flex items-center justify-center gap-1">
            <span className="text-yellow-400">*</span>
            <span>AI-generated content. Please verify all calculations with a qualified professional. We are not responsible for financial decisions made based on these calculators.</span>
          </p>
        </div>
      </div>

    </div>
  )
}

export default CalculatorsPage
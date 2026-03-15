import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CalculatorPDFDocument } from './CalculatorPDFDocument';
import type { AIAnalysis } from '@/lib/api/calculators';

interface Props {
  calculatorType: string;
  title: string;
  inputs: Record<string, string>;
  results: Record<string, string>;
  analysis?: AIAnalysis;
  location?: string;
  fileName: string;
}

export function PDFExportButton({ fileName, ...docProps }: Props) {
  return (
    <PDFDownloadLink
      document={<CalculatorPDFDocument {...docProps} generatedAt={new Date()} />}
      fileName={fileName}
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
  );
}

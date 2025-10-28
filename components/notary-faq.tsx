"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function NotaryFAQ() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      <AccordionItem value="item-1" className="bg-muted border border-border rounded-lg px-6">
        <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
          Can you notarize for non-ONDO clients?
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Yes, when schedule permits. Priority goes to ONDO clients first, but we're happy to serve the broader community when availability allows. We welcome all clients in need of professional notary services.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2" className="bg-card border border-primary/20 rounded-lg px-6">
        <AccordionTrigger className="text-lg font-semibold text-white hover:no-underline">
          Are your services valid for real estate loans and closings?
        </AccordionTrigger>
        <AccordionContent className="text-gray-300">
          Yes — I notarize for loan and closing documents, in compliance with Utah law and lender/title requirements. My real estate background ensures proper handling of complex real estate documents.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-3" className="bg-muted border border-border rounded-lg px-6">
        <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
          How can I verify your commission?
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          You can request my commission certificate or bond via the contact form or download link below. All notary credentials are publicly verifiable through Utah state records.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-4" className="bg-card border border-primary/20 rounded-lg px-6">
        <AccordionTrigger className="text-lg font-semibold text-white hover:no-underline">
          What types of documents can you notarize?
        </AccordionTrigger>
        <AccordionContent className="text-gray-300">
          I can notarize acknowledgements, jurats, oaths, affidavits, and witness signatures. This includes real estate documents, loan papers, legal affidavits, and general business documents.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-5" className="bg-muted border border-border rounded-lg px-6">
        <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
          Do you offer same-day service?
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Same-day service is available based on schedule and location. Contact us as early as possible to check availability for urgent notarization needs. We do our best to accommodate rush requests.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6" className="bg-card border border-primary/20 rounded-lg px-6">
        <AccordionTrigger className="text-lg font-semibold text-white hover:no-underline">
          What identification do I need to bring?
        </AccordionTrigger>
        <AccordionContent className="text-gray-300">
          You must bring a valid government-issued photo ID such as a driver's license, passport, or state ID card. The ID must be current and not expired. We cannot notarize documents without proper identification.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7" className="bg-muted border border-border rounded-lg px-6">
        <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
          How much do notary services cost?
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Standard notary fees follow Utah state regulations. Mobile services may include a travel fee of $25. Contact us for specific pricing based on your needs. We're transparent about all costs upfront.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-8" className="bg-card border border-primary/20 rounded-lg px-6">
        <AccordionTrigger className="text-lg font-semibold text-white hover:no-underline">
          Can you notarize documents that are already signed?
        </AccordionTrigger>
        <AccordionContent className="text-gray-300">
          No, documents must be signed in the presence of the notary. This is a legal requirement in Utah. Please do not sign documents before your appointment unless specifically instructed to do so.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-9" className="bg-muted border border-border rounded-lg px-6">
        <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
          What is Remote Online Notarization (RON)?
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          RON allows notarization to occur remotely through secure video technology. It's legally equivalent to in-person notarization when performed by a certified RON notary. This service is available when applicable and permitted by law.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-10" className="bg-card border border-primary/20 rounded-lg px-6">
        <AccordionTrigger className="text-lg font-semibold text-white hover:no-underline">
          How far in advance should I schedule?
        </AccordionTrigger>
        <AccordionContent className="text-gray-300">
          We recommend scheduling at least 24-48 hours in advance for in-office appointments. For mobile services, please allow more time for travel. Same-day service may be available but is not guaranteed.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-11" className="bg-muted border border-border rounded-lg px-6">
        <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
          Can you notarize documents in languages other than English?
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Yes, I can notarize documents in other languages. However, I must be able to communicate with you in English to verify your identity and ensure you understand what you're signing. The notarial certificate will be in English as required by Utah law.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-12" className="bg-card border border-primary/20 rounded-lg px-6">
        <AccordionTrigger className="text-lg font-semibold text-white hover:no-underline">
          What if I need witnesses for my document?
        </AccordionTrigger>
        <AccordionContent className="text-gray-300">
          We can help arrange witnesses if needed, or you can bring your own. Witnesses must also present valid ID and be present during the notarization. There may be additional fees for witness services.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-13" className="bg-muted border border-border rounded-lg px-6">
        <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
          Are your notarizations valid in other states?
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Utah notarizations are generally recognized in other states, but requirements vary. For documents to be used in other states, check with the receiving party or institution to ensure Utah notarizations are acceptable for your specific needs.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}


"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Phone, Home, CheckCircle } from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';
import { SITE_PHONE } from '@/lib/site';

interface ConsultationCTAProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'card' | 'minimal';
  className?: string;
}

const ConsultationCTA: React.FC<ConsultationCTAProps> = ({
  title = "Need Expert Real Estate Advice?",
  description = "View available times and book a free 30-minute consultation",
  variant = 'default',
  className = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (variant === 'minimal') {
    return (
      <>
        <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1"
            size="lg"
          >
            <Calendar className="h-5 w-5 mr-2" />
            View Available Times & Book Now
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.open(`tel:${SITE_PHONE}`, '_self')}
            size="lg"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call Now
          </Button>
        </div>
        <ConsultationModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </>
    );
  }

  if (variant === 'card') {
    return (
      <>
        <Card className={`border-primary/20 ${className}`}>
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary p-3 rounded-lg w-fit mb-4">
              <Home className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span>30-minute expert consultation</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span>Market analysis & pricing</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span>Property recommendations</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span>Next steps & timeline</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="flex-1"
                size="lg"
              >
                <Calendar className="h-5 w-5 mr-2" />
                View Available Times & Book Now
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open(`tel:${SITE_PHONE}`, '_self')}
                size="lg"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </Button>
            </div>
          </CardContent>
        </Card>
        <ConsultationModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </>
    );
  }

  return (
    <>
      <div className={`p-6 bg-primary/10 rounded-lg border border-primary/20 ${className}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-primary p-3 rounded-lg">
            <Calendar className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1"
            size="lg"
          >
            <Calendar className="h-5 w-5 mr-2" />
            View Available Times & Book Now
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.open(`tel:${SITE_PHONE}`, '_self')}
            size="lg"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call Now
          </Button>
        </div>
      </div>
      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default ConsultationCTA;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { clinicData } from '../data/clinicData';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  isHome?: boolean;
  children?: React.ReactNode;
}

export const SEO: React.FC<SEOProps> = ({
  title = clinicData.seo.defaultTitle,
  description = clinicData.seo.defaultDescription,
  path = '',
  isHome = false,
  children,
}) => {
  const pageUrl = `https://happy32indore.com${path}`;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': ['Dentist', 'MedicalClinic', 'HealthAndBeautyBusiness'],
    name: clinicData.brand.fullName,
    description: clinicData.seo.defaultDescription,
    medicalSpecialty: [
      'Dentistry',
      'CosmeticDentistry',
      'Endodontics',
      'Orthodontics',
      'Dermatology',
      'CosmeticProcedure'
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: clinicData.contact.address,
      addressLocality: clinicData.brand.city,
      addressRegion: clinicData.contact.state,
      postalCode: clinicData.contact.pincode,
      addressCountry: 'IN',
    },
    telephone: clinicData.contact.primaryPhone,
    openingHours: ['Mo-Sa 10:30-20:30', 'Su 10:30-14:00'],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: clinicData.contact.coordinates.lat,
      longitude: clinicData.contact.coordinates.lng,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: clinicData.brand.rating,
      reviewCount: clinicData.brand.reviewCount,
    },
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={clinicData.seo.keywords} />

      {/* Open Graph / WhatsApp Preview */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={clinicData.seo.ogImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={clinicData.seo.ogImage} />

      {/* Structured Data Schema */}
      {isHome && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
      
      {/* Additional dynamically passed elements (like FAQ Schema) */}
      {children}
    </Helmet>
  );
};

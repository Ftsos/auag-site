export interface Company {
  id: string;
  name: string;
  logo?: string | null; // Allow null for companies without accessible logos
}

export interface CompanyLogoProps {
  companies: Company[];
  isActive: boolean;
  index?: number; // Add index for staggered animation
}

export interface CompanyLogosSectionProps {
  // No props needed for the new simple animation approach
}

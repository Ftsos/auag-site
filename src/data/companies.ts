import { type Company } from '../types/companies';

/**
 * Companies where alumni in the AUAG network work.
 * Logos are PNG marks in /public (mostly white/light variants) — always
 * render them on a dark chip, never directly on the light canvas.
 */
export const companies: Company[] = [
  {
    id: 'apple',
    name: 'Apple',
    logo: '/256px-Apple_logo_white.svg.png',
    logoTheme: 'light',
    industry: 'Technology',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    logo: '/NVIDIA-logo-white-16x9.png',
    logoTheme: 'dark',
    industry: 'Technology',
  },
  {
    id: 'spacex',
    name: 'SpaceX',
    logo: '/SpaceX-Logo.png',
    logoTheme: 'dark',
    industry: 'Aerospace',
  },
  {
    id: 'jpmorgan-chase',
    name: 'JPMorgan Chase',
    logo: '/JPMorgan-Chase-Logo-SVG-desktop.png',
    logoTheme: 'dark',
    industry: 'Finance',
  },
  {
    id: 'tesla',
    name: 'Tesla',
    logo: '/256px-Tesla_Motors.svg.png',
    logoTheme: 'dark',
    industry: 'Technology',
  },
  {
    id: 'intel',
    name: 'Intel',
    logo: '/256px-Intel_logo_(2020,_light_blue).svg.png',
    logoTheme: 'light',
    industry: 'Technology',
  },
  {
    // TODO(Enzo): confirm industry
    id: 'tyton-holdings',
    name: 'Tyton Holdings',
    logo: '/TytonHoldings-Logo.png',
    logoTheme: 'dark',
    industry: 'Finance',
  },
  {
    id: 'blackrock',
    name: 'BlackRock',
    logo: '/BlackRock.png',
    logoTheme: 'light',
    industry: 'Finance',
  },
  {
    id: 'pwc',
    name: 'PwC',
    logo: '/PWC_logo.png',
    logoTheme: 'dark',
    industry: 'Professional Services',
  },
  {
    id: 'adventhealth',
    name: 'AdventHealth',
    logo: '/256px-AdventHealth_Logo.svg.png',
    logoTheme: 'dark',
    industry: 'Healthcare',
  },
  {
    id: 'scotiabank',
    name: 'Scotiabank',
    logo: '/Scotiabank_logo.svg.png',
    logoTheme: 'dark',
    industry: 'Finance',
  },
  {
    // TODO(Enzo): confirm industry
    id: 'ariya-capital',
    name: 'Ariya Capital',
    logo: '/Ariya_Capital.png',
    logoTheme: 'dark',
    industry: 'Finance',
  },
  {
    id: 'oaknorth',
    name: 'OakNorth',
    logo: '/OakNorth_Bank_logo_(2023).svg.png',
    logoTheme: 'dark',
    industry: 'Finance',
  },
  {
    id: 'lsw-architects',
    name: 'LSW Architects',
    logo: '/LSW_Logo.png',
    logoTheme: 'dark',
    industry: 'Architecture & Design',
  },
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    logo: '/256px-Coca-Cola_logo.svg.png',
    logoTheme: 'dark',
    industry: 'Consumer',
  },
  {
    id: 'astrazeneca',
    name: 'AstraZeneca',
    logo: '/256px-Astrazeneca_text_logo.svg.png',
    logoTheme: 'dark',
    industry: 'Healthcare',
  },
  {
    id: 'flitestar',
    name: 'Flitestar',
    logo: '/FliteStar.png',
    logoTheme: 'dark',
    industry: 'Aviation',
  },
  {
    // TODO(Enzo): confirm industry
    id: '015-capital-partners',
    name: '015 Capital Partners',
    logo: '/015CP.png',
    logoTheme: 'dark',
    industry: 'Finance',
  },
];

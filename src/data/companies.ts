import { type Company } from '../types/companies';

export const companies: Company[] = [
  { 
    id: 'apple', 
    name: 'Apple', 
    logo: '/256px-Apple_logo_white.svg.png' 
  },
  { 
    id: 'nvidia', 
    name: 'NVIDIA', 
    logo: '/NVIDIA-logo-white-16x9.png' 
  },
  { 
    id: 'spacex', 
    name: 'SpaceX', 
    logo: '/SpaceX-Logo.png' 
  },
  { 
    id: 'jpmorgan-chase', 
    name: 'JPMorgan Chase', 
    logo: '/JPMorgan-Chase-Logo-SVG-desktop.jpg' 
  },
  { 
    id: 'tesla', 
    name: 'Tesla', 
    logo: '/256px-Tesla_Motors.svg.png' 
  },
  { 
    id: 'intel', 
    name: 'Intel', 
    logo: '/256px-Intel_logo_(2020,_light_blue).svg.png' 
  },
  { 
    id: 'tyton-holdings', 
    name: 'Tyton Holdings', 
    logo: '/TytonHoldings-Logo.png' 
  },
  { 
    id: 'blackrock', 
    name: 'BlackRock', 
    logo: 'https://logo.clearbit.com/blackrock.com' 
  },
  { 
    id: 'pwc', 
    name: 'PwC', 
    logo: '/PWC_logo.png' 
  },
  { 
    id: 'adventhealth', 
    name: 'AdventHealth', 
    logo: '/256px-AdventHealth_Logo.svg.png' 
  },
  { 
    id: 'scotiabank', 
    name: 'Scotiabank', 
    logo: '/Scotiabank_logo.svg.png' 
  },
  { 
    id: 'ariya-capital', 
    name: 'Ariya Capital', 
    logo: '/Ariya_Capital.png' 
  },
  { 
    id: 'oaknorth', 
    name: 'OakNorth', 
    logo: '/OakNorth_Bank_logo_(2023).svg.png' 
  },
  { 
    id: 'lsw-architects', 
    name: 'LSW Architects', 
    logo: '/LSW_Logo.jpg' 
  },
  { 
    id: 'coca-cola', 
    name: 'Coca-Cola', 
    logo: '/256px-Coca-Cola_logo.svg.png' 
  },
  { 
    id: 'astrazeneca', 
    name: 'AstraZeneca', 
    logo: '/256px-Astrazeneca_text_logo.svg.png' 
  },
  { 
    id: 'flitestar', 
    name: 'Flitestar', 
    logo: '/FliteStar.png' 
  },
  { 
    id: '015-capital-partners', 
    name: '015 Capital Partners', 
    logo: '/015CP.png' 
  },
  { 
    id: 'adventhealth', 
    name: 'AdventHealth', 
    logo: '/256px-AdventHealth_Logo.svg.png' 
  },
  { 
    id: 'intel', 
    name: 'Intel', 
    logo: '/256px-Intel_logo_(2020,_light_blue).svg.png' 
  },
];

// Create different starting sequences for each logo
export const getCompanySequence = (startIndex: number): Company[] => {
  const rotated = [...companies.slice(startIndex), ...companies.slice(0, startIndex)];
  return rotated;
};

import { type Company } from '../types/companies';

export const companies: Company[] = [
  { 
    id: 'nvidia', 
    name: 'NVIDIA', 
    logo: '/NVIDIA-logo-white-16x9.png' 
  },
  { 
    id: 'apple', 
    name: 'Apple', 
    logo: '/64px-Apple_logo_black.svg.png' 
  },
  { 
    id: 'spacex', 
    name: 'SpaceX', 
    logo: '/spacex-logo-svgrepo-com.svg' 
  },
  { 
    id: 'tesla', 
    name: 'Tesla', 
    logo: '/64px-Tesla_Motors.svg.png' 
  },
  { 
    id: 'tyton-holdings', 
    name: 'Tyton Holdings', 
    logo: '/TytonHoldings-Logo.png' 
  },
  { 
    id: 'intel', 
    name: 'Intel', 
    logo: '/256px-Intel_logo_(2020,_light_blue).svg.png' 
  },
  { 
    id: 'pwc', 
    name: 'PwC', 
    logo: '/128px-PricewaterhouseCoopers_Logo.svg.png' 
  },
  { 
    id: 'blackrock', 
    name: 'BlackRock', 
    logo: 'https://logo.clearbit.com/blackrock.com' 
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
    id: 'oaknorth', 
    name: 'OakNorth', 
    logo: '/OakNorth_Bank_logo_(2023).svg.png' 
  },
  { 
    id: 'jpmorgan-chase', 
    name: 'JPMorgan Chase', 
    logo: '/JPMorgan-Chase-Logo-SVG-desktop.jpg' 
  },
  { 
    id: 'ariya-capital', 
    name: 'Ariya Capital', 
    logo: '/Ariya Cap.jpg' 
  },
  { 
    id: 'lsw-architects', 
    name: 'LSW Architects', 
    logo: '/LSW_Logo.jpg' 
  },
  { 
    id: '015-capital-partners', 
    name: '015 Capital Partners', 
    logo: '/015.jpeg' 
  },
  { 
    id: 'astrazeneca', 
    name: 'AstraZeneca', 
    logo: '/256px-Astrazeneca_text_logo.svg.png' 
  },
  { 
    id: 'flitestar', 
    name: 'Flitestar', 
    logo: 'https://logo.clearbit.com/flitestar.com' 
  },
  { 
    id: 'coca-cola', 
    name: 'Coca-Cola', 
    logo: '/256px-Coca-Cola_logo.svg.png' 
  },
];

// Create different starting sequences for each logo
export const getCompanySequence = (startIndex: number): Company[] => {
  const rotated = [...companies.slice(startIndex), ...companies.slice(0, startIndex)];
  return rotated;
};

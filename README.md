# AUAG Site

A modern, responsive website built with React, TypeScript, and Vite, featuring animated backgrounds and dynamic company logo displays.

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── FlowingLines.tsx     # Animated background lines
│   ├── MainText.tsx         # "Join the AUAG" text section
│   ├── CompanyLogo.tsx      # Individual company logo with animation
│   └── UniversitiesSection.tsx # Companies section
├── hooks/               # Custom React hooks
│   └── useCompanyAnimation.ts # Company animation logic
├── types/               # TypeScript type definitions
│   └── companies.ts         # Company and component interfaces
├── data/                # Data files
│   └── companies.ts         # Company data and sequences
├── styles/              # Component-specific CSS files
│   ├── FlowingLines.css     # Background animation styles
│   ├── MainText.css         # Main text section styles
│   ├── CompanyLogo.css      # Logo component styles
│   └── UniversitiesSection.css # Companies section styles
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## 🚀 Features

- **Animated Background**: Flowing, wavy lines with smooth animations
- **Responsive Design**: Adapts to different screen sizes
- **Dynamic Company Logos**: Animated company names that cycle through lists
- **Modern UI**: Clean, professional design with black, red, and white theme
- **TypeScript**: Full type safety and better development experience
- **Component-Based**: Modular, reusable React components

## 🛠️ Technology Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with animations and responsive design

## 📱 Responsive Breakpoints

- **Large screens (1200px+)**: Shows all 5 company logos
- **Medium screens (900px-1200px)**: Shows 4 company logos
- **Small screens (600px-900px)**: Shows 3 company logos
- **Mobile screens (400px-600px)**: Shows 2 company logos
- **Very small screens (<400px)**: Shows 1 company logo

## 🎨 Design Features

- **Theme Colors**: Black (#000000), Red (#ff0000), White (#ffffff)
- **Typography**: Arial font family with proper hierarchy
- **Animations**: Smooth zoom effects and flowing background lines
- **Glow Effects**: Subtle shadows and luminous text effects

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🔧 Development Guidelines

- **Component Structure**: Each component has its own file and CSS
- **Type Safety**: All props and data are properly typed
- **Custom Hooks**: Animation logic is separated into reusable hooks
- **Data Management**: Company data is centralized and easily maintainable
- **Responsive Design**: Mobile-first approach with proper breakpoints

## 📁 File Organization

- **Components**: Reusable UI components with clear responsibilities
- **Hooks**: Custom React hooks for business logic
- **Types**: TypeScript interfaces and type definitions
- **Data**: Static data and utility functions
- **Styles**: Component-specific CSS files for better maintainability

## 🎯 Future Enhancements

- Add more interactive elements
- Implement company logo images
- Add contact forms or additional sections
- Enhance animations with Framer Motion
- Add dark/light theme toggle
- Implement internationalization (i18n)

export type Industry =
  | 'Technology'
  | 'Finance'
  | 'Healthcare'
  | 'Aerospace'
  | 'Professional Services'
  | 'Consumer'
  | 'Architecture & Design'
  | 'Aviation';

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: Industry;
  /**
   * How the PNG mark reads on the dark logo chips:
   * 'light' — white/light artwork, rendered with a light grayscale/brightness
   *   normalization so the wall stays monochrome;
   * 'dark' — dark/colored artwork, rendered grayscale-inverted so it stays visible.
   */
  logoTheme: 'light' | 'dark';
}

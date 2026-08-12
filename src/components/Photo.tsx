import type { SitePhoto } from '../data/photos';

type PhotoProps = {
  photo: SitePhoto;
  /** The `sizes` attribute — required so srcset actually saves bytes. */
  sizes: string;
  /** Above-the-fold images: eager + high fetch priority. */
  priority?: boolean;
  className?: string;
};

const srcSet = (photo: SitePhoto, ext: 'webp' | 'jpg') =>
  photo.widths.map((w) => `${photo.base}-${w}.${ext} ${w}w`).join(', ');

/** Responsive <picture> for pipeline assets: webp first, jpg fallback. */
const Photo: React.FC<PhotoProps> = ({ photo, sizes, priority, className }) => (
  <picture>
    <source type="image/webp" srcSet={srcSet(photo, 'webp')} sizes={sizes} />
    <img
      className={className}
      src={`${photo.base}-${photo.widths[photo.widths.length - 1]}.jpg`}
      srcSet={srcSet(photo, 'jpg')}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? undefined : 'async'}
      style={photo.focus ? { objectPosition: photo.focus } : undefined}
    />
  </picture>
);

export default Photo;

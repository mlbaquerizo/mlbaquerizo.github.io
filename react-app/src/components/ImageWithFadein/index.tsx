import { useState } from 'react';
import { useScrollPosition, useWindowDimensions } from '../../hooks';
import styles from './ImageWithFadein.module.css';

/**
 * ImageWithFadeinProps
 * centerOffset: % off center (0) with left offset negative,
 *   right offset positive
 * scrollTo: position in vh of image before coming into view
 * imageTop: fixed position in vh of image when in view
 */

interface ImageWithFadeinProps {
  src: string;
  width?: number;
  height?: number;
  scrollTo: number;
  imageTop: number;
  centerOffset?: number;
}

const ImageWithFadein = ({
  src,
  height,
  width,
  scrollTo,
  imageTop,
  centerOffset = 0,
}: ImageWithFadeinProps) => {
  const [imageHeight, setImageHeight] = useState<number>();
  const scrollPosition = useScrollPosition();
  const { height: viewportHeight } = useWindowDimensions();
  const getImageHeight = (e: any) => {
    setImageHeight(e.target.offsetHeight);
  }
  const fixedBreakpoint = (viewportHeight * (scrollTo / 100)) - (viewportHeight * (imageTop / 100)); 
  const isImageInView = scrollPosition >= fixedBreakpoint;
  const inlineImageStyles = isImageInView ? {
    top: `calc(${imageTop}vh - ${imageHeight}px)`,
  } : {
    top: `calc(${scrollTo}vh - ${imageHeight}px)`,
  };

  return (
    <div className={styles.imageContainer}>
      <img
        className={
          !isImageInView ?
            styles.image
            : `${styles.image} ${styles.imageFixed}`
        }
        src={src}
        alt=""
        style={{
          ...inlineImageStyles,
          transform: `translate(${-50 + centerOffset}%, 0)`,
          height: height?.toString(),
          width: width?.toString(),
        }}
        onLoad={getImageHeight}
      />
      <div className={isImageInView ? `${styles.overlay} ${styles.fadeout}` : styles.overlay}></div>
    </div>
  )
}

export default ImageWithFadein;
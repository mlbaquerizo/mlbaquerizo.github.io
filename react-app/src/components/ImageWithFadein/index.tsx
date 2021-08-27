import { useEffect, useState } from 'react';
import { usePrevious, useScrollPosition, useWindowDimensions } from '../../hooks';
import styles from './ImageWithFadein.module.css';

/**
 * ImageWithFadeinProps
 * centerOffset: % off center (0) with left offset negative,
 *   right offset positive
 */

interface ImageWithFadeinProps {
  src: string;
  width?: number;
  height?: number;
  // scrollTo: number;
  centerOffset?: number;
}

const ImageWithFadein = ({
  src,
  height,
  width,
  centerOffset = 0,
}: ImageWithFadeinProps) => {
  const [imageHeight, setImageHeight] = useState<number>();
  const [inlineImageStyles, setInlineImageStyles] = useState({});
  const [isImageInView, setIsImageInView] = useState<boolean>();
  
  const scrollPosition = useScrollPosition();
  const { height: viewportHeight } = useWindowDimensions();

  const getImageHeight = (e: any) => {
    setImageHeight(e.target.offsetHeight);
  }

  useEffect(() => {
    setIsImageInView(scrollPosition >= viewportHeight * 1.75)
  }, [scrollPosition, viewportHeight]);

  const wasImageInView = usePrevious(isImageInView);
  useEffect(() => {
    if(wasImageInView !== isImageInView) {
      setInlineImageStyles(isImageInView ? {
        top: `calc(75vh - ${imageHeight}px)`
      } : {
        top: `calc(250vh - ${imageHeight}px)`,
      });
    }
  }, [wasImageInView, isImageInView, imageHeight]);

  console.log("IMAGE HEIGHT:::", inlineImageStyles);
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
          color: 'red',
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
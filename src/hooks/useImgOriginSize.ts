import { useEffect } from 'react';
import { useState } from 'react';

interface ImgSize {
  width: number;
  height: number;
}

export default function useImgOriginSize(src: string): ImgSize | null {
  const [imgSize, setImgSize] = useState<null | {
    width: number;
    height: number;
  }>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImgSize({ width: img.width, height: img.height });
    };
    img.src = src;
  }, [src]);

  return imgSize;
}

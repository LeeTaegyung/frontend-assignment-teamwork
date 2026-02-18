import { Link } from 'react-router-dom';

import useImgOriginSize from '@/hooks/useImgOriginSize';
import getImagePath from '@/utils/getImagePath';
import getNormalizedData from '@/utils/getNormalizedData';
import verticesToPathD from '@/utils/verticesToPathD';

export default function MainPage() {
  const { drawingMap } = getNormalizedData();

  const overallImgSize = useImgOriginSize(getImagePath(drawingMap['00'].image));

  const drawings = Object.keys(drawingMap)
    .sort((a: string, b: string) => {
      return Number(b) - Number(a);
    })
    .map((key: string) => drawingMap[key]);

  return (
    <>
      {!(overallImgSize === null) && (
        <svg
          className='h-full w-full'
          viewBox={`0 0 ${overallImgSize.width} ${overallImgSize.height}`}
        >
          <image
            href={`/public/images/drawings/${drawingMap['00'].image}`}
            className='block max-h-full max-w-none'
          />

          {drawings.map((drawing) => {
            if (drawing.id === '00') return null;

            return (
              <g key={drawing.id}>
                <Link to={`/drawing/${drawing.id}`}>
                  <path
                    d={verticesToPathD(drawing.position?.vertices)}
                    stroke='red'
                    strokeWidth='2'
                    fill='transparent'
                    className='cursor-pointer hover:fill-red-500/50'
                  />
                </Link>
              </g>
            );
          })}
        </svg>
      )}
    </>
  );
}

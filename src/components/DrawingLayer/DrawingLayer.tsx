import type { SelectedDisciplineState } from '@/pages/DrawingPage/DrawingPage';
import getImagePath from '@/utils/getImagePath';

interface Props {
  drawingImage: string;
  baseImageSize: { width: number; height: number };
  selectDiscipline: SelectedDisciplineState;
  opacity: number;
}

export default function DrawingLayer({
  drawingImage,
  baseImageSize,
  selectDiscipline,
  opacity,
}: Props) {
  const { revision, regionId, imageTransform } = selectDiscipline;

  const regionTransform =
    regionId === 'A'
      ? `translate(${1502 - 1248 * 1.55} ${1373 + 867 * 1.65}) rotate(270 616 432)`
      : regionId === 'B'
        ? `translate(${3170 - 1301 * 1.2} ${1518 + 982 * 0.9}) rotate(270 616 432) scale(0.781)`
        : '';

  return (
    <>
      <g style={{ opacity: `${opacity}%` }}>
        {/* 기준 도면 다를 경우 추가 */}
        {imageTransform && imageTransform.relativeTo !== drawingImage && (
          <image
            href={getImagePath(imageTransform.relativeTo || '')}
            width={baseImageSize.width}
            height={baseImageSize.height}
          />
        )}

        <image
          transform={regionTransform}
          href={getImagePath(revision.image)}
          width={baseImageSize.width}
          height={baseImageSize.height}
        />
      </g>
    </>
  );
}

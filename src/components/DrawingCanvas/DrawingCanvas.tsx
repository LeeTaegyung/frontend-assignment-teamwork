import useImgOriginSize from '@/hooks/useImgOriginSize';
import type { SelectedDisciplineState } from '@/pages/DrawingPage/DrawingPage';
import getImagePath from '@/utils/getImagePath';
import type { DrawingMapItemType } from '@/utils/getNormalizedData';

interface Props {
  drawing: DrawingMapItemType;
  selectDisciplines: SelectedDisciplineState[];
}

export default function DrawingCanvas({ drawing, selectDisciplines }: Props) {
  const baseImagePath = getImagePath(drawing.image);
  const baseImageSize = useImgOriginSize(baseImagePath);

  if (!baseImageSize) return null;

  return (
    <svg
      className='h-full w-full'
      viewBox={`0 0 ${baseImageSize.width} ${baseImageSize.height}`}
    >
      {/* 기본 도면 이미지 */}
      <image
        href={baseImagePath}
        width={baseImageSize.width}
        height={baseImageSize.height}
      />

      {!!selectDisciplines.length &&
        selectDisciplines.map((selectState) => {
          const { disciplineId, revision, regionId, imageTransform } =
            selectState;

          // 01 도면의 구조 공종 같은 경우 imageTransfrom의 값이 각 영역마다 적혀져 있긴 하지만, 왜인지 값이 제대로 맞지 않아 수동으로 표시함.
          const regionTransform =
            regionId === 'A'
              ? `translate(${1502 - 1248 * 1.55} ${1373 + 867 * 1.65}) rotate(270 616 432)`
              : regionId === 'B'
                ? `translate(${3170 - 1301 * 1.2} ${1518 + 982 * 0.9}) rotate(270 616 432) scale(0.781)`
                : '';

          return (
            <g key={disciplineId}>
              {/* 기준 도면 다를 경우 추가 */}
              {imageTransform &&
                imageTransform.relativeTo !== drawing.image && (
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
          );
        })}
    </svg>
  );
}

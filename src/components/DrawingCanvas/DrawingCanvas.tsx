import useImgOriginSize from '@/hooks/useImgOriginSize';
import type { SelectedDisciplineState } from '@/pages/DrawingPage/DrawingPage';
import getImagePath from '@/utils/getImagePath';
import getImageTransform from '@/utils/getImageTransform';
import type {
  DrawingMapItemType,
  NormalizedDiscipline,
} from '@/utils/getNormalizedData';
import getRevisions from '@/utils/getRevisions';

interface Props {
  drawing: DrawingMapItemType;
  selectDisciplines: SelectedDisciplineState[];
  disciplines: { [key: string]: NormalizedDiscipline };
}

export default function DrawingCanvas({
  drawing,
  selectDisciplines,
  disciplines,
}: Props) {
  const baseImagePath = getImagePath(drawing.image);
  const baseImageSize = useImgOriginSize(baseImagePath);

  // console.log(selectDisciplines);
  // console.log(disciplines);

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
          const currentDiscipline = disciplines[selectState.disciplineId];
          const revisions = getRevisions({
            currentDiscipline: currentDiscipline,
            selectRegion: selectState.regionId,
          });

          if (!revisions) return null;

          const imageTransform = getImageTransform({
            discipline: currentDiscipline,
            selectState: selectState,
          });
          const currentRevision = revisions[selectState.revisionIndex];

          const regionTransform =
            selectState.regionId === 'A'
              ? `translate(${1502 - 1248 * 1.55} ${1373 + 867 * 1.65}) rotate(270 616 432)`
              : selectState.regionId === 'B'
                ? `translate(${3170 - 1301 * 1.2} ${1518 + 982 * 0.9}) rotate(270 616 432) scale(0.781)`
                : '';

          return (
            <g key={selectState.disciplineId}>
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
                href={getImagePath(currentRevision.image)}
                width={baseImageSize.width}
                height={baseImageSize.height}
              />
            </g>
          );
        })}
    </svg>
  );
}

import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import ControlItem from '@/components/ControlItem/ControlItem';
import DrawingCanvas from '@/components/DrawingCanvas/DrawingCanvas';
import DrawingInfoPanel from '@/components/DrawingInfoPanel/DrawingInfoPanel';
import type {
  ImageTransformType,
  RegionsType,
  RevisionsType,
} from '@/data/types';
import getNormalizedData from '@/utils/getNormalizedData';

export interface SelectedDisciplineState {
  disciplineId: string; // 공종 이름
  revision: RevisionsType; // 선택된 revision
  region: RegionsType | null; // 선택된 region
  regionId: string | null; // 선택된 region id
  imageTransform: ImageTransformType; // 선택된 imageTransform
}

const SELECT_MAX_COUNT = 2;

export default function DrawingPage() {
  const { id } = useParams();
  const drawingId = id!;
  const { drawingMap, disciplineMap } = useMemo(() => {
    return getNormalizedData();
  }, []);

  const currentDrawing = drawingMap[drawingId];
  const currentDisciplines = disciplineMap[drawingId];

  const [selectDisciplines, setSelectDisciplines] = useState<
    SelectedDisciplineState[]
  >([]);

  const handleChangeDiscipline = (selectData: SelectedDisciplineState) => {
    setSelectDisciplines((prevSelectDisciplines) => {
      const hasSelectData = prevSelectDisciplines.some(
        (s) => s.disciplineId === selectData.disciplineId
      );

      if (!hasSelectData && prevSelectDisciplines.length < SELECT_MAX_COUNT) {
        return [...prevSelectDisciplines, selectData];
      } else {
        return prevSelectDisciplines.filter(
          (s) => s.disciplineId !== selectData.disciplineId
        );
      }
    });
  };

  const handleUpdateSelecteDiscipline = (updated: SelectedDisciplineState) => {
    setSelectDisciplines((prev) =>
      prev.map((s) => (s.disciplineId === updated.disciplineId ? updated : s))
    );
  };

  return (
    <div className='flex h-full'>
      {/* 도면 영역 */}
      <div className='flex-1'>
        <DrawingCanvas
          drawing={currentDrawing}
          selectDisciplines={selectDisciplines}
        />
      </div>

      <div className='border-l-border flex shrink-0 basis-2xs flex-col overflow-auto border-l px-3 py-5'>
        {/* 최상단 도면 컨텍스트 정보 */}
        {!!selectDisciplines.length && (
          <DrawingInfoPanel selectDisciplines={selectDisciplines} />
        )}
        {/* 컨트롤박스 */}
        <div className='mt-auto flex flex-col'>
          {Object.entries(currentDisciplines).map(
            ([disciplineKey, disciplineValue]) => {
              return (
                <ControlItem
                  key={disciplineKey}
                  disciplineName={disciplineKey}
                  disciplineValue={disciplineValue}
                  selectDisciplines={selectDisciplines}
                  onChange={handleChangeDiscipline}
                  onUpdateSelect={handleUpdateSelecteDiscipline}
                />
              );
            }
          )}
          <p className='mt-3 text-sm text-red-500'>
            ※ 최대 2개까지만 선택 가능합니다.
          </p>
        </div>
      </div>
    </div>
  );
}

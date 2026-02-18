import { useState } from 'react';
import { useParams } from 'react-router-dom';

import ControlItem from '@/components/ControlItem/ControlItem';
import DrawingCanvas from '@/components/DrawingCanvas/DrawingCanvas';
import getNormalizedData from '@/utils/getNormalizedData';

export interface SelectedDisciplineState {
  disciplineId: string;
  regionId: null | string;
  revisionIndex: number;
}

const SELECT_MAX_COUNT = 2;

export default function DrawingPage() {
  const { id } = useParams();
  const drawingId = id!;
  const { drawingMap, disciplineMap } = getNormalizedData();

  const currentDrawing = drawingMap[drawingId];
  const currentDisciplines = disciplineMap[drawingId];

  const [selectDisciplines, setSelectDisciplines] = useState<
    SelectedDisciplineState[]
  >([]);

  const handleAddDiscipline = (selectData: SelectedDisciplineState) => {
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
          disciplines={currentDisciplines}
        />
      </div>

      <div className='border-l-border flex shrink-0 basis-2xs flex-col border-l px-3 py-5'>
        {/* 컨트롤박스 */}
        <div className='mt-auto flex flex-col'>
          {Object.entries(currentDisciplines).map((discipline) => {
            return (
              <ControlItem
                discipline={discipline}
                key={discipline[0]}
                selectDisciplines={selectDisciplines}
                onChange={handleAddDiscipline}
                onUpdateSelect={handleUpdateSelecteDiscipline}
              />
            );
          })}
          <p className='mt-3 text-red-500'>※ 최대 2개까지만 선택 가능합니다.</p>
        </div>
      </div>
    </div>
  );
}

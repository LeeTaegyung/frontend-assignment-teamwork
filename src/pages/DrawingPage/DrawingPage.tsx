import { useState } from 'react';
import { useParams } from 'react-router-dom';

import ControlItem from '@/components/ControlItem/ControlItem';
import DrawingCanvas from '@/components/DrawingCanvas/DrawingCanvas';
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
  const { drawingMap, disciplineMap } = getNormalizedData();

  const currentDrawing = drawingMap[drawingId];
  const currentDisciplines = disciplineMap[drawingId];

  const [selectDisciplines, setSelectDisciplines] = useState<
    SelectedDisciplineState[]
  >([]);

  console.log(selectDisciplines);

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

      <div className='border-l-border flex shrink-0 basis-2xs flex-col border-l px-3 py-5'>
        {/* 도면 레이어 */}
        <div>
          <h2 className='text-primary font-bold'>도면 레이어</h2>
          <p className='text-sm text-gray-500'>
            숫자가 높을 수록 최상단에 위치합니다.
          </p>
          <ul className='mt-2'>
            <li className='relative mt-1'>
              <div className='flex justify-between'>
                <strong>2. 건축</strong>
                <button>정보보기</button>
                <div className='border-primary absolute top-full right-0 mt-1 rounded-2xl border-4 bg-white p-3 text-sm'>
                  <ul>
                    <li className='mb-0.5 flex gap-1'>
                      <strong className='w-10.5 shrink-0'>공종</strong> 건축
                    </li>
                    <li className='mb-0.5 flex gap-1'>
                      <strong className='w-10.5 shrink-0'>버전</strong> REV1A
                    </li>
                    <li className='mb-0.5 flex gap-1'>
                      <strong className='w-10.5 shrink-0'>파일명</strong>
                      05_101동 지상1층 평면도_구조_REV1A.png
                    </li>
                    <li className='mb-0.5 flex gap-1'>
                      <strong className='w-10.5 shrink-0'>날짜</strong>
                      2024-01-25
                    </li>
                    <li className='mb-0.5 flex gap-1'>
                      <strong className='w-10.5 shrink-0'>설명</strong> 초기
                      구조 설계
                    </li>
                    <li className='mb-0.5 flex gap-1'>
                      <div>
                        <strong className='shrink-0'>변경사항</strong>
                        <ul className='ml-3 list-disc pl-1 text-sm'>
                          <li>내진 설계 반영</li>
                          <li>슬라브 두께 증가</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                  <p></p>
                </div>
              </div>
              <div className='flex items-center gap-1 text-sm text-gray-500'>
                투명도
                <input type='range' min={0} max={100} defaultValue={100} />
              </div>
            </li>
            <li className='mt-1'>
              <div className='flex justify-between'>
                <strong>1. 구조</strong>
                <button>정보보기</button>
              </div>
              <div className='flex items-center gap-1 text-sm text-gray-500'>
                투명도
                <input type='range' min={0} max={100} defaultValue={100} />
              </div>
            </li>
          </ul>
        </div>
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

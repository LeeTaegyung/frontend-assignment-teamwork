import { type ChangeEvent, useState } from 'react';

import type { SelectedDisciplineState } from '@/pages/DrawingPage/DrawingPage';
import getImageTransform from '@/utils/getImageTransform';
import type { NormalizedDiscipline } from '@/utils/getNormalizedData';
import getRevisions from '@/utils/getRevisions';

export interface DrawingViewState {
  disciplineId: string;
  regionId: null | string;
  revisionIndex: number;
}

interface Props {
  disciplineName: string;
  disciplineValue: NormalizedDiscipline;
  selectDisciplines: SelectedDisciplineState[];
  onChange: (data: SelectedDisciplineState) => void;
  onUpdateSelect: (data: SelectedDisciplineState) => void;
}

export default function ControlItem({
  disciplineName,
  disciplineValue,
  selectDisciplines,
  onChange,
  onUpdateSelect,
}: Props) {
  const [drawingView, setDrawingView] = useState<DrawingViewState>(() =>
    createInitialDrawingView(disciplineName, disciplineValue)
  );

  const regions =
    disciplineValue.type === 'region' ? disciplineValue.regions : null;
  const revisions = getRevisions({
    currentDiscipline: disciplineValue,
    selectRegion: drawingView.regionId,
  });

  const createSelectedState = (viewState: DrawingViewState) => {
    if (!revisions) return null;

    const revision = revisions[viewState.revisionIndex];
    const regionId = viewState.regionId;
    const region = regions && regionId ? regions[regionId] : null;
    const imageTransform = getImageTransform({
      discipline: disciplineValue,
      selectState: viewState,
    });

    if (!imageTransform) return null;

    return {
      disciplineId: disciplineName,
      revision,
      region,
      regionId,
      imageTransform,
    };
  };

  // 도면 체크박스
  const handleChangeSelectDisciplines = () => {
    const next = createSelectedState(drawingView);

    if (!next) return null;

    onChange(next);
  };

  // revision/region 상태값 업데이트와 선택된 도면의 상태값 업데이트
  const updateState = (newState: DrawingViewState) => {
    setDrawingView(newState);

    const isSelected = selectDisciplines.some(
      (s) => s.disciplineId === disciplineName
    );

    if (!isSelected) return null;

    const next = createSelectedState(newState);
    if (!next) return null;

    onUpdateSelect(next);
  };

  // region 변경 함수
  const handleChangeRegion = (e: ChangeEvent<HTMLSelectElement>) => {
    const newRegion = e.target.value;

    const newRevisions = getRevisions({
      currentDiscipline: disciplineValue,
      selectRegion: newRegion,
    });

    updateState({
      ...drawingView,
      regionId: newRegion,
      revisionIndex: newRevisions ? newRevisions.length - 1 : 0, // revision도 최신버전으로 초기화
    });
  };

  // revision 버전 증가 함수
  const handleIncreaseRevision = () => {
    updateState({
      ...drawingView,
      revisionIndex: drawingView.revisionIndex + 1,
    });
  };

  // revision 버전 감소 함수
  const handleDecreaseRevision = () => {
    updateState({
      ...drawingView,
      revisionIndex: drawingView.revisionIndex - 1,
    });
  };

  return (
    <div className='border-t-border mt-4 border-t pt-4'>
      <label
        className={`mb-2 flex cursor-pointer gap-1 ${!!selectDisciplines.some((s) => s.disciplineId === disciplineName) && 'text-primary'}`}
      >
        <input
          type='checkbox'
          checked={
            !!selectDisciplines.some((s) => s.disciplineId === disciplineName)
          }
          onChange={handleChangeSelectDisciplines}
        />
        {disciplineName}
      </label>

      {drawingView.regionId && regions && (
        <select
          className='mb-2 w-full border text-center text-sm'
          value={drawingView.regionId}
          onChange={handleChangeRegion}
        >
          {Object.keys(regions).map((originName) => (
            <option value={originName} key={originName}>
              {originName}
            </option>
          ))}
        </select>
      )}

      {revisions && (
        <div className='flex items-center text-center'>
          <button
            className='bg-primary size-5 rounded-full text-xs text-white disabled:bg-gray-500'
            onClick={handleDecreaseRevision}
            disabled={drawingView.revisionIndex === 0}
          >
            &lt;
          </button>
          <span className='flex-1 text-sm'>
            {revisions[drawingView.revisionIndex].version}
          </span>
          <button
            className='bg-primary size-5 rounded-full text-xs text-white disabled:bg-gray-500'
            onClick={handleIncreaseRevision}
            disabled={drawingView.revisionIndex === revisions.length - 1}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

function createInitialDrawingView(
  disciplineName: string,
  disciplineValue: NormalizedDiscipline
) {
  const regions = disciplineValue.type === 'region' && disciplineValue.regions;
  const initRegionId = regions ? Object.keys(regions)[0] : null;
  const revisions = getRevisions({
    currentDiscipline: disciplineValue,
    selectRegion: initRegionId,
  });
  const initRevisionIndex = revisions ? revisions.length - 1 : 0;

  return {
    disciplineId: disciplineName,
    regionId: initRegionId,
    revisionIndex: initRevisionIndex,
  };
}

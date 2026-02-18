import { type ChangeEvent, useState } from 'react';

import type { SelectedDisciplineState } from '@/pages/DrawingPage/DrawingPage';
import type { NormalizedDiscipline } from '@/utils/getNormalizedData';
import getRevisions from '@/utils/getRevisions';

interface Props {
  discipline: [string, NormalizedDiscipline];
  selectDisciplines: SelectedDisciplineState[];
  onChange: (selectData: SelectedDisciplineState) => void;
  onUpdateSelect: (updated: SelectedDisciplineState) => void;
}

export default function ControlItem({
  discipline,
  selectDisciplines,
  onChange,
  onUpdateSelect,
}: Props) {
  const [name, value] = discipline;

  const [selectDiscipline, setSelectDiscipline] =
    useState<SelectedDisciplineState>(() =>
      createInitialDisciplineState(name, value)
    );

  const regions = value.type === 'region' && value.regions;
  const revisions = getRevisions({
    currentDiscipline: value,
    selectRegion: selectDiscipline.regionId,
  });

  const updateState = (newState: SelectedDisciplineState) => {
    const isSelected = selectDisciplines.some((s) => s.disciplineId === name);

    setSelectDiscipline(newState);

    if (isSelected) {
      onUpdateSelect(newState);
    }
  };

  const handleChangeRegion = (e: ChangeEvent<HTMLSelectElement>) => {
    const newRegion = e.target.value;

    const newRevisions = getRevisions({
      currentDiscipline: value,
      selectRegion: newRegion,
    });

    updateState({
      ...selectDiscipline,
      regionId: newRegion,
      revisionIndex: newRevisions ? newRevisions.length - 1 : 0, // revision도 최신버전으로 초기화
    });
  };

  const handleIncreaseRevision = () => {
    updateState({
      ...selectDiscipline,
      revisionIndex: selectDiscipline.revisionIndex + 1,
    });
  };

  const handleDecreaseRevision = () => {
    updateState({
      ...selectDiscipline,
      revisionIndex: selectDiscipline.revisionIndex - 1,
    });
  };

  return (
    <div className='border-t-border mt-4 border-t pt-4'>
      <label className='mb-2 flex cursor-pointer gap-1'>
        <input
          type='checkbox'
          checked={!!selectDisciplines.some((s) => s.disciplineId === name)}
          onChange={() => onChange(selectDiscipline)}
        />
        {name}
      </label>

      {value.type === 'region' && (
        <select
          className='mb-2 w-full border text-center'
          value={selectDiscipline.regionId || ''}
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
            className='bg-primary size-6 rounded-full text-white disabled:bg-gray-500'
            onClick={handleDecreaseRevision}
            disabled={selectDiscipline.revisionIndex === 0}
          >
            &lt;
          </button>
          <span className='flex-1 text-sm'>
            {revisions[selectDiscipline.revisionIndex].version}
          </span>
          <button
            className='bg-primary size-6 rounded-full text-white disabled:bg-gray-500'
            onClick={handleIncreaseRevision}
            disabled={selectDiscipline.revisionIndex === revisions.length - 1}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

function createInitialDisciplineState(
  name: string,
  discipline: NormalizedDiscipline
) {
  const regions = discipline.type === 'region' && discipline.regions;
  const initSelectRegion = Object.keys(regions)[0] || null;
  const revisions = getRevisions({
    currentDiscipline: discipline,
    selectRegion: initSelectRegion,
  });

  return {
    disciplineId: name,
    regionId: initSelectRegion,
    revisionIndex: revisions ? revisions.length - 1 : 0,
  };
}

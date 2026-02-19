import { useState } from 'react';

import type { LayerOpacitiesState } from '@/components/DrawingCanvas/DrawingCanvas';
import LayerOpacityItem from '@/components/LayerOpacityItem/LayerOpacityItem';

interface Props {
  onChange: (disciplineId: string, opacity: number) => void;
  layerOpacities: LayerOpacitiesState;
}

export default function LayerControlPanel({ onChange, layerOpacities }: Props) {
  const [open, setOpen] = useState(false);
  const hasLayer = Object.keys(layerOpacities).length !== 0;

  return (
    <>
      <button
        className='disabled:text-primary-disabled'
        disabled={!hasLayer}
        onClick={() => {
          setOpen((o) => !o);
        }}
      >
        레이어창
      </button>

      {open && (
        <div className='absolute bottom-[calc(100%+10px)] left-0 rounded-xl border bg-white p-3'>
          {Object.entries(layerOpacities).map(([name, opacity], idx) => {
            return (
              <LayerOpacityItem
                name={name}
                idx={idx}
                key={name}
                onChange={onChange}
                opacity={opacity}
              />
            );
          })}
          <p className='text-xs text-gray-500'>
            숫자가 높을수록 상단에 표시됩니다.
          </p>
        </div>
      )}
    </>
  );
}

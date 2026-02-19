import { useEffect, useEffectEvent, useState } from 'react';

import DrawingLayer from '@/components/DrawingLayer/DrawingLayer';
import LayerControlPanel from '@/components/LayerControlPanel/LayerControlPanel';
import useImgOriginSize from '@/hooks/useImgOriginSize';
import type { SelectedDisciplineState } from '@/pages/DrawingPage/DrawingPage';
import getImagePath from '@/utils/getImagePath';
import type { DrawingMapItemType } from '@/utils/getNormalizedData';

interface Props {
  drawing: DrawingMapItemType;
  selectDisciplines: SelectedDisciplineState[];
}

export type LayerOpacitiesState = Record<string, number>;

export default function DrawingCanvas({ drawing, selectDisciplines }: Props) {
  const [layerOpacities, setLayerOpacities] = useState<LayerOpacitiesState>({});
  const baseImagePath = getImagePath(drawing.image);
  const baseImageSize = useImgOriginSize(baseImagePath);

  const updateLayerOpacities = useEffectEvent(
    (selectDisciplines: SelectedDisciplineState[]) => {
      setLayerOpacities((prev) => {
        const newLayerOpacities: LayerOpacitiesState = {};

        selectDisciplines.forEach((el) => {
          newLayerOpacities[el.disciplineId] = prev[el.disciplineId] ?? 100;
        });

        return newLayerOpacities;
      });
    }
  );

  useEffect(() => {
    updateLayerOpacities(selectDisciplines);
  }, [selectDisciplines]);

  const handleChangeLayerControl = (disciplineId: string, opacity: number) => {
    setLayerOpacities((prev) => ({
      ...prev,
      [disciplineId]: opacity,
    }));
  };

  if (!baseImageSize) return null;

  return (
    <div className='relative h-full w-full'>
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
          selectDisciplines.map((selectDiscipline) => {
            return (
              <DrawingLayer
                key={selectDiscipline.disciplineId}
                drawingImage={drawing.image}
                baseImageSize={baseImageSize}
                selectDiscipline={selectDiscipline}
                opacity={layerOpacities[selectDiscipline.disciplineId] ?? 100}
              />
            );
          })}
      </svg>

      <div className='border-border absolute bottom-2 left-2 flex gap-3 rounded-xl border bg-white p-2'>
        <LayerControlPanel
          onChange={handleChangeLayerControl}
          layerOpacities={layerOpacities}
        />
        <button>확대+</button>
        <button>축소-</button>
      </div>
    </div>
  );
}

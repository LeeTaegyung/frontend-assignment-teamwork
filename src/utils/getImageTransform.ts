import type { DrawingViewState } from '@/components/ControlItem/ControlItem';
import type { ImageTransformType } from '@/data/types';
import type { NormalizedDiscipline } from '@/utils/getNormalizedData';

export default function getImageTransform({
  discipline,
  selectState,
}: {
  discipline: NormalizedDiscipline;
  selectState: DrawingViewState;
}): ImageTransformType | null {
  switch (discipline.type) {
    case 'base':
      return discipline.imageTransform || null;
    case 'region':
      return (
        (selectState.regionId &&
          discipline.regions[selectState.regionId].revisions[
            selectState.revisionIndex
          ].imageTransform) ||
        null
      );
    case 'revisionOnly':
      return (
        discipline.revisions[selectState.revisionIndex].imageTransform || null
      );
  }
}

import type { SelectedDisciplineState } from '@/pages/DrawingPage/DrawingPage';
import type { NormalizedDiscipline } from '@/utils/getNormalizedData';

export default function getImageTransform({
  discipline,
  selectState,
}: {
  discipline: NormalizedDiscipline;
  selectState: SelectedDisciplineState;
}) {
  switch (discipline.type) {
    case 'base':
      return discipline.imageTransform;
    case 'region':
      return (
        selectState.regionId &&
        discipline.regions[selectState.regionId].revisions[
          selectState.revisionIndex
        ].imageTransform
      );
    case 'revisionOnly':
      return discipline.revisions[selectState.revisionIndex].imageTransform;
  }
}

import type { NormalizedDiscipline } from '@/utils/getNormalizedData';

export default function getRevisions({
  currentDiscipline,
  selectRegion,
}: {
  currentDiscipline: NormalizedDiscipline;
  selectRegion: string | null;
}) {
  switch (currentDiscipline.type) {
    case 'region':
      return selectRegion && currentDiscipline.regions[selectRegion].revisions;
    case 'revisionOnly':
      return currentDiscipline.revisions;
    case 'base':
      return currentDiscipline.revisions;
  }
}

import type { RevisionsType } from '@/data/types';
import type { NormalizedDiscipline } from '@/utils/getNormalizedData';

export default function getRevisions({
  currentDiscipline,
  selectRegion,
}: {
  currentDiscipline: NormalizedDiscipline;
  selectRegion: string | null;
}): RevisionsType[] | null {
  switch (currentDiscipline.type) {
    case 'region':
      return (
        (selectRegion && currentDiscipline.regions[selectRegion].revisions) ||
        null
      );
    case 'revisionOnly':
      return currentDiscipline.revisions || null;
    case 'base':
      return currentDiscipline.revisions || null;
  }
}

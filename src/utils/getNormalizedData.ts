import originData from '@/data/metadata.json';
import type {
  DisciplinesItemType,
  ImageTransformType,
  OriginDataType,
  PolygonType,
  PositionType,
  RegionsType,
  RevisionsType,
} from '@/data/types';

interface DrawingItemType {
  id: string;
  name: string;
  image: string;
  parent: string | null;
  position: PositionType | null;
}

interface DrawingMapType {
  [key: string]: DrawingItemType;
}

type DisciplineType = 'base' | 'region' | 'revisionOnly';

interface BaseDiscipline {
  type: 'base';
  imageTransform?: ImageTransformType;
  polygon?: PolygonType;
  revisions: RevisionsType[];
}

export interface RegionDiscipline {
  type: 'region';
  imageTransform?: ImageTransformType;
  polygon?: PolygonType;
  regions: {
    [regionsId: string]: RegionsType;
  };
}

interface RevisionOnlyDiscipline {
  type: 'revisionOnly';
  revisions: RevisionsType[];
}

export type NormalizedDiscipline =
  | BaseDiscipline
  | RegionDiscipline
  | RevisionOnlyDiscipline;

export interface DisciplinesMapType {
  [key: string]: {
    [key: string]: NormalizedDiscipline;
  };
}

/**
 * project: 프로젝트 정보
 * drawingMap: 전체 배치도에 표시할 도면 정보(좌표, 도면 이름 등등)
 * disciplineMap: 전체 배치도를 제외한 도면별 공종별 정보
 */
export default function getNormalizedData() {
  const { project, drawings } = originData as OriginDataType;
  const drawingMap: DrawingMapType = {};
  const disciplineMap: DisciplinesMapType = {};

  Object.entries(drawings).forEach(([drawingId, drawingValue]) => {
    const { id, name, image, parent, position, ...rest } = drawingValue;

    drawingMap[drawingId] = { id, name, image, parent, position };

    if ('disciplines' in rest) {
      disciplineMap[drawingId] = {};
      Object.entries(rest.disciplines!).forEach(([name, value]) => {
        const type = getDisciplineType(value);

        switch (type) {
          case 'region':
            disciplineMap[drawingId][name] = {
              type: 'region',
              imageTransform: value.imageTransform,
              polygon: value.polygon,
              regions: value.regions!,
            };
            break;
          case 'revisionOnly':
            disciplineMap[drawingId][name] = {
              type: 'revisionOnly',
              revisions: value.revisions!,
            };
            break;
          case 'base':
            disciplineMap[drawingId][name] = {
              type: 'base',
              imageTransform: value.imageTransform,
              polygon: value.polygon,
              revisions: value.revisions!,
            };
            break;
        }
      });
    }
  });

  return { project, drawingMap, disciplineMap };
}

function getDisciplineType(data: DisciplinesItemType): DisciplineType {
  if (data.regions) return 'region';

  if (!data.imageTransform && data.revisions?.every((r) => r.imageTransform))
    return 'revisionOnly';

  return 'base';
}

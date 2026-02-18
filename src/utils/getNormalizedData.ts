import originData from '@/data/metadata.json';
import type {
  DisciplinesItemType,
  DrawingItemType,
  ImageTransformType,
  OriginDataType,
  PolygonType,
  RegionsType,
  RevisionsType,
} from '@/data/types';

type DrawingMapItemType = Omit<DrawingItemType, 'disciplines'>;

interface DrawingMapType {
  [key: string]: DrawingMapItemType;
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
      Object.entries(rest.disciplines!).forEach(([name, data]) => {
        disciplineMap[drawingId][name] = {
          ...getDisciplineData(data),
        };
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

function getDisciplineData(data: DisciplinesItemType): NormalizedDiscipline {
  const type = getDisciplineType(data);
  switch (type) {
    case 'region':
      return {
        type: 'region',
        imageTransform: data.imageTransform,
        polygon: data.polygon,
        regions: data.regions!,
      };
    case 'revisionOnly':
      return {
        type: 'revisionOnly',
        revisions: data.revisions!,
      };
    case 'base':
      return {
        type: 'base',
        imageTransform: data.imageTransform,
        polygon: data.polygon,
        revisions: data.revisions!,
      };
  }
}

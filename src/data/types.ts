export interface OriginDataType {
  project: {
    name: string;
    unit: string;
  };
  disciplines: { name: string }[];
  drawings: {
    [drawingId: string]: DrawingItemType;
  };
}

interface DrawingItemType {
  id: string;
  name: string;
  image: string;
  parent: null | string;
  position: null | PositionType;
  disciplines?: {
    [disciplineId: string]: DisciplinesItemType;
  };
}

export interface PositionType {
  vertices: VerticesType;
  imageTransform: ImageTransformType;
}

export interface DisciplinesItemType {
  imageTransform?: ImageTransformType;
  image?: string;
  polygon?: PolygonType;
  regions?: {
    [regionsId: string]: RegionsType;
  };
  revisions?: RevisionsType[];
}

type VerticesType = number[][];

export interface ImageTransformType {
  relativeTo?: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface PolygonTransform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface PolygonType {
  vertices: VerticesType;
  polygonTransform: PolygonTransform;
}

export interface RegionsType {
  polygon?: PolygonType;
  revisions: RevisionsType[];
}

export interface RevisionsType {
  version: string;
  image: string;
  date: string;
  description: string;
  changes: string[];
  imageTransform?: ImageTransformType;
  polygon?: PolygonType;
}

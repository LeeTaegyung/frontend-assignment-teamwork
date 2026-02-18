import type { VerticesType } from '@/data/types';

export default function verticesToPathD(vertices: VerticesType | undefined) {
  return (
    vertices &&
    vertices
      .map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
      .join(' ') + ' Z'
  );
}

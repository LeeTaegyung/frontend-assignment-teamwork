import type { SelectedDisciplineState } from '@/pages/DrawingPage/DrawingPage';

interface Props {
  selectDisciplines: SelectedDisciplineState[];
}

export default function DrawingInfoPanel({ selectDisciplines }: Props) {
  const latestDiscipline = selectDisciplines[selectDisciplines.length - 1];
  const { disciplineId, revision } = latestDiscipline;

  const renderInfo = {
    공종: disciplineId,
    버전: revision.version,
    파일명: revision.image,
    날짜: revision.date,
    설명: revision.description,
    '변경 사항': revision.changes,
  };

  return (
    <div>
      <h2 className='text-primary font-bold'>도면 정보</h2>
      <p className='text-sm text-gray-500'>
        최상단에 위치한 도면의 정보입니다.
      </p>

      <div className='border-primary mt-1 rounded-2xl border-4 bg-white p-3 text-sm'>
        <ul>
          {Object.entries(renderInfo).map(([key, value]) => {
            if (value === '' || !value.length) return;

            if (key === '변경 사항') {
              return (
                <li className='mb-0.5 flex gap-1' key={key}>
                  <div>
                    <strong className='shrink-0'>{key}</strong>
                    <ul className='ml-3 list-disc pl-1 text-sm'>
                      {Array.isArray(value) &&
                        value.map((c, idx) => (
                          <li key={`${key}${idx}`}>{c}</li>
                        ))}
                    </ul>
                  </div>
                </li>
              );
            }
            return (
              <li className='mb-0.5 flex gap-1' key={key}>
                <strong className='w-10.5 shrink-0'>{key}</strong> {value}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

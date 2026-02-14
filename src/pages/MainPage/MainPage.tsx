import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

import data from '@/data/metadata.json';
import useImgOriginSize from '@/hooks/useImgOriginSize';

export default function MainPage() {
  // 정규화 해야할 목록
  // 1. 공종 전체 목록
  // 2. 도면 전체 목록
  //   - id, name, image, position
  // 3. 도면별 공종 목록
  // 4. 도면별 공종별 버전 관리 (최신 버전까지 찾아낼 수 있을 것 같음)

  // 해야할 것
  // - 타입 지정
  // - 컴포넌트 분리
  // - 레이아웃 분리

  const mainBase = data.drawings['00'];
  const mainBaseSize = useImgOriginSize(
    `/public/images/drawings/${data.drawings['00'].image}`
  );

  const [open, setOpen] = useState(false);

  const drawings = Object.keys(data.drawings)
    .sort((a: string, b: string) => {
      return Number(a) - Number(b);
    })
    .map((key: string) => data.drawings[key]);

  console.log(drawings);

  return (
    <div className='flex h-screen w-full flex-col overflow-hidden'>
      <header className='shrink-0 grow-0'>
        <h1 className='border-b-border border-b px-3 py-2 text-xl font-bold'>
          {data.project.name} - {mainBase.name}
        </h1>
        <button
          className='fixed bottom-5 left-5'
          onClick={() => {
            setOpen((o) => !o);
          }}
        >
          메뉴열기
        </button>
        {open &&
          createPortal(
            <div className='fixed top-0 right-0 bottom-0 left-0 bg-black/50'>
              <div className='h-full w-[30%] overflow-auto bg-white'>
                <ul className='p-10'>
                  {drawings.map((data) => (
                    <li key={data.id} className='border-b-border border-b'>
                      <Link to={`/drawing/${data.id}`} className='block py-5'>
                        {data.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>,
            document.body
          )}
      </header>
      <main className='flex-1 overflow-hidden'>
        {!(mainBaseSize === null) && (
          <svg
            className='h-full w-full'
            viewBox={`0 0 ${mainBaseSize.width} ${mainBaseSize.height}`}
          >
            <image
              href={`/public/images/drawings/${data.drawings['00'].image}`}
              className='block max-h-full max-w-none'
            />

            {drawings.map((drawing) => {
              if (drawing.id === '00') return null;

              const d =
                drawing.position.vertices
                  .map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
                  .join(' ') + ' Z';
              return (
                <g key={drawing.id}>
                  <Link to={`/drawing/${drawing.id}`}>
                    <path
                      d={d}
                      stroke='red'
                      stroke-width='2'
                      fill='transparent'
                      className='cursor-pointer hover:fill-red-500/50'
                    />
                  </Link>
                </g>
              );
            })}
          </svg>
        )}
      </main>
    </div>
  );
}

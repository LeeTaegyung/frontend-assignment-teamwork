import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useParams } from 'react-router-dom';

import getNormalizedData from '@/utils/getNormalizedData';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { project, drawingMap } = getNormalizedData();

  const drawings = Object.keys(drawingMap)
    .sort((a: string, b: string) => {
      return Number(a) - Number(b);
    })
    .map((key: string) => drawingMap[key]);

  return (
    <header className='relative shrink-0 grow-0'>
      <h1 className='border-b-border border-b px-3 py-2 text-lg font-bold'>
        <Link to='/'>
          {project.name} - {drawingMap[id ?? '00'].name}
        </Link>
      </h1>
      <button
        className='absolute top-1/2 right-3 -translate-y-1/2'
        onClick={() => {
          setOpen((o) => !o);
        }}
      >
        메뉴열기
      </button>
      {open &&
        createPortal(
          <div className='fixed top-0 right-0 bottom-0 left-0 bg-black/50'>
            <div className='relative ml-auto h-full w-[30%] overflow-auto bg-white'>
              <button
                onClick={() => {
                  setOpen((o) => !o);
                }}
                className='absolute top-2 right-2'
              >
                닫기
              </button>
              <ul className='p-10'>
                {drawings.map((data) => {
                  if (data.id === '00') return null;
                  return (
                    <li key={data.id} className='border-b-border border-b'>
                      <Link
                        to={`/drawing/${data.id}`}
                        className={`block py-5 ${id === data.id && 'text-primary'}`}
                      >
                        {data.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}

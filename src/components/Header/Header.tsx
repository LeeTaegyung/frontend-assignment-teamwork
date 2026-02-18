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
    <header className='shrink-0 grow-0'>
      <h1 className='border-b-border border-b px-3 py-2 text-lg font-bold'>
        {project.name} - {drawingMap[id ?? '00'].name}
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
            <div className='relative h-full w-[30%] overflow-auto bg-white'>
              <button
                onClick={() => {
                  setOpen((o) => !o);
                }}
                className='absolute top-2 right-2'
              >
                닫기
              </button>
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
  );
}

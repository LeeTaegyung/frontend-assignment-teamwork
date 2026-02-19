import { type ChangeEvent } from 'react';

interface Props {
  name: string;
  idx: number;
  onChange: (disciplineId: string, opacity: number) => void;
  opacity: number;
}

export default function LayerOpacityItem({
  name,
  idx,
  onChange,
  opacity,
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(name, Number(e.target.value));
  };

  return (
    <div className='mt-1 border-t pt-1 text-sm first:mt-0 first:border-t-0 first:pt-0'>
      <div className='font-bold'>
        {idx + 1}. {name}
      </div>
      <div>
        투명도 : {opacity}%
        <input
          type='range'
          min={0}
          max={100}
          value={opacity}
          onChange={handleChange}
          className='w-full'
        />
      </div>
    </div>
  );
}

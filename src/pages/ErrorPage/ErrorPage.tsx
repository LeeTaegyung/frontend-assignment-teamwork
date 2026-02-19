import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-3'>
      <h2 className='text-2xl'>페이지를 불러올 수 없습니다.</h2>
      <p className='text-gray-500'>
        요청하신 페이지를 찾을 수 없거나 오류가 발생했습니다.
      </p>
      <Link to='/' className='border-border rounded-xl border px-3 py-2'>
        메인페이지로 이동
      </Link>
    </div>
  );
}

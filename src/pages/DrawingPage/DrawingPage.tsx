import { useParams } from 'react-router-dom';

export default function DrawingPage() {
  const { id } = useParams();
  return <div>도면 페이지 {id}</div>;
}

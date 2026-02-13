import { Link } from 'react-router-dom';

export default function MainPage() {
  return (
    <div>
      <Link to={`/drawing/123`}>이동</Link>
    </div>
  );
}

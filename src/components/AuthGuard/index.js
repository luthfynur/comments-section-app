import { Navigate } from 'react-router-dom';

export default function AuthGuard({ children, user }) {
  if (user?.currentUser === null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

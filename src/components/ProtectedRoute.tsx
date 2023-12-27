import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: React.ReactNode;
}) => {
  if (isAuthenticated) {
    return <>{children}</>; 
  } else {
    return <Navigate to="/auth/signin" replace />; 
  }
};

export default ProtectedRoute;

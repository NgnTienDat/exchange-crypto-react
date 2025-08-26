import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../contexts/AuthContext";
import useUser from "../hooks/useUser";



export default function PrivateRoute({ children }) {
  const { user, isLoading} = useUser(); 



  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/auth/login" replace/>;
  }

  return children;
}
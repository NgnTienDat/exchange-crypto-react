import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../contexts/AuthContext";



export default function PrivateRoute({ children }) {
  const { user, loading} = useAuthContext(); 


  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/auth/login"/>;
  }

  return children;
}
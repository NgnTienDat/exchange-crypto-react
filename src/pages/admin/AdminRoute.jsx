import { Navigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const AdminRoute = ({ children }) => {
    const { user, isLoading } = useUser();
    console.log("user admin: ", user)


    if (isLoading) {
        return <div>Loading...</div>; // hoặc spinner
    }

    if (!user) {
        console.log("user login: ", user)
        return <Navigate to="/auth/login" />;
    }

    if (!user.roles?.includes("ADMIN")) {
        console.log("user not permission: ", user)
        return <Navigate to="/not-permission" />;
    }

    return children;
};
export default AdminRoute;
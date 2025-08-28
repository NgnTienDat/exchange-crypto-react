import { useNavigate } from "react-router-dom";
import { OAuthConfig } from "../configurations/configurations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginOauth } from "../services/authService";

function useGoogleLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { isLoading, mutate: googleLogin } = useMutation({
        mutationFn: (code) => loginOauth(code),
        onSuccess: (user) => {

            console.log("token oauth: ", user)

            // queryClient.setQueryData(["user"], user);
            navigate("/");
        },
        onError: (err) => {
            navigate("/auth/login");
            console.log(err);
            toast.error(err.response.data.message);
        },
    });

    async function getOauthAuthorizationCode() {
        const hashParams = new URLSearchParams(window.location.search);
        console.log(hashParams.get("code"));
        return hashParams.get("code");
    }

    async function redirectGoogleLogin() {
        try {
            const callbackUrl = OAuthConfig.redirectUri;
            const authUrl = OAuthConfig.authUri;
            const googleClientId = OAuthConfig.clientId;

            const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
                callbackUrl
            )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

            console.log(targetUrl);

            window.location.href = targetUrl;
        } catch (err) {
            toast.error(err.message);
        }
    }

    return { redirectGoogleLogin, getOauthAuthorizationCode, googleLogin }
}

export default useGoogleLogin;
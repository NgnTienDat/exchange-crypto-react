import React, { useEffect, useState } from 'react'
import useGoogleLogin from '../../hooks/useGoogleLogin';

const CallBackOAuth = () => {
    const [dotLoading, setDotLoading] = useState("");
    const { getOauthAuthorizationCode, googleLogin } = useGoogleLogin();

    useEffect(() => {
        console.log();
        // googleLogin(getOauthAuthorizationCode());
        setInterval(() => {
            setDotLoading((state) => {
                return state.length >= 3 ? "" : state + ".";
            });
        }, 500);

        (async function login() {
            const authorizationCode = await getOauthAuthorizationCode();
            googleLogin(authorizationCode);
            console.log("auth code: ", authorizationCode)
        })();
    }, []);

    return <div className="text-3xl text-black">Logging in {dotLoading}</div>;
}

export default CallBackOAuth
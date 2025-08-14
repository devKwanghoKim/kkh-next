import { signIn } from "next-auth/react";
import { useCallback } from "react";
import axios from 'axios';

export function useAuth() {
    const handleLogin = useCallback(async (username: string, password: string) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/login`,
                { username, password },
                {
                  withCredentials: true, // 쿠키 포함
                  headers: { "Content-Type": "application/json" },
                }
              );

            await signIn("credentials", {
                username,
                password,
                accessToken: response.data.accessToken,
                redirect: false,
            })
        
            return true;
          } catch (e) {
            console.log("fail")
            return false;
          }
    }, [] );
    return {handleLogin}
}
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from 'next/headers'
import cookie from 'cookie';


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/signup',
    },
    callbacks: {
        jwt({ token, user }) {
            if (user?.accessToken) {
                token.accessToken = user.accessToken
            }
            console.log('auth.ts user', user);
            console.log('auth.ts jwt', token);
            return token;
        },
        session({ session, token }) {
            if (token?.accessToken) {
                session.accessToken = token.accessToken
            }
            console.log('auth.ts session', session, token);
            return session;
        }
    },
    events: {
        signOut(data) {
            console.log('auth.ts events signout', 'session' in data && data.session, 'token' in data && data.token);
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
                method: "POST",
                credentials: 'include'
            })
        },
        session(data) {
            console.log('auth.ts events session', 'session' in data && data.session, 'token' in data && data.token);
        }
    },
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
                accessToken:  { label: "accessToken", type: "text" },
            },
            async authorize(credentials) {
                console.log(credentials)
                // TODO: 추후 소스 정리 필요
                // const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/login`, {
                //     method: "POST",
                //     credentials: 'include',
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify({
                //         username: credentials?.username,
                //         password: credentials?.password,
                //     }),
                // })

                // console.log(authResponse)
                // const accessToken = authResponse.headers.get('token');
                // let setCookie = authResponse.headers.get('Set-Cookie');
                // console.log('accessToken', accessToken);
                // console.log('set-cookie', setCookie);
                // if (setCookie) {
                //     const parsed = cookie.parse(setCookie);
                //     const cookieStore = await cookies();
                //     cookieStore.set('connect.sid', parsed['connect.sid']!, parsed);
                // }
                // if (!authResponse.ok) {
                //     return null
                // }
                // const user = await authResponse.json();
                // console.log('username', user);
                // if (!user) return null;
                let user = { id: '', name: '', email: '', image: '' }
                return {
                    // email: user.id,
                    ...user,
                    // accessToken: accessToken,
                    accessToken: credentials.accessToken as string
                }
            },
        }),
    ]
});

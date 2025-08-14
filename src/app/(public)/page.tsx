import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {redirect} from "next/navigation";

export default async function Main() {
    const session = await auth();
    if (session?.user) {
        redirect('/temp');
    }
    return (
        <div className="flex h-screen">
            <div className="w-3/5 bg-gray-100 flex items-center justify-center">
                임시
            </div>
            <div className="w-2/5 flex flex-col justify-center items-center p-10 bg-white">
                <div className="mb-12 text-center">
                    <h2 className="text-2xl font-semibold">환영합니다2</h2>
                    <p className="text-sm text-gray-500 mt-2">
                        서비스를 사용하시려면 로그인 또는 회원가입을 진행해주세요.
                    </p>
                </div>

                <div className="space-y-4 w-full max-w-xs">
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/auth/signup">회원가입</Link>
                    </Button>
                    <Button className="w-full" asChild>
                        <Link href="/auth/login">로그인</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
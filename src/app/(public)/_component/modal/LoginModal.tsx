'use client';

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useAuth } from "@/app/hooks/useAuth"

export default function LoginModal() {
  const {handleLogin} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('1');
  const router = useRouter();

  const onChangeUsername: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      // TODO: 추후 소스 정리 필요
      // const response = await signIn("credentials", {
      //   username,
      //   password,
      //   redirect: false,
      // })

      // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/login`, {
      //   method: "POST",
      //   credentials: "include",  // 쿠키 포함 (리프레시 토큰)
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ username, password }),
      // });

      const response = await handleLogin(username, password);
      console.log(response);
      // if (!response || response.error) {
      if (!response) {
        setMessage('아이디와 비밀번호가 일치하지 않습니다.');
      } else {
        router.replace('/home');
      }
    } catch (err) {
      console.error(err);
      setMessage('아이디와 비밀번호가 일치하지 않습니다.');
    }
  }; 

  const closeModal = () => {
    router.back();
  };

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input type="string" value={username} onChange={onChangeUsername} placeholder="ID"/>
          <Input type="password" value={password} onChange={onChangePassword} placeholder="비밀번호"/>
          <div>{message}</div>
          <Button type="submit" className="w-full">로그인</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
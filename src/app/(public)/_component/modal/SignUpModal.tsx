'use client';

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUpModal() {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>회원가입</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <Input type="email" placeholder="이메일"/>
          <Input type="password" placeholder="비밀번호"/>
          <Button type="submit" className="w-full">확인</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
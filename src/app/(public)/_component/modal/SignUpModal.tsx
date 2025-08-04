'use client';

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
          <input type="email" placeholder="이메일" className="w-full border px-3 py-2 rounded-md" />
          <input type="password" placeholder="비밀번호" className="w-full border px-3 py-2 rounded-md" />
          <button type="submit" className="w-full bg-black text-white py-2 rounded-md">
            확인
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
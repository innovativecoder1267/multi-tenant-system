"use client";

import { Suspense } from "react";
import VerifyContent from "./verifyotp";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}

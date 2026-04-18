import VerifyPage from "./verifyotp";
import { Suspense } from "react";

export default function Page(){
  <Suspense fallback={<div>...Loading</div>}>
    <div>
      <VerifyPage/>
    </div>

  </Suspense>
}

import { Suspense } from "react";
import InvitePage from "./invite";
 

export default function Page(){
  <Suspense fallback ={<div>...Loading</div>}>
  <div >
    <InvitePage/>
  </div>
  </Suspense>  

}

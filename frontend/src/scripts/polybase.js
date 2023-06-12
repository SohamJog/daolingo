import { Polybase } from "@polybase/client";
import { ethers } from "ethers";
import { ethPersonalSign } from '@polybase/eth'



const db = new Polybase({
  defaultNamespace: "pk/0xef0bffa8495694673bf3c1c01413e5ffe987b2fdc47a37b594f5688953c2d53dfc2d2f0a10b91d96354eaac73f6644702b0d7dfbc387dfa632938854eefcf3ef/daolingo",

});


function generateRandomId() {
  //generate random alphanumeric string
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
export async function createUser() {
  
  console.log("Creating object...")
  let tag = generateRandomId()
  await db.collection("Temp").create([tag, "New York"]);
  console.log("Created temp object!")

}


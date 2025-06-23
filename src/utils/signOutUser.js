import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export async function signOutUser() {
  try {
    await signOut(auth); // Firebase sign-out
    return true;
  } catch (error) {
    console.error("Error signing out:", error.message);
    return false;
  }
}
import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { GoogleAuthProvider, signInWithCredential, signOut } from "firebase/auth";


export const loginWithGoogle = defineAction({
  accept: 'json',
  input: z.any(),
  handler: async (credentials) => {
    const credential = GoogleAuthProvider.credentialFromResult(credentials)
    // return await signOut(firebase.auth)
    if(!credential) {
      throw new Error('Signin with Google failed')
    }
    await signInWithCredential(firebase.auth, credential) // creas la sesión del user
    return true;
  }

})
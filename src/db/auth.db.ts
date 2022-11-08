import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { app } from "./firebase.db";

const auth = getAuth(app);

const _signInWithEmailPassword = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return { status: "ok", data: res.user };
  } catch (e) {
    return { status: "error", error: e };
  }
};

// Sets persistence while signing in
export const signInWithEmailPassword = async (email: string, password: string) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    return await _signInWithEmailPassword(email, password);
  } catch (e) {
    return { status: "error", error: e };
  }
}

export const signOutOfSession = async () => {
  try {
    const res = await signOut(auth);
    return { status: "ok", data: res };
  } catch (e) {
    return { status: "error", error: e };
  }
};

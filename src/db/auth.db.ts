import {
  getAuth,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { app } from "./firebase.db";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const _signUpWithEmailPassword = async (email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return { status: "ok", data: res.user };
  } catch (e) {
    return { status: "error", error: e };
  }
};

// Sets persistence while signing up with email and password
export const signUpWithEmailPassword = async (email: string, password: string) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    return await _signUpWithEmailPassword(email, password);
  } catch (e) {
    return { status: "error", error: e };
  }
};


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

const _signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const credentials = GoogleAuthProvider.credentialFromResult(res);
    return { status: "ok", data: { "credentials": credentials, "user": res.user } };
  } catch (e: any) {
    const credentials = GoogleAuthProvider.credentialFromError(e);
    return { status: "error", error: { credentials, e } };
  }
};

// Sets Persistence while signing in with google
export const signInWithGoogle = async () => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    return await _signInWithGoogle();
  } catch (e) {
    return { status: "error", error: e };
  }
};


export const signOutOfSession = async () => {
  try {
    const res = await signOut(auth);
    return { status: "ok", data: res };
  } catch (e) {
    return { status: "error", error: e };
  }
};

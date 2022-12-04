import { app } from "./firebase.db";
import { getDatabase, ref, set } from "firebase/database";
import generateKey from "../utils/getHash.utils";

const db = getDatabase(app);


export const writeUserData = async (
  userId: string,
  userEmail: string,
  testId: string,
  openBlackListedApps: string[]
) => {
  const logId = generateKey();
  await set(ref(db, "blackListedApps/" + testId), {
    email: userEmail,
    userId: userId,
    openBlackListedApps: openBlackListedApps,
    logId: logId,
  });
  return logId;
}

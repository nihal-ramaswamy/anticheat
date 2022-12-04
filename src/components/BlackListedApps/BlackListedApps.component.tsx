import { useEffect, useState } from "react";
import { ChildProcess } from "@tauri-apps/api/shell";
import { getOpenBlackListedApps } from "../../utils/blackListedApps.utils";
import Loader from "../Loader/Loader.component";
import ScrollList from "../ScrollList/ScrollList.component";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { writeUserData } from "../../db/db.db";


const BlackListedApps = () => {
  const [openBlackListedApps, setOpenBlackListedApps] = useState<ChildProcess["stdout"][]>();
  const [state, setState] = useState<string>("idle");
  const auth = getAuth();

  const testId = useSelector((state: any) => state.testId.testId);
  const uid = auth.currentUser?.uid;
  const email = auth.currentUser?.email;

  useEffect(() => {
    (async () => {
      setState("fetching");

      for (let tryNumber = 0; ; ++tryNumber) {
        const blackListedApps = await getOpenBlackListedApps();
        if (blackListedApps === undefined) {
          continue;
        }
        if (blackListedApps.status === "error") {
          console.log(`Attempt #${tryNumber}: ${blackListedApps.error}`);
        } else {
          if (blackListedApps.data === undefined) {
            continue;
          }
          setOpenBlackListedApps(blackListedApps.data);
          setState("data");
          if ((uid !== null && uid !== undefined) && (email !== null && email !== undefined)) {
            const logId = await writeUserData(uid, email, testId, blackListedApps.data); 
            console.log(logId);
          } else {
            continue;
          }
          break;
        }
      }
    })();
  }, []);

  const render = () => {
    if (state === "idle") {
      return <></>;
    }
    if (state === "fetching") {
      return (<Loader />);
    }
    if (state === "data") {
      return (
        <>
          <div>
            You have {openBlackListedApps?.length} blacklisted apps open.
          </div>
          <ScrollList data={openBlackListedApps} />
          <div>Please close them before taking the test.</div>
        </>
      );
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {render()}
      </header>
    </div>
  );
};

export default BlackListedApps;

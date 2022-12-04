import { useEffect, useState } from "react";
import { ChildProcess } from "@tauri-apps/api/shell";
import { getOpenBlackListedApps } from "../../utils/blackListedApps.utils";
import { auth, firestore} from "../../db/firebase2";
import Loader from "../Loader/Loader.component";
import ScrollList from "../ScrollList/ScrollList.component";
import { firebaseConfig } from "../../config/firebase.config";


const BlackListedApps = () => {
  const [openBlackListedApps, setOpenBlackListedApps] = useState<ChildProcess["stdout"][]>();
  const [state, setState] = useState<string>("idle");

  useEffect(() => {
    (async () => {
      setState("fetching");

      for (let tryNumber = 0; ; ++tryNumber) {
        const blackListedApps = await getOpenBlackListedApps();
        if (blackListedApps?.status === "error") {
           let data = {
              uid : auth.currentUser,
              status : "error",
              list : blackListedApps
           }
           firestore.collection("blackListedApps").add(data);
        } else {
          setOpenBlackListedApps(blackListedApps?.data);
          setState("data");
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

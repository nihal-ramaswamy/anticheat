import { useEffect, useState } from "react";
import { ChildProcess } from "@tauri-apps/api/shell";
import { getOpenBlackListedApps } from "../../utils/blackListedApps.utils";
import Loader from "../Loader/Loader.component";
import ScrollList from "../ScrollList/ScrollList.component";


const BlackListedApps = () => {
  const [openBlackListedApps, setOpenBlackListedApps] = useState<ChildProcess["stdout"][]>();
  const [state, setState] = useState<string>("idle");

  useEffect(() => {
    (async () => {
      setState("fetching");

      for (let tryNumber = 0; ; ++tryNumber) {
        const blackListedApps = await getOpenBlackListedApps();
        if (blackListedApps?.status === "error") {
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

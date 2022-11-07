import { getBlackListedApps } from "./cms.utils";
import { Command } from "@tauri-apps/api/shell";
import { stringToList, getAllMatchesWithSubstring } from "./string.utils";

interface CMSAppResponse {
  id: number;
  attributes: any;
};


const cmsResponseToStringList = (data: CMSAppResponse[]) => {
  let res = [];
  for (let value of data) {
    res.push(value.attributes.AppName);
  }
  console.log(res);
  return res as string[];
}


export const getOpenBlackListedApps = async (attemptNumber: number) => {
  const blackListedApps = await getBlackListedApps();

  console.log(blackListedApps);

  if (blackListedApps.status === "error") {
    return { status: "error", error: blackListedApps.error };
  }

  const blackListedAppsAsStringList = cmsResponseToStringList(blackListedApps.data);

  const command = Command.sidecar('../src-python/dist/checkRunningProcesses');
  const output = await command.execute();
  console.log(output, attemptNumber);

  if (output.code === 0) {
    let openProcesses = stringToList(output.stdout);

    return { status: "ok", data: getAllMatchesWithSubstring(openProcesses, blackListedAppsAsStringList) };

  } else if (output.code === 1) {
    return { status: "error", error: output.stderr };
  }

};

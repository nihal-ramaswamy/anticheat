import React, { useEffect, useState } from 'react';
import { ChildProcess, Command } from '@tauri-apps/api/shell';
import './App.css';

const App = () => {
  const [processes, setProcesses] = useState<ChildProcess>();
  const [openBlackListedApps, setOpenBlackListedApps] = useState<ChildProcess["stdout"]>();

  const stringToList = (a: string) => {
    // a = "["1", "2", "3"]"
    // Returns ["1", "2", "3"] as a list
    a = a.replace(/'/g, '"');
    a = JSON.parse(a);
    return a as any;
  };

  useEffect(() => {
    (async () => {
      const command = Command.sidecar('../src-python/dist/checkRunningProcesses');
      const output = await command.execute();
      console.log(output);
      setProcesses(output);
      let stdout = stringToList(output.stdout);
      setOpenBlackListedApps(stdout);
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          Code: {processes?.code}
        </div>
        <div>
        Signal: {processes?.signal}
        </div>
        <div>
        Stderr: {processes?.stderr}
        </div>
        <div>
        Stdout: {processes?.stdout}
        </div>
        <div>
          Len: {openBlackListedApps?.length}
        </div>
      </header>
    </div>
  );
}

export default App;

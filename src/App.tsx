import BlackListedApps from './components/BlackListedApps/BlackListedApps.component';
import LogIn from './components/LogIn/LogIn.component';
import { useSelector } from "react-redux";
import TestId from './components/TestId/TestId.component';

const App = () => {

  const user = useSelector((state: any) => state.auth.user);
  const testId = useSelector((state: any) => state.testId.testId);

  const render = () => {
    if (user == "") {
      return <LogIn />
    } else if (testId == "") {
      return <TestId />
    } else if (user != "" && testId != "") {
      return <BlackListedApps />
    }

    return <LogIn />
  }

  return (
    <>
      {render()}
    </>
  );
}

export default App;


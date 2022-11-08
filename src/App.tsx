import BlackListedApps from './components/BlackListedApps/BlackListedApps.component';
import LogIn from './components/LogIn/LogIn.component';
import { useSelector } from "react-redux";

const App = () => {

  const user = useSelector((state: any) => state.auth.user);
  console.log(user);

  const render = () => {
    if (user == "") {
      return <LogIn />
    } else {
      return <BlackListedApps />
    }
  }

  return (
    <>
      {render()}
    </>
  );
}

export default App;


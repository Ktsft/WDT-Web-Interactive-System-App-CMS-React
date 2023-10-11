import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { UserProvider } from '../src/profile/userProvider';
import logo from './logo.svg';
import './App.css';

import { Login, Dashboard, Verify } from "./profile/index";

function App() {
  return (
    <UserProvider>
      <Router>
        <Route exact path="/">
          <Redirect to="/login"></Redirect>
        </Route>
        <Route path="/login">
            <Login></Login>
        </Route>
        <Route path="/dashboard">
            <Dashboard></Dashboard>
        </Route>
        <Route path="/verify">
            <Verify></Verify>
        </Route>
      </Router>
    </UserProvider>
  );
}

export default App;

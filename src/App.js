import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { UserProvider } from '../src/profile/userProvider';
import logo from './logo.svg';
import './App.css';

import { Login, Dashboard, Verify } from "./profile/index";

function App() {
  return (
    <UserProvider>
      <Router>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/Verify">
          <Verify />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Router>
    </UserProvider>
  );
}

export default App;

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import { Login } from "./profile/index";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Redirect to="/login"></Redirect>
      </Route>
      <Route path="/login">
          <Login></Login>
      </Route>
    </Router>
  );
}

export default App;

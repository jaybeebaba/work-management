import { Route, Switch } from "react-router-dom"
import './App.css';

// pages
import Dashboard from "./pages/dashboard/Dashboard"
import Login from "./pages/login/Login.js"
import Signup from "./pages/signup/Signup"
import Create from "./pages/create/Create"
import Project from "./pages/project/Project"
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/projects/:id">
            <Project />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
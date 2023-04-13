import { Route, Switch, Redirect } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext";
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

  const {user, authIsReady} = useAuthContext()
  return (
    <>
      {
        authIsReady && (
          <div className="App">
      <Sidebar />
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path="/">
            {user ? <Dashboard /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            {!user ? <Login /> : <Redirect to="/"/>}
          </Route>

          <Route path="/signup">
            
            {!user ? <Signup /> : <Redirect to="/"/>}
          </Route>
          <Route path="/create">
            {user  ? <Create /> : <Redirect to="/login"/> }
          </Route>
          <Route path="/projects/:id">
            {user ? <Project /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    </div>
        )
      }
    </>
    
  );
}

export default App;
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"; // Added useHistory
import axios from "axios";
// <button onClick={getRecipes}>Get recipes</button>

import Login from "./Login";

import Signup from "./Signup";
import Recipes from "./Recipes"; // Assuming you have a Recipes component

function App() {
  const [data, setData] = useState({
    role:"",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: ""
  });

  const [user, setUser] = useState({ loggedIn: false, token: "" });

  return (
    <Router>
      <div className="mera-dabba">
        <nav>
          <ul>
          <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/recipe">Admin Recipes</Link>
            </li>
            {user.loggedIn && (
              <li>
                 <Routes>
                 <Route path="/recipe" element={<Recipes/>} />
                 </Routes>
               
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login setUser={setUser} />} />        
        </Routes>
      </div>
    </Router>
  );
}

export default App;

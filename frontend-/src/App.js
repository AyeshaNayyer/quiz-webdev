import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"; // Added useHistory
import axios from "axios";


import Login from "./Login";

import Signup from "./Signup";
//import Recipes from "./Recipes"; // Assuming you have a Recipes component
import AdminRecipePage from "./Recipes";

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
   // Function to check if the user is an admin
   const isAdmin = () => {
    // Assuming your user object has a 'role' property indicating the user's role
    return user && user.role === 'admin';
  };
 
  const createCard = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        url: "http://localhost:5600/bank/createCard",
        method: "post",
        data: { email: data.email },
        headers: { Authorization: `Bearer ${user.token}` },
      });
      window.alert(res.data.msg);
    } catch (e) {
      window.alert("ERROR");
    }
  };
 

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
          
            {user.loggedIn &&  ( // Only show Admin Recipes link for admin users
              <li>
                <Link to="/adminrecipe">Admin Recipes</Link>
              </li>
            )}
            {user.loggedIn && (
              <li>
                 <button onClick={createCard}>Get Card</button>
               
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login setUser={setUser} />} />  
          {user.loggedIn &&  ( // Protect Admin Recipes route
            <Route path="/adminrecipe" element={<AdminRecipePage />} />
          )}      
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "../Homepage/Homepage";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";
import Navbar from "../../components/navbar/navbar";
import ProfilePage from "../ProfilePage/ProfilePage";
import PokemonDetailPage from "../PokemonDetailPage/PokemonDetailPage";

function App() {
  const [user, setUser] = useState(userService.getUser()); 

  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  if (user) {
    return (
      <div>
        <Navbar handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
          <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
          <Route path="/profile" element={<ProfilePage user={user} />} />
          <Route path="/pokemonDetail/:pokemonId" element={<PokemonDetailPage />} />
        </Routes>
      </div>

    );
  }

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
        <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </div>

  );
}

export default App;

// based on the tutorial from https://usehooks.com/useAuth/

import { createContext, useState } from "react";
// a bug with this hook prevented me from using it 😢
// import { useLocalStorage } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

let AuthContext = createContext();

// This is what we export from this file
export default AuthContext;

// Provider hook that creates auth object and handles state
export function useProvideAuth() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(
    window.localStorage.getItem("loggedIn")
  );
  const [authToken, setToken] = useState(
    window.localStorage.getItem("authToken")
  );
  const [postId, setPostId] = useState(0);

  function login(values, form) {
    // Homework TODO: Add Backend Support
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'email': values.email, 'password': values.password })
    };
    fetch('https://tpeo-todo.herokuapp.com/auth/login', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

    if (data) {
      setLoggedIn(true);
      window.localStorage.setItem("loggedIn", true);
      window.localStorage.setItem("loggedIn", true);
      // Navigate towards / page, which is relatively one directory back
      navigate("../");
    } else {
      // sets and error with the form
      form.setErrors({ email: true, password: "Invalid login" });
    }
  }

  function logout() {
    // In Class TODO: Implement this function
    window.localStorage.clear("loggedIn");
    setLoggedIn(false);
    console.log(loggedIn);
  }

  return {
    loggedIn,
    login,
    logout
  };
}

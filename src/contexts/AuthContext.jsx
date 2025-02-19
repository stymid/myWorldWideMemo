/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const initialState = {
  user: null,
  isAuthenticated: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "login/success":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "login/reject":
      return { ...state, user: null, isAuthenticated: false };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("action didn't match");
  }
};
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const login = async ({ email, password }) => {
    try {
      const data = FAKE_USER;
      if (data.email === email && data.password === password) {
        dispatch({ type: "login/success", payload: data });

        return;
      }
      dispatch({ type: "login/reject" });
    } catch (err) {
      console.log(err.message);
    }
  };

  const logout = () => {
    try {
      dispatch({ type: "logout" });
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useContext was used uoutside the AuthProvider");
  return context;
};
export { AuthProvider, useAuth };

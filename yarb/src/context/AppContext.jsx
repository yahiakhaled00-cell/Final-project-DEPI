import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem("isAuthenticated") || "false")
  );
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user") || "null")
  );
  const [githubData, setGithubData] = useState(
    () => JSON.parse(localStorage.getItem("githubData") || "null")
  );
  const [profile, setProfile] = useState(
    () => JSON.parse(localStorage.getItem("profile") || JSON.stringify({
      name: "", title: "", bio: "", email: "", phone: "",
      location: "", github: "", linkedin: "", twitter: "",
      website: "", skills: "", avatar: null, experience: [], education: [],
    }))
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setGithubData(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("githubData");
  };

  const handleSetGithubData = (data) => {
    setGithubData(data);
    localStorage.setItem("githubData", JSON.stringify(data));
  };

  const handleSetProfile = (data) => {
    setProfile(data);
    localStorage.setItem("profile", JSON.stringify(data));
  };

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      isAuthenticated, user, login, logout,
      githubData, setGithubData: handleSetGithubData,
      profile, setProfile: handleSetProfile,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
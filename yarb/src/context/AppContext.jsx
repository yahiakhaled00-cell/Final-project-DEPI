import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [githubData, setGithubData] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };


const [portfolioData, setPortfolioData] = useState({
  template: "minimal",
  about: { name: "", title: "", bio: "" },
  skills: [],
  projects: [],
  contact: { email: "", phone: "", location: "", github: "", linkedin: "" },
  theme: { primaryColor: "#6c63ff", fontStyle: "sans", darkMode: false },
  profileImage: null
});

  return (
    <AppContext.Provider value={{ theme, toggleTheme, isAuthenticated, user, login, logout, githubData, setGithubData, portfolioData, setPortfolioData }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
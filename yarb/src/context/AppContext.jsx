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

  // 👇 جديد: تخزين اليوزرز اللي عملوا Sign Up
  const [users, setUsers] = useState(
    () => JSON.parse(localStorage.getItem("users") || "[]")
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

  // 👇 جديد: signup و signin
  const signup = (userData) => {
  const exists = users.some(u => u.email === userData.email);
  if (exists) return { success: false, message: "Email already registered." };

  const updatedUsers = [...users, userData];
  setUsers(updatedUsers);
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // تسجيل دخول تلقائي بعد الـ Sign Up
  login({ name: userData.name, email: userData.email });

  return { success: true };
};

  const signin = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { success: false, message: "Invalid email or password." };

    login({ name: found.name, email: found.email });
    return { success: true };
  };

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      isAuthenticated, user, login, logout,
      githubData, setGithubData: handleSetGithubData,
      profile, setProfile: handleSetProfile,
      signup, signin,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  token: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  login: (token: string, role: string) => void;
  logout: () => void;
  loading: boolean;
};  

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage saat pertama kali buka web
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setUser({ token, role });
    }

    setLoading(false);
  }, []);

  function login(token: string, role: string) {
    const userData = { token, role };
    setUser(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

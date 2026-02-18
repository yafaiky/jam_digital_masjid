import { createContext, useContext, useEffect, useState } from "react";

type User = {
  token: string;
  role: string;
  clientId?: string;
  enabledFeatures?: string[];
};

type AuthContextType = {
  user: User | null;
  login: (token: string, role: string, clientId?: string, enabledFeatures?: string[]) => void;
  logout: () => void;
  loading: boolean;
  setEnabledFeatures: (features: string[]) => void;
  isFeatureEnabled: (featureKey: string) => boolean;
};  

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage saat pertama kali buka web
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const clientId = localStorage.getItem("clientId");
    const enabledFeatures = localStorage.getItem("enabledFeatures");

    if (token && role) {
      setUser({
        token,
        role,
        clientId: clientId || undefined,
        enabledFeatures: enabledFeatures ? JSON.parse(enabledFeatures) : undefined,
      });
    }

    setLoading(false);
  }, []);

  function login(token: string, role: string, clientId?: string, enabledFeatures?: string[]) {
    const userData: User = { token, role, clientId, enabledFeatures };
    setUser(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    if (clientId) localStorage.setItem("clientId", clientId);
    if (enabledFeatures) localStorage.setItem("enabledFeatures", JSON.stringify(enabledFeatures));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("clientId");
    localStorage.removeItem("enabledFeatures");
  }

  function setEnabledFeatures(features: string[]) {
    if (user) {
      const updatedUser = { ...user, enabledFeatures: features };
      setUser(updatedUser);
      localStorage.setItem("enabledFeatures", JSON.stringify(features));
    }
  }

  function isFeatureEnabled(featureKey: string): boolean {
    return user?.enabledFeatures?.includes(featureKey) ?? false;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, setEnabledFeatures, isFeatureEnabled }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

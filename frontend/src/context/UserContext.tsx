import { createContext, ReactNode, useContext, useState } from "react";

type User = {
  __v?: number;
  name: string;
  _id: string;
  email: string;
  password: string;
};

type ContextType = {
  user: User | {};
  setUser: React.Dispatch<React.SetStateAction<{} | User>>;
};

export function useUsers() {
  const userContext = useContext(Context);
  if (userContext == null) {
    throw new Error("must be within a provider");
  }
  return userContext;
}

export const Context = createContext<ContextType | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | {}>({});

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
}

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "../context/UserContext";

const queryClient = new QueryClient();

function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default AppWrapper;

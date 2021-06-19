import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { User } from "../types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ProviderProps {
  children: ReactNode;
}

interface ContextProps {
  client: User;
  authenticateClient: (user: User) => void;
  logoutClient: () => void;
  loginClient: (data: LoginProps, usersArray: User[]) => boolean;
  changePoints: (points: number) => void;
}
type LoginProps = Omit<User, "name" | "points" | "isAuthenticated">;

export const ClientContext = createContext<ContextProps>({} as ContextProps);

export function ClientProvider({ children }: ProviderProps) {
  const [client, setClient] = useState<User>({} as User);

  const toast = useToast();

  function changePoints(points: number) {
    setClient({ ...client, points });
    Cookies.set("client", client);
  }

  function authenticateClient(client: User) {
    setClient(client);
    Cookies.set("client", client);
  }

  function logoutClient() {
    setClient({} as User);
    Cookies.remove("client");
  }

  function loginClient(data: LoginProps, usersArray: User[]) {
    const client = usersArray.filter((e) => {
      if (e.email === data.email && e.password === data.password) {
        setClient({ ...e, isAuthenticated: true });
        Cookies.set("client", { ...e, isAuthenticated: true });
        toast({
          title: "Bem vindo novamente!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        return e;
      }
      return null;
    });

    if (client.length === 0) {
      toast({
        title: "Senha/Usuário Incorreto!",
        description: "Verifique os dados e tente novamente!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return false;
    } else {
      return true;
    }
  }

  useEffect(() => {
    const newClient = Cookies.get("client");
    if (newClient) {
      const client = JSON.parse(newClient);
      setClient(client);
    }
  }, []);

  return (
    <ClientContext.Provider
      value={{
        client,
        authenticateClient,
        logoutClient,
        loginClient,
        changePoints,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
export function useClient() {
  const context = useContext(ClientContext);
  return context;
}

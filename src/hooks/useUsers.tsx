import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useToast } from "@chakra-ui/react";
import Cookie from "js-cookie";
import { useClient } from "./useClient";
import { User } from "../types";

interface ProviderProps {
  children: ReactNode;
}

interface ContextProps {
  users: User[];
  createUser: (user: User) => boolean;
}

export const UsersContext = createContext<ContextProps>({} as ContextProps);

export function UsersProvider({ children }: ProviderProps) {
  const [users, setUsers] = useState<User[]>([]);
  const { authenticateClient } = useClient();

  const toast = useToast();

  function createUser(user: User) {
    if (users.find((e) => e.email === user.email)) {
      toast({
        title: "Usuário já cadastrado!",
        description: "Verifique os dados e tente novamente!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return false;
    }

    setUsers([...users, user]);

    Cookie.set("users", [...users, user]);
    authenticateClient(user);

    toast({
      title: "Cadastrado com sucesso!",
      description: "Conta criada, parabéns!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    return true;
  }

  useEffect(() => {
    const newUsers = Cookie.get("users");
    if (newUsers) {
      const user = JSON.parse(newUsers);

      setUsers(user);
    }
  }, [setUsers]);

  return (
    <UsersContext.Provider value={{ users, createUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  return context;
}

import { createContext, ReactNode, useContext, useState } from "react";
import { Order } from "../types";
import Axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useClient } from "./useClient";
const OrderContext = createContext<ContextProps>({} as ContextProps);

interface ContextProps {
  order: Order;
  setOrderValues: (key: "pasta" | "size" | "flavor", value: string) => void;
  cleanOrder: () => void;
  createOrder: (pizza: Order) => void;
}

interface ProviderProps {
  children: ReactNode;
}

export function OrderProvider({ children }: ProviderProps) {
  const [order, setOrder] = useState<Order>({} as Order);
  const { changePoints, client } = useClient();
  const toast = useToast();

  function setOrderValues(key: "pasta" | "size" | "flavor", value: string) {
    switch (key) {
      case "pasta":
        setOrder({ ...order, pasta: value });
        break;

      case "size":
        setOrder({ ...order, size: value });
        break;

      case "flavor":
        setOrder({ ...order, flavor: value });
        break;

      default:
        break;
    }
  }

  async function createOrder(pizza: Order) {
    if (!client.isAuthenticated) {
      return toast({
        title: "Opa!",
        description: "Entre ou cadastre-se para finalizar o pedido!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    const { data } = await Axios.post("/order/create", {
      pizza,
    });
    if (data.availablePoints) {
      changePoints(client.points + 100);
      toast({
        position: "top-right",
        title:
          "Parabéns, você adquiriu os pontos da oferta e ja foram adicionados a sua conta!",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function cleanOrder() {
    setOrder({} as Order);
  }

  return (
    <OrderContext.Provider
      value={{ order, setOrderValues, cleanOrder, createOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);

  return context;
}

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";

import { Order } from "types";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onAction: () => void;
}

export default function ModalFinishOrder({
  isOpen,
  onClose,
  order,
  onAction,
}: IProps) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Informação do pedido</ModalHeader>
        <ModalCloseButton />
        <ModalBody flexDirection="column">
          <Text>Massa: {order.pasta}</Text>
          <Text>Tamanho: {order.size}</Text>
          <Text>Sabor: {order.flavor}</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            _hover={{
              transform: "scale(1.1)",
              backgroundColor: "#4d925fae",
              color: "white",
            }}
            onClick={onAction}
          >
            Finalizar Pedido
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

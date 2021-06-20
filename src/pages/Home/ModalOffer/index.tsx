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
import { OfferProps } from "types";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  offerInfo: OfferProps;

  onAction: () => void;
}

export default function ModalOffer({
  isOpen,
  onClose,
  offerInfo,
  onAction,
}: IProps) {
  const { pizza, offerInfos } = offerInfo;

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Informação do pedido</ModalHeader>
          <ModalCloseButton />
          <ModalBody flexDirection="column">
            <Text>Massa: {pizza.pasta}</Text>
            <Text>Tamanho: {pizza.size}</Text>
            <Text>Sabor: {pizza.flavor}</Text>
          </ModalBody>
          <ModalHeader>Informação da Oferta</ModalHeader>
          <ModalCloseButton />
          <ModalBody flexDirection="column">
            <Text>{offerInfos.description}</Text>
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
    </>
  );
}

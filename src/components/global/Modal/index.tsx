import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ModalFinishOrder({
  isOpen,
  onClose,
  children,
}: IProps) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}

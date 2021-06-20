import { Flex, Button, Text } from "@chakra-ui/react";
import {
  Checkbox,
  CheckboxGroup,
  HStack,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "components/global/Modal";
import { useOrder } from "../../../hooks/useOrder";

interface IProps {
  title: string;
  value: string;
  options: string[];
  nextStepName: string;
  setValue: (el: string) => void;
  setOrderValues: () => void;
  isLastStep?: boolean;
}

function StepToMakePizza({
  title,
  value,
  options,
  nextStepName,
  setValue,
  setOrderValues,
  isLastStep = false,
}: IProps) {
  const [modalFinishOrder, setModalFinishOrder] = useState(false);
  const { order, createOrder } = useOrder();

  return (
    <Flex flexDirection="column" alignItems="center">
      <Text fontSize="30px" textAlign="center">
        {title}
      </Text>
      {value ? 1 : 0} de 1
      <Flex
        backgroundColor="#e9e5e5"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        borderRadius={10}
        minWidth={320}
        maxWidth={500}
        width="100%"
        alignContent="center"
        padding="20px 0"
      >
        <CheckboxGroup colorScheme="blue">
          <HStack
            color="#2b6cb0"
            fontWeight="600"
            alignItems="left"
            spacing={isLastStep ? 0 : 10}
            flexWrap="wrap"
            flexDirection={isLastStep ? "column" : "initial"}
          >
            {options?.map((e) => (
              <Checkbox
                isChecked={value === e}
                borderColor="white"
                onChange={() => {
                  if (e === value) {
                    setValue("");
                  } else {
                    setValue(e);
                  }
                }}
                alt={e}
                key={e}
              >
                {e}
              </Checkbox>
            ))}
          </HStack>
        </CheckboxGroup>
        {isLastStep ? (
          <Button
            marginTop={10}
            bgColor="white"
            _hover={{
              transform: "scale(1.1)",
              backgroundColor: "#4d925fae",
              color: "white",
            }}
            onClick={() => {
              setModalFinishOrder(true);
              setOrderValues();
            }}
            isDisabled={value && order.size && order.pasta ? false : true}
          >
            Próxima etapa
          </Button>
        ) : (
          <Link to={nextStepName} onClick={setOrderValues}>
            <Button
              marginTop={10}
              bgColor="white"
              _hover={{
                transform: "scale(1.1)",
                backgroundColor: "#4d925fae",
                color: "white",
              }}
              isDisabled={value ? false : true}
            >
              Próxima etapa
            </Button>
          </Link>
        )}
      </Flex>
      {modalFinishOrder && (
        <Modal
          isOpen={modalFinishOrder}
          onClose={() => setModalFinishOrder(false)}
        >
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
              onClick={() => createOrder(order)}
            >
              Finalizar Pedido
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </Flex>
  );
}
export default StepToMakePizza;

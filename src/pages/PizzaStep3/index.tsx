import {
  Checkbox,
  CheckboxGroup,
  HStack,
  Divider,
  Flex,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";
import { useClient } from "../../hooks/useClient";
import ModalFinishOrder from "./ModalFinishOrder";
import { useNavigate } from "react-router-dom";

function PizzaStep3() {
  const [oneFlavor, setOneFlavor] = useState("");
  const navigate = useNavigate();
  const [twoFlavors, setTwoFlavors] = useState(["", ""]);
  const { order, setOrderValues, cleanOrder, createOrder } = useOrder();
  const [modalFinishOrder, setModalFinishOrder] = useState(false);
  const { client } = useClient();
  const [flavor, setFlavor] = useState(1);
  const toast = useToast();

  const [options, setOptions] = useState([]);

  async function getOptions() {
    const response = await fetch("/flavors");
    const data = await response.json();
    setOptions(data);
  }

  useEffect(() => {
    getOptions();
  }, []);

  useEffect(() => {
    if (order.flavor) {
      setOneFlavor(order.flavor);
    }
  }, [order.flavor]);

  function handleCreateOrder() {
    createOrder(order);
    setOrderValues("flavor", oneFlavor);
    cleanOrder();
    navigate("/");
  }

  return (
    <Flex flexDirection="column" alignItems="center">
      <Text fontSize="30px" textAlign="center">
        Hora de escolher o recheio!
      </Text>
      {flavor === 1 ? (oneFlavor ? 1 : 0) : twoFlavors.length} de {flavor}
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
        {/* Quantos sabores deseja?
        <RadioGroup
          onChange={(e) => setFlavor(parseInt(e))}
          value={flavor}
          marginBottom={10}
          marginTop={5}
          colorScheme="green"
        >
          <Stack direction="row">
            <Radio value={1} borderColor="blackAlpha.500" defaultChecked>
              Um
            </Radio>
            <Radio value={2} borderColor="blackAlpha.500">
              Dois
            </Radio>
          </Stack>
        </RadioGroup> */}
        {modalFinishOrder && (
          <ModalFinishOrder
            isOpen={modalFinishOrder}
            onClose={() => setModalFinishOrder(false)}
            order={order}
            onAction={() => handleCreateOrder()}
          />
        )}
        {flavor === 1 ? (
          <>
            <CheckboxGroup colorScheme="blue">
              <HStack
                color="#2b6cb0"
                fontWeight="600"
                alignItems="left"
                flexDirection="column"
                flexWrap="wrap"
                minWidth={160}
                maxWidth={250}
              >
                {options.map((option) => (
                  <Checkbox
                    onChange={() => {
                      if (option === oneFlavor) {
                        setOneFlavor("");
                      } else {
                        setOneFlavor(option);
                      }
                    }}
                    isChecked={oneFlavor === option}
                    borderColor="white"
                    key={option}
                    alt={option}
                  >
                    {option}
                  </Checkbox>
                ))}
              </HStack>
            </CheckboxGroup>

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
                setOrderValues("flavor", oneFlavor);
              }}
              isDisabled={oneFlavor && order.size && order.pasta ? false : true}
            >
              Próxima etapa
            </Button>
          </>
        ) : (
          <>
            <CheckboxGroup colorScheme="blue">
              <HStack
                color="#2b6cb0"
                fontWeight="600"
                alignItems="left"
                spacing={10}
              >
                <Flex>
                  <Flex flexDirection="column" justifyContent="space-between">
                    {options.map((option) => (
                      <Checkbox
                        onChange={() => {
                          if (twoFlavors[0] === option) {
                            setTwoFlavors([
                              (twoFlavors[0] = ""),
                              twoFlavors[1],
                            ]);
                          } else {
                            setTwoFlavors([
                              (twoFlavors[0] = option),
                              twoFlavors[1],
                            ]);
                          }
                        }}
                        isChecked={twoFlavors[0] === option}
                        borderColor="white"
                      >
                        {option}
                      </Checkbox>
                    ))}
                  </Flex>
                  <Divider
                    orientation="vertical"
                    margin="0 10px"
                    type="dashed"
                    h="100px"
                    colorScheme="blackAlpha"
                  />
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    flexWrap="wrap"
                  >
                    {options.map((option) => (
                      <Checkbox
                        onChange={() => {
                          if (twoFlavors[1] === option) {
                            setTwoFlavors([
                              twoFlavors[0],
                              (twoFlavors[1] = ""),
                            ]);
                          } else {
                            setTwoFlavors([
                              twoFlavors[0],
                              (twoFlavors[1] = option),
                            ]);
                          }
                        }}
                        isChecked={twoFlavors[1] === option}
                        borderColor="white"
                      >
                        {option}
                      </Checkbox>
                    ))}
                  </Flex>
                </Flex>
              </HStack>
            </CheckboxGroup>
            <Link to="/">
              <Button
                marginTop={10}
                bgColor="white"
                _hover={{
                  transform: "scale(1.1)",
                  backgroundColor: "#4d925fae",
                  color: "white",
                }}
              >
                Próxima etapa
              </Button>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
}
export default PizzaStep3;

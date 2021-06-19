import { Flex, Button, Text } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";

function PizzaStep2() {
  const [value, setValue] = useState("");
  const { order, setOrderValues } = useOrder();
  const [options, setOptions] = useState([]);

  async function getOptions() {
    const response = await fetch("/sizes");
    const data = await response.json();
    setOptions(data);
  }

  useEffect(() => {
    getOptions();
  }, []);

  useEffect(() => {
    if (order.size) {
      setValue(order.size);
    }
  }, [order.size]);

  return (
    <Flex flexDirection="column" alignItems="center">
      <Text fontSize="30px" textAlign="center">
        Hora de escolher o tamanho!
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
            spacing={10}
          >
            {options.map((e) => (
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

        <Link
          to="/pizzaStep3"
          onClick={() => {
            setOrderValues("size", value);
          }}
        >
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
      </Flex>
    </Flex>
  );
}
export default PizzaStep2;

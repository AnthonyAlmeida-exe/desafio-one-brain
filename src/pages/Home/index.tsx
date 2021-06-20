import { useEffect, useState } from "react";
import { Box, Image, Flex, Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import Pizza from "assets/pizza.jpg";
import ModalOffer from "./ModalOffer";
import { OfferProps } from "types";
import { useOrder } from "hooks/useOrder";

export default function Home() {
  const [modalOffer, setModalOffer] = useState(false);
  const [offer, setOffer] = useState<OfferProps>({} as OfferProps);
  const { createOrder } = useOrder();

  async function getOfferDay() {
    const response = await fetch("/offerday");
    const data = await response.json();

    setOffer(data);
  }

  useEffect(() => {
    getOfferDay();
  }, []);

  return (
    <Flex direction="row" justifyContent="center" flexWrap="wrap">
      <Link to="/pastastep">
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          margin="30px 50px"
          _hover={{
            transform: "scale(1.1)",
            backgroundColor: "#4d925fae",
            color: "white",
            cursor: "pointer",
          }}
          transition="transform 1s"
        >
          <Image
            src={Pizza}
            alt="Imagem de pizza"
            maxWidth="320px"
            maxHeight="320px"
          />
          <Flex
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            fontWeight="600"
            width="100%"
            margin="20px 0"
          >
            <Text>Monte a sua pizza!</Text>
          </Flex>
        </Box>
      </Link>
      {modalOffer && (
        <ModalOffer
          isOpen={modalOffer}
          offerInfo={offer}
          onClose={() => setModalOffer(false)}
          onAction={() => {
            createOrder(offer.pizza);
            setModalOffer(false);
          }}
        />
      )}

      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        margin="30px 50px"
        _hover={{
          transform: "scale(1.1)",
          backgroundColor: "#4d925fae",
          color: "white",
          cursor: "pointer",
        }}
        transition="transform 1s"
        onClick={() => setModalOffer(true)}
      >
        <Image
          src={Pizza}
          alt="Imagem de pizza"
          maxWidth="320px"
          maxHeight="320px"
        />
        <Flex
          flexDirection="row"
          justifyContent="center"
          fontWeight="600"
          width="100%"
          margin="20px 0"
        >
          Recomendada do dia!
        </Flex>
      </Box>
    </Flex>
  );
}

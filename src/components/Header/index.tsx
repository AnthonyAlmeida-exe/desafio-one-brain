import {
  Box,
  Stack,
  Heading,
  Flex,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Text,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  ArrowForwardIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";
import Draw from "./Draw";

import { useClient } from "../../hooks/useClient";
import { useRef, useState } from "react";

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const { client, logoutClient } = useClient();
  const cancelRef = useRef(null);

  const Alert = (
    <AlertDialog
      isOpen={isOpenAlert}
      onClose={() => setIsOpenAlert(false)}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Encerrar sessão
          </AlertDialogHeader>

          <AlertDialogBody>
            Você tem certeza que deseja encerrar sua sessão atual?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={() => setIsOpenAlert(false)}>Cancelar</Button>
            <Button
              colorScheme="red"
              onClick={() => {
                logoutClient();
                setIsOpenAlert(false);
              }}
              ml={3}
            >
              Logout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
  const location = useLocation();

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={10}
        marginBottom={25}
        bg="#e9e5e5"
      >
        <Flex align="center" mr={5}>
          <Link to="/">
            <Heading as="h3" size="xl" letterSpacing={"tighter"}>
              Desafio One Brain
            </Heading>
          </Link>
        </Flex>

        <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
          <HamburgerIcon />
        </Box>

        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: isOpen ? "block" : "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        ></Stack>

        <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
        >
          {client && client?.isAuthenticated ? (
            <Flex flexDirection="column" fontWeight="600">
              <Text>Olá, {client.name}</Text>
              <Text>Seus Pontos: {client.points}</Text>
              <Button
                colorScheme="facebook"
                variant="outline"
                onClick={() => setIsOpenAlert(true)}
                rightIcon={<ArrowForwardIcon />}
              >
                Sair
              </Button>
            </Flex>
          ) : (
            <>
              <Draw name="Entrar" variant />
              <Draw name="Criar Conta" />
            </>
          )}
          {isOpenAlert && Alert}
        </Box>
      </Flex>
      {location.pathname !== "/" && (
        <Flex justifyContent="center">
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem isCurrentPage={location.pathname === "/pizza"}>
              <Link to="/pizza">Massas</Link>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage={location.pathname === "/pizzastep2"}>
              <Link to="/pizzastep2">Tamanhos</Link>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage={location.pathname === "/pizzastep3"}>
              <Link to="/pizzastep3">Recheio</Link>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
      )}
    </>
  );
}

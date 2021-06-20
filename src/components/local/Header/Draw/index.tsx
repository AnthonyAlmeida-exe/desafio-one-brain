import { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  useDisclosure,
  Stack,
  Box,
  FormLabel,
  InputGroup,
  FormControl,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useUsers } from "hooks/useUsers";
import { useClient } from "hooks/useClient";

interface Props {
  name: string;
  variant?: boolean;
}

interface NewUser {
  name: string;
  password: string;
  email: string;
}

type LoginProps = Omit<NewUser, "name">;

function Draw({ name, variant }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const { createUser, users } = useUsers();
  const { loginClient } = useClient();

  function onSubmit(data: NewUser) {
    setLoading(true);
    const newUser = createUser({ ...data, points: 0, isAuthenticated: true });

    setLoading(false);
    if (newUser) {
      onClose();
    }
  }

  function onLogin(data: LoginProps) {
    setLoading(true);

    const loged = loginClient(data, users);

    setLoading(false);
    if (loged) {
      onClose();
    }
  }

  function checkEmail(email: string) {
    if (
      users.filter((e) => {
        return e.email === email;
      }).length !== 1
    ) {
      toast({
        title: "Email não encontrado!",
        description: "Verifique o email inserido ou cadastre-se!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const Register = (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Crie sua conta</DrawerHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormControl id="name" isRequired>
                    <FormLabel htmlFor="username">Nome</FormLabel>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Informe seu nome ..."
                      {...register("name")}
                    />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl id="email" isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <InputGroup>
                      <Input
                        type="email"
                        id="email"
                        placeholder="Informe seu email principal..."
                        {...register("email")}
                      />
                    </InputGroup>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl id="password" isRequired>
                    <FormLabel htmlFor="password">Defina sua Senha</FormLabel>
                    <InputGroup>
                      <Input
                        type="password"
                        id="password"
                        {...register("password")}
                        placeholder="Digite uma senha..."
                      />
                    </InputGroup>
                  </FormControl>
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                isLoading={loading}
                type="submit"
                spinner={<Spinner color="white" />}
              >
                Cadastrar
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
  const Login = (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Faça seu Login</DrawerHeader>
          <form onSubmit={handleSubmit(onLogin)}>
            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormControl id="email" isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <InputGroup>
                      <Input
                        type="email"
                        id="email"
                        placeholder="Informe seu email ..."
                        {...register("email")}
                        onBlur={(e) => checkEmail(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl id="password" isRequired>
                    <FormLabel htmlFor="password">Senha</FormLabel>
                    <InputGroup>
                      <Input
                        type="password"
                        id="password"
                        {...register("password")}
                        placeholder="Digite sua senha..."
                      />
                    </InputGroup>
                  </FormControl>
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px" marginTop="15px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                isLoading={loading}
                type="submit"
                spinner={<Spinner color="white" />}
              >
                Login
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );

  return (
    <>
      <Button
        bg={variant ? "white" : "#ea1d2c"}
        color={!variant ? "white" : "#ea1d2c"}
        variant={variant ? "outline" : "link"}
        borderRadius="6px"
        padding="15px"
        marginLeft="10px"
        onClick={onOpen}
        _hover={!variant ? { bg: "#c2121f" } : { bg: "#e8d7d7" }}
      >
        {name}
      </Button>
      {name === "Entrar" && Login}
      {name === "Criar Conta" && Register}
    </>
  );
}
export default Draw;

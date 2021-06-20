import { Box, Stack, Text } from "@chakra-ui/react";

import { IconButton, ButtonGroup } from "@chakra-ui/react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <Box
      as="footer"
      role="contentinfo"
      py="12"
      px={{ base: "4", md: "10" }}
      bgColor="#2b6cb0"
      width="100%"
      marginTop={25}
    >
      <Stack>
        <Stack
          direction="row"
          spacing="4"
          align="center"
          justify="space-between"
        >
          <ButtonGroup>
            <IconButton
              as="a"
              target="_blank"
              title="Github Anthony Almeida"
              href="https://github.com/AnthonyAlmeida-exe"
              aria-label="GitHub"
              icon={<FaGithub fontSize="20px" />}
            />
            <IconButton
              as="a"
              target="_blank"
              title="Linkedin Anthony Almeida"
              href="https://br.linkedin.com/in/anthony-almeida"
              aria-label="Linkedin"
              icon={<FaLinkedin fontSize="20px" />}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="whiteAlpha.800">
          &copy; {new Date().getFullYear()} Dev Anthony Almeida
        </Text>
      </Stack>
    </Box>
  );
}

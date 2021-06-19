import { ButtonGroup, IconButton } from "@chakra-ui/react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export function SocialMediaLinks() {
  return (
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
  );
}

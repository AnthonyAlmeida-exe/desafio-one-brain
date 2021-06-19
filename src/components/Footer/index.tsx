import { Box, Stack, Text } from "@chakra-ui/react";

import { SocialMediaLinks } from "./SocialMediaLinks";
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
          <SocialMediaLinks />
        </Stack>
        <Text fontSize="sm" color="whiteAlpha.800">
          &copy; {new Date().getFullYear()} Dev Anthony Almeida
        </Text>
      </Stack>
    </Box>
  );
}

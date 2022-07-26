import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/DogDetail.css";
import { useParams } from "react-router-dom";
import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function DogDetail() {
  const [list, setList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}/dogs/${id}`)
      .then((res) => setList(res.data))
      .catch((err) => {
        console.warn(err.response.data.error);
      });
  }, []);
  return (
    <Center py={6} bg="#053229" width="100vw" height="100vh">
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "540px" }}
        height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow="2xl"
        padding={4}
      >
        <Flex flex={1} bg="blue.200">
          <Image objectFit="cover" boxSize="100%" src={list.image} />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Heading fontSize="2xl" fontFamily="body">
            {list.name}
          </Heading>
          <Text fontWeight={600} color="gray.500" size="sm" mb={4}>
            {list.age} ans
          </Text>
          <Text
            textAlign="center"
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            <p> {list.race} </p>
            <p>
              Adepte des grandes balades et amateur de grand cru. Ce chien est
              une vraie perle besoin fort d'exercice, mon rêve : qu'il apprennne
              à me ramener une bière
            </p>
          </Text>

          <Stack
            width="100%"
            mt="2rem"
            direction="row"
            padding={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              flex={1}
              fontSize="sm"
              rounded="full"
              _focus={{
                bg: "gray.200",
              }}
            >
              Compétences
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}

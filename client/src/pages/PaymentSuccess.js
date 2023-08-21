import React from "react";
import { Box, Heading, Text, VStack, useQuery } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
    const searchQuary = useSearchParams()[0];
   const refNum = searchQuary.get("reference")
  return (
    <Box h='100vh' justifyContent='center'>
      <VStack>
        <Heading textTransform='uppercase'>Order Successfull</Heading>
        <Text> Reference No. {refNum} </Text>
      </VStack>
    </Box>
  );
};

export default PaymentSuccess;

import React from 'react'
import { MdTimer, } from "react-icons/md";

import {
  Box,
  Flex,
  Icon,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";


export default function ProductCard({ title,
  title_icon,
  des,
  small_icon,
  small_text, }) {

  let boxBg = useColorModeValue("white !important", "#111c44 !important");
  let secondaryBg = useColorModeValue("gray.50", "whiteAlpha.100");
  let mainText = useColorModeValue("gray.800", "white");
  let iconBox = useColorModeValue("gray.100", "whiteAlpha.200");
  let iconColor = useColorModeValue("brand.200", "white");

  if (!des) {
    des = "You have the opportunity to play this game of life you need to appreciate every moment."
  }

  return (
    <Flex
      borderRadius='20px'
      bg={boxBg}
      // h='300px'
      // w='310px'
      my="15px"
      direction='column'>
      <Box p='20px'>
        <Flex w='100%' mb='10px'>
          <Image src={title_icon ? title_icon : 'https://i.ibb.co/ZWxRPRq/Venus-Logo.png'} w="60px" h="60px" me='auto' />
        </Flex>
        <Box>
          <Text fontWeight='600' color={mainText} w='100%' fontSize='2xl'>
            {title ?? "Tilte is Not Given"}

          </Text>

        </Box>
      </Box>
      <Flex
        bg={secondaryBg}
        w='100%'
        p='20px'
        borderBottomLeftRadius='inherit'
        borderBottomRightRadius='inherit'
        height='100%'
        gap="30px"
        direction='column'>
        <Text
          fontSize='sm'
          color='gray.500'
          lineHeight='24px'
          pe='40px'
          fontWeight='500'
          maxW="32ch"

          noOfLines={3}
          overflow="hidden"
          mb='auto'>

          {
            des ? des : "You have the opportunity to play this game of life you need to appreciate every moment."
          }


        </Text>
        <Flex>
          <Flex me='25px'>
            {small_icon ?
              <Image src={small_icon} w="20px" h="20px" me='6px' color='green.400' />
              :

              <Icon as={MdTimer} w='20px' h='20px' me='6px' color='green.400' />}
            <Text color={mainText} fontSize='sm' my='auto' fontWeight='500'>
              {small_text ?? "85 mins"}
            </Text>
          </Flex>

        </Flex>

        {/* 
        <p style={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden"
        }}> */}
        {/* {des} */}
        {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. */}
        {/* </p> */}


      </Flex>
    </Flex>
  )
}

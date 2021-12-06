import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

import DefaultImage from "../assets/images/house.jpg";

import millify from "millify";

const Property = ({
  property: {
    coverPhoto,
    price,
    rooms,
    rentFrequency,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => {
  return (
    <>
      <Link passHref href={`/property/${externalID}`}>
        <Flex
          flexWrap="wrap"
          cursor="pointer"
          w="420px"
          p="5"
          paddingTop="0"
          justifyContent="flex-start"
        >
          <Box>
            <Image
              src={coverPhoto ? coverPhoto.url : DefaultImage}
              width={400}
              height={260}
              alt="House"
            />
          </Box>
          <Box w="full">
            <Flex
              paddingTop="2"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex alignItems="center">
                <Box paddingRight="3" color="green.400">
                  {isVerified && <GoVerified />}
                </Box>
                <Text fontWeight="bold" fontSize="large">
                  AED {millify(price)} {rentFrequency && `/${rentFrequency}`}
                </Text>
              </Flex>
              <Box>
                <Avatar size="sm" src={agency?.logo?.url} />
              </Box>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              w="250px"
              p="1"
              color="blue.400"
            >
              {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
              <BsGridFill />
            </Flex>

            <Text fontSize="lg">
              {title.length > 30 ? `${title.substring(0, 30)}...` : title}
            </Text>
          </Box>
        </Flex>
      </Link>
    </>
  );
};

export default Property;

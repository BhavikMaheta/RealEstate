import React, { useState } from "react";

import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "../components/SearchFilters";
import Property from "../components/Property";
import NoResult from "../assets/images/noresult.svg";
import Image from "next/image";
import { baseUrl, fetchApi } from "../utils/fetchApi";

const search = ({properties}) => {
  const [searchFilters, setSearchFilters] = useState(false);

  const router = useRouter();

  return (
    <>
      <Box>
        <Flex
          cursor="pointer"
          bg="gray.100"
          borderBottom="1px"
          borderColor="gray.200"
          fontWeight="black"
          justifyContent="center"
          p="2"
          alignItems="center"
          fontSize="lg"
          onClick={() => setSearchFilters((prev) => !prev)}
        >
          <Text>Search Property By Filters</Text>
          <Icon w="7" paddingLeft="2" as={BsFilter} />
        </Flex>
        {searchFilters && <SearchFilters />}
        <Text fontSize="2xl" padding="4" fontWeight="bold">
          Properties  {router.query.purpose}
        </Text>
        <Flex flexWrap="wrap">
          {properties.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </Flex>
        {properties.length === 0 && (
          <Flex
            justifyContent="center"
            alignItems="center"
            marginTop="5"
            flexDirection="column"
            marginBottom="5"
          >
            <Image alt="No Result" src={NoResult} />
            <Text fontSize="2xl" marginTop="3">
              No Result Found
            </Text>
          </Flex>
        )}
      </Box>
    </>
  );
};

export default search;



export async function getServerSideProps({ query }) {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

  return {
    props: {
      properties: data?.hits,
    },
  };
}




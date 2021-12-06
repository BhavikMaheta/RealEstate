import Link from "next/link";
import Image from "next/image";

import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import Property from "../components/Property";

const Banner = ({
  purpose,
  desc1,
  desc2,
  title1,
  title2,
  imageUrl,
  buttonText,
  linkName,
}) => (
  <Flex flexwrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner" />
    <Box p="5">
      <Text color="gray.500" fontWeight="medium" fontSize="sm">
        {purpose}
      </Text>
      <Text fontWeight="bold" fontSize="3xl">
        {title1} <br /> {title2}
      </Text>
      <Text color="gray.700" fontSize="lg" paddingTop="3" paddingBottom="3">
        {desc1} <br /> {desc2}
      </Text>
      <Button fontSize="xl">
        <Link href={linkName} passHref>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

export default function Home({ propertiesForSale, propertiesForRent }) {
  // console.log(propertiesForSale,propertiesForRent);
  return (
    <>
      <Box>
        <Banner
          purpose="Rent A Home"
          title1="Rental Homes For"
          title2="Everyone"
          desc1="Explore Apartments,villas,Homes"
          desc2="and more"
          buttonText="Explore Renting"
          linkName="/search?purpose=for-rent"
          imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
        />
        <Flex flexWrap="wrap">
          {/* fetching property  and Map over them  rent a home*/}
          {propertiesForRent.map((property) => (
            <Property key={property.id} property={property} />
          ))}
        </Flex>
        <Banner
          purpose="for Sale"
          title1="Find,Buy & own your"
          title2="Dream Home"
          desc1="Explore Apartments,villas,Homes"
          desc2="and more"
          buttonText="Explore Buying"
          linkName="/search?purpose=for-sale"
          imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
        />
        <Flex flexWrap="wrap">
          {/* fetching property  and Map over them  buy home */}
          {propertiesForSale.map((property) => (
            <Property key={property.id} property={property} />
          ))}
        </Flex>
      </Box>
    </>
  );
}
export const getStaticProps = async () => {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
};

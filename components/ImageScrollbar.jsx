import React, { useContext } from "react";
import { Box, Icon, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Box justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={FaArrowCircleLeft}
        onClick={() => scrollPrev()}
        fontSize="2xl"
        cursor="pointer"
        d={['none','none','none','block']}
      />
    </Box>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Box justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={FaArrowCircleRight}
        onClick= {() =>scrollNext()}
        fontSize="2xl"
        cursor="pointer"
        d={['none','none','none','block']}
      />
    </Box>
  );
};
const ImageScrollbar = ({ data }) => {
  return (
    <>
      <ScrollMenu
        style={{ overflow: "hidden" }}
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
      >
        {data.map((item) => (
          <Box
            width="910px"
            overflow="hidden"
            p="1"
            itemID={item.id}
            key={item.id}
          >
            <Image
              placeholder="blur"
              blurDataURL={item.url}
              width={1000}
              height={500}
              src={item.url}
              alt="Property"
              sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
            />
          </Box>
        ))}
      </ScrollMenu>
    </>
  );
};

export default ImageScrollbar;

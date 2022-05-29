import { Icon } from '@chakra-ui/react';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import React from 'react';

interface Props {
	fill: boolean;
}

const RatingButton: React.FC<Props> = ({ fill }) =>
	fill ? (
		<Icon as={IoMdStar} w={{base:4,sm:4,md:6,lg:6}} h={{base:4,sm:4,md:6,lg:6}}  />
	) : (
		<Icon as={IoMdStarOutline} w={{base:4,sm:4,md:6,lg:6}} h={{base:4,sm:4,md:6,lg:6}}  />
	);

export default RatingButton;
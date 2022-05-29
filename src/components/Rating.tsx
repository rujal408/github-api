import { Stack } from '@chakra-ui/react';
import React, { ReactNode } from 'react'
import RatingButton from './RatingButton';

interface Props{
    rating:number;
}

const Rating: React.FC<Props> = ({rating}) => {
    const buttons:ReactNode[]=[];

    for (let i = 1; i <= 5; i++) {
		buttons.push(
			<RatingButton key={i} fill={i <= rating} />
		);
	}

  return (
    <Stack direction="row">
      {buttons}
    </Stack>
  )
}

export default Rating;
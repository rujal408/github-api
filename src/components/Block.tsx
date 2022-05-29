import { Badge, Box, Icon, Image, Stack, Text } from '@chakra-ui/react'
import {AiFillEye,AiOutlineFork} from 'react-icons/ai'
import React from 'react'
import Rating from './Rating';
import { convertDate } from '../utils/date';

interface Props{
    block:GitHubRepository;
    onClick:()=>void;
}

const Block: React.FC<Props> = (props) =>(
    <Box 
        onClick={props.onClick} cursor='pointer'
        bg="#ededed" 
        flex="40%"
        maxWidth={{base:"100%",sm:"100%",md:"50%",lg:"50%"}}
        h="180px"
        minH="160px"
        mt="0 !important" 
        borderRadius="5px"
        position="relative"
        _hover={{background:'#bfb5b5ed'}} 
        p="10px">
        <Stack display="flex" flexDirection="column" alignItems="center">
            <Badge  bg="white" p="5px">
                {props.block.name}
            </Badge>
            <Rating rating={props.block.stargazers_count} />
        </Stack>
        <Stack display="flex" gap="2" flexDirection="row" alignItems="center" justifyContent="center">
            <Image 
                src={props.block.owner.avatar_url} 
                height="22px" 
                width="22px"
                borderRadius="50%" />
            <Text color="#1100ffc9">
                @{props.block.owner.login}
            </Text>
        </Stack>
        <Stack>
        <Text p="5px" fontSize={12} textAlign="center" noOfLines={1}>
            {props.block.description}
        </Text>
        </Stack>
        <Stack 
            width="95%" 
            direction="row" 
            display="flex" 
            justifyContent="space-between" 
            position="absolute" 
            bottom="0">
            <Stack display="flex" direction="row" alignItems="center">
                <Icon as={AiFillEye}  h={8} w={8} />
                <Text>{props.block.watchers_count}</Text>
            </Stack>
            <Stack display="flex" direction="row" alignItems="center">
                <Icon as={AiOutlineFork}  h={8} w={8} />
                <Text>{props.block.forks_count}</Text>
            </Stack>
           </Stack>
        <Text textAlign="center" fontSize="10">
            Updated At : {convertDate(props.block.updated_at)}
        </Text>
    </Box>
  )

export default Block;
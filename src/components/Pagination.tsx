import { ListItem, Select, Stack, UnorderedList } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react'

interface Props{
    totalPosts:number;
    postsPerPage:number;
    paginate:(n:number)=>void
    setPostPerPage:(n:number)=>void;
    currentPage:number;
}

const Pagination:React.FC<Props> = (props) => {
    const {totalPosts, postsPerPage, paginate, currentPage} = props
    const pageNumbers:number[] = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Stack 
            direction="row" 
            alignItems="center" 
            display="flex" 
            spacing="4"
            flexWrap="wrap"
            justifyContent="center">
            <UnorderedList listStyleType='none' flex="50%">
                {pageNumbers.map(x=>(
                    <ListItem 
                        key={x} 
                        display="inline" 
                        p="8px 21px" 
                        bg={currentPage===x?"#d78080":"#836464" }
                        border="1px solid #bf9ab2cc"
                        onClick={()=>paginate(x)}
                        _hover={{cursor:'pointer'}}
                    >
                        {x}
                    </ListItem>
                ))}
            </UnorderedList>
            <Select
                flex="50%"
                float="right"
                onChange={(e:ChangeEvent<HTMLSelectElement>)=>{
                    props.setPostPerPage(Number(e.target.value))
                }}
                w="120px"
                minW="100px"
                maxW="120px"
                value={postsPerPage}
            >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </Select>
        </Stack>
        
    )
}

export default Pagination;
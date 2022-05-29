import { ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react'

interface Props{
    totalPosts:number;
    postsPerPage:number;
    paginate:(n:number)=>void
}

const Pagination:React.FC<Props> = (props) => {
    const {totalPosts, postsPerPage, paginate} = props
    const pageNumbers:number[] = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <UnorderedList listStyleType='none'>
            {pageNumbers.map(x=>(
                <ListItem 
                    key={x} 
                    display="inline" 
                    p="8px 21px" 
                    bg="#836464" 
                    border="1px solid #bf9ab2cc"
                    onClick={()=>paginate(x)}
                    _hover={{cursor:'pointer'}}
                >
                    {x}
                </ListItem>
            ))}
        </UnorderedList>
    )
}

export default Pagination;
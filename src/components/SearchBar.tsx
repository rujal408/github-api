import { Input, Select, Stack, Text } from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'
import { Sort } from '../App';
import Block from './Block';
import Pagination from './Pagination';

interface Props{
    searchRepository:(v:string)=>void
    data:GitHubRepository[];
    error:string;
    onClick:(repo:GitHubRepository)=>void
    fetchSortedData:(sort:Sort)=>void
}

const SearchBar: React.FC<Props> =(props) => {
    const [sort, setSort] = useState<Sort>({order:"asc",sort_by:"full_name"})
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postsPerPage] = useState<number>(4)

    // Get current data
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = props.data.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber:number) => setCurrentPage(pageNumber);


    // Sorting Data
    const handleSort=(e:any, key:string)=>{
        const newSort = {...sort, [key]:e.target.value}
        setSort(newSort)
        props.fetchSortedData(newSort)
    }

    return (
        <Stack 
            flex="1.5"
            position="relative"
            p="5" 
            display="flex" 
            flexDirection="column" 
            spacing="4"
        >
                <Input 
                    placeholder="Username" 
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                        props.searchRepository(e.target.value)
                    }}
                    _placeholder={{ color: 'white' }}
                    borderColor="black"
                />
            {/* List Repos in Block */}
            {props.error===""?
            <>
            {/* Sort and Pagination If Data Available */}
                {currentPosts.length>0 && 
                    <Stack 
                        display="flex" 
                        flexDirection="row"
                        alignItems="center"
                        gap="4"
                        >
                        <Select 
                            placeholder='Sort by' 
                            onChange={(e:any)=>handleSort(e,'sort_by')}>
                            <option value="full_name">Full Name</option>
                            <option value="updated">Updated</option>
                            <option value="pushed">Pushed</option>
                            <option value="created">Created</option>
                        </Select>
                        <Select 
                            placeholder='Order by' 
                            mt="0px !important" 
                            onChange={(e:any)=>handleSort(e,'order')}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Decending</option>
                        </Select>
                    </Stack>
                }
                <Stack 
                    display="flex" 
                    gap="1" 
                    flexDirection="row" 
                    alignItems="center" 
                    flexWrap="wrap" 
                    w="100%"
                >
                    {currentPosts.map(x=>(
                        <Block key={x.id} block={x} onClick={()=>props.onClick(x)} />
                    ))}
                </Stack>
                <Stack 
                    display="flex" 
                    flexDirection="row" 
                    justifyContent="center" 
                    position="absolute" 
                    bottom="100px"
                    left="200px"
                >
                    <Pagination 
                        totalPosts={props.data.length} 
                        postsPerPage={postsPerPage} 
                        paginate={paginate} 
                    />
                </Stack>
            </>
            :
            <Text>{props.error}</Text>}
            
        </Stack>
    )
}


export default SearchBar;
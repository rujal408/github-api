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
    const [postsPerPage, setPostsPerPage] = useState<number>(10)

    // Get current data
    const startIndex = currentPage * postsPerPage - postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = props.data.slice(startIndex, endIndex);
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
                {currentPosts.length>0 ? 
                    <>
                        <Stack 
                            display="flex" 
                            flexDirection="row"
                            alignItems="center"
                            gap="4"
                            >
                            <Select 
                                value={sort.sort_by}
                                onChange={(e:any)=>handleSort(e,'sort_by')}>
                                <option value="full_name">Full Name</option>
                                <option value="updated">Updated</option>
                                <option value="pushed">Pushed</option>
                                <option value="created">Created</option>
                            </Select>
                            <Select 
                                mt="0px !important"
                                value={sort.order} 
                                onChange={(e:any)=>handleSort(e,'order')}>
                                <option value="asc">Ascending</option>
                                <option value="desc">Decending</option>
                            </Select>
                        </Stack>
                        <Pagination 
                            totalPosts={props.data.length} 
                            postsPerPage={postsPerPage} 
                            paginate={paginate}
                            setPostPerPage={(p:number)=>{
                                setPostsPerPage(p)
                                setCurrentPage(1)
                            }}
                            currentPage={currentPage}
                        />
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
                    </>
                    : null
                }
                
            </>
            :
            <Text>{props.error}</Text>}
            
        </Stack>
    )
}


export default SearchBar;
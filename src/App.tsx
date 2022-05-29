import { Box,  Container, Stack } from '@chakra-ui/react';
import React, {  useCallback, useState } from 'react';
import SearchBar from './components/SearchBar';
import RepoDetails from './components/RepoDetails';
import axiosRequest from './utils/axiosRequest';
import debounce from './utils/debounce';

export interface Sort{
  order:"asc"|"desc";
  sort_by:string
}


const  App:React.FC=()=> {
  const [data, setData] = useState<GitHubRepository[]>([])
  const [repoDetail, setRepoDetail]=useState<GitHubRepository>({} as GitHubRepository)
  const [error, setError]=useState<string>('')
  const [username, setUserName]=useState<string>('')

  const fetchData=(
    user:string,
    sort:Sort={order:'asc',sort_by:"full_name"}
    )=>{
      axiosRequest.get(`/users/${user}/repos?sort=${sort.sort_by}&&direction=${sort.order}`)
      .then(res=>{
        setData(res.data)
        setError('')
      }).catch(err=>{
        setError(err.response.data.message)
      })
  }

  const optimizedFunction = (user:string) =>{
   setUserName(user)
   fetchData(user)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchRepository=useCallback(debounce(optimizedFunction),[])

  const handleClick=(repo:GitHubRepository)=>{
      setRepoDetail(repo)
  }


  return (
    <Box minH="100vh" bg="white">
      <Container maxW="container.xl">
        <Box display="flex">
            {/* Search Section */}
           <SearchBar 
            searchRepository={searchRepository}
            fetchSortedData={(srt:Sort)=>fetchData(username,srt)} 
            data={data} 
            error={error} 
            onClick={handleClick} />
            {/* Vertical Border Line */}
           <Stack width="2px" bg="#dbdbdb" minH="100vh"></Stack>
            {/* Repo Detail Section */}
            <RepoDetails repoDetail={repoDetail} />
        </Box>
      </Container>
    </Box>
  );
}

export default App;

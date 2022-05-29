import { Box, Stack, Text } from '@chakra-ui/react'
import React, { useEffect,useState } from 'react'
import axiosRequest from '../utils/axiosRequest';
import { b64DecodeUnicode, bytesToSize } from '../utils/utils';

interface Props{
    repoDetail:GitHubRepository;
}

const RepoDetails: React.FC<Props> = (props) =>  {
    const {repoDetail} = props
    const isNotEmpty:boolean = Object.keys(repoDetail).length > 0
    const [readMeData, setReadMeData] = useState<ReadMe>({} as ReadMe)
    const [loading, setLoading] = useState<boolean>(false)
    const [err, setErr] = useState<string>('')

    useEffect(()=>{
        const fetchReadMe= ()=>{
            setLoading(true)
            axiosRequest.get(`/repos/${repoDetail.owner.login}/${repoDetail.name}/readme`)
            .then(res=>{
                setErr("")
                setReadMeData({
                    name:res.data.name,
                    size:bytesToSize(res.data.size),
                    content:b64DecodeUnicode(res.data.content),
                    sha:res.data.sha,
                    encoding:res.data.encoding
                })
            }).catch(error=>{
                setErr(error.response.data.message)
            }).finally(()=>{
                setLoading(false)
            })
            
        }

        if(isNotEmpty){
            fetchReadMe()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isNotEmpty,repoDetail])

    return (
        <Stack flex="1" p="5">
            <Text fontSize='2xl'>RepoDetails</Text>
            {isNotEmpty && (
                <Stack direction="column" display="flex" spacing="3">
                    <Text>Owner: {repoDetail?.owner.login}</Text>
                    <Text>Repository: {repoDetail?.name}</Text>
                    <Text>No. of open issues: {repoDetail?.open_issues_count}</Text>
                    <Text>Default branch: {repoDetail?.default_branch}</Text>
                    {loading ?
                        <Text>Loading ...</Text>
                    : 
                    <Box 
                        display="flex" 
                        flexDirection="column"
                        p="5px"
                        width="30rem" 
                        bg="#c9afaf" 
                        height="auto">
                        {err==="" ?
                        <>
                            <Text fontSize='2xl' textAlign="center">ReadMe</Text>
                            <Text>Name: {readMeData.name}</Text>
                            <Text>Size: {readMeData.size}</Text>
                            <Text>SHA: {readMeData.sha}</Text>
                            <Text>Content: {readMeData.content}</Text>
                        </>
                        :
                            <Text>{err}</Text>    
                        }
                    </Box>
                    }
                </Stack>
            )}
        </Stack>
    )
}


export default RepoDetails;
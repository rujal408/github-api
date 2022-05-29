type User={
    id:number;
    login:string;
    repos_url:string;
    type:string;
    url:string;
    html_url:string;
    avatar_url:string;
}

type GitHubRepository={
    id: number;
    name: string;
    owner: Owner;
    url: string;
    description:string;
    default_branch:string;
    open_issues_count:number;
    forks_count:number;
    stargazers_count:number;
    watchers_count:number;
    updated_at:string;
}

type ReadMe={
    name:string;
    size:string;
    content:string;
    sha:string;
    encoding:string;
}
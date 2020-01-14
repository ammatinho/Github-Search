import React, { Component } from 'react';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            userRepos: [],
            search: "",
            // message: "User not found",
            
        }
    }

    getUser(username) {
        return fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(response => {
            console.log("here", response)
            return response;
        })
    }

    getUserRepo(username) {
        return fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(response => {
            console.log("here", response[0].name)
            return (response) //get the array of repositories
        })
    }

    async handleSubmit(e) {
        e.preventDefault();

        let user = await this.getUser(this.refs.username.value);

        this.setState({ avatar_url: user.avatar_url,
            username: user.login,
            name: user.name,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            url: user.url
        })

        let repos = await this.getUserRepo(this.refs.username.value);
        this.setState({ 
            userRepos: repos
        })

    }

    render() {
        let user;
        if (this.state.username) {
            user = 
            <div className="badge">
                <img src={this.state.avatar_url}/>
                <p className="userInfo">
                    Username:
                    {this.state.username}
                </p>
                <p className="name">
                    Name: 
                    {this.state.name}
                </p>
                <p className="bio">
                    Bio:
                    {this.state.bio}
                </p>
                <p className="followersInfo">
                    {this.state.followers} Followers
                </p>
                <p className="followingInfo">
                    Following {this.state.following} users
                </p>
                <a href={this.state.url} className="urlInfo">
                    URL {this.state.url} 
                </a>
            </div>
        }

    

        return (
            <div className="main">
                <h3>Github User Search</h3>
                <div className="GithubSearch">
                    <header className="searchHeader">
                        <h4>Type your Username:</h4>
                    </header>
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <input ref="username" type="text" onChange={this.onChange} placeholder="Github Username"/>
                    </form>
                    <p className="searchInfo">
                        { user }
                    </p>

                    <p className="searchRepo">
                        {/* <ul> */}
                            { this.state.userRepos.map((item, index) => (
                                // <li key={ index }>
                                //     {item.name}
                                // </li>
                                <div className="repoResults">
                                    <p className="repoName">
                                        {item.name}
                                    </p>
                                    <p className="repoDescription">
                                        {item.description}
                                    </p>
                                    <p className="repoGit_url">
                                        {item.git_url}
                                    </p>
                                    <p className="repoStargazers_count">
                                        {item.stargazers_count}
                                    </p>
                                    <p className="repoForks_count">
                                        {item.forks_count}
                                    </p>
                                    <p className="repoOpen_issues_count">
                                        {item.open_issues_count}
                                    </p>
                                    <p className="repoSize">
                                        {item.size}
                                    </p>
                                </div>
                            )) }
                        {/* </ul> */}
                    </p>
                </div>
            </div>
        )
    }
}

export default Main
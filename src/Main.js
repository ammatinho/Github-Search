import React, { Component } from 'react';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            userRepo: [],
            search: "",
            // message: "User not found"
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
            // console.log("here", response[0].name)
            // return response;
            return ({userRepo: response}) //get the array of repositories
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

        let repo = await this.getUserRepo(this.refs.username.value);
        this.setState({ name: repo.name,
            description: repo.description,
            git_url: repo.git_url,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            open_issues_count: repo.open_issues_count,
            size: repo.size
        })
        console.log("name:::", )

    }

    // getUsername() {
    //     var input = this.state.search;
    //     var value = input.value;
        
    //     if (!= value) {
    //         return this.setState.user.message
    //     }
    // }

    // onChange = (e) => {
    //     // this.setState({ search: e.target.value });
    //     // let search = e.target.value;

    // }

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

        let repo;
        if (this.state.userRepo) {
            repo = 
            <div className="repoResults">
                <p className="repoName">
                    {this.state.name}
                </p>
                <p className="repoDescription">
                    {this.state.description}
                </p>
                <p className="repoGit_url">
                    {this.state.git_url}
                </p>
                <p className="repoStargazers_count">
                    {this.state.stargazers_count}
                </p>
                <p className="repoForks_count">
                    {this.state.forks_count}
                </p>
                <p className="repoOpen_issues_count">
                    {this.state.open_issues_count}
                </p>
                <p className="repoSize">
                    {this.state.size}
                </p>
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
                        <input ref="username" type="text" placeholder="Github Username"/>
                    </form>
                    <p className="searchInfo">
                        { user }
                    </p>

                    <p className="searchRepo">
                        <ul>
                            { this.state.userRepo.map((item, index) => (
                                <li key={ index }>
                                    {item.name}
                                </li>
                            )) }
                        </ul>
                        
                        {/* { repo } */}

                    </p>
                </div>
            </div>
        )
    }
}

export default Main
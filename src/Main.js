import React, { Component } from 'react';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            userRepo: ""
        }
    }

    getUser(username) {
        return fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(response => {
            return response;
        })
    }

    getUserRepo(username) {
        return fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(response => {
            // console.log("here", response)
            return response;
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
            url: user.url,
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
        console.log("name:::", this.refs)

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
            </div>
        }

        let repo;
        if (this.state.userRepo) {
            repo = 
            <div className="repoResults">
                <p>
                    {this.state.name}
                </p>
            </div>
        }

        return (
            <div className="main">
                <div>Type your Username:</div>
                <div className="GithubSearch">
                    <header className="searchHeader">
                        <h1>Github User Search</h1>
                    </header>
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <input ref="username" type="text" placeholder="Github Username" />
                    </form>
                    <p className="searchInfo">
                        { user }
                    </p>
                    <p>
                        { repo }
                    </p>
                </div>
            </div>
        )
    }
}

export default Main
import './App.css';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import RepoList from './components/RepoList/RepoList';
import Search from './components/Search/Search';
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gitHubUser: [],
      userReposDefault: [],
      userRepos: []
    };

    this.onSearchRepository = this.onSearchRepository.bind(this);
  }

  componentDidMount() {
    this.getUsersGitHub();
  }

  /**
   * 1. Fetch GitHub info for user "FerdinandObermeier"
   * 2. After obtaining the data and the url to fetch users repos, fetch all public repos of the respective user
   * 3. Set the repo data to two different state variables. One will act as a default to refer to when searching. The other one acts as actively displayed list of repos.
   */
  getUsersGitHub() {
    fetch('https://api.github.com/users/FerdinandObermeier')
      .then(res => 
        res.json().then(data => {
          this.setState({gitHubUser: data});
          fetch(this.state.gitHubUser.repos_url).then(res => res.json().then(data => {
            this.setState({userReposDefault: data, userRepos: data});
          }));
        }));
  }

  /** 
   * Filter all repos for the search string. 
   * Convert both the repo name and the search string to lowercase to enable case insensitive searching. 
   * Set the state to match the search results. 
   */
  onSearchRepository(searchString) {
    const searchResults = this.state.userReposDefault.filter(repo => repo.name.toLowerCase().includes(searchString.toLowerCase()));

    this.setState({userRepos: searchResults});
  }

  render () {
    return (
      <div className="App">
        <div className="user">
          <Avatar alt="Ferdinand Obermeier" src={this.state.gitHubUser.avatar_url} className="avatar"></Avatar>
          <div className="name">
            <b>{this.state.gitHubUser.name}</b>
            <br></br>
            <span style={{color: 'lightgray'}}>{this.state.gitHubUser.login}</span>
          </div>
        </div>

        <Search onSearch={this.onSearchRepository}></Search>

        <RepoList userRepos={this.state.userRepos}></RepoList>
        
      </div>
    )
  }
}

export default App;

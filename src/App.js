import './App.css';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import RepoList from './components/RepoList/RepoList';
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gitHubUser: [],
      userReposDefault: [],
      userRepos: []
    };
  }

  componentDidMount() {
    this.getUsersGitHub();
  }

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

        <div className="search">
          <TextField
            label="Search for a repository"
            variant="outlined"
            onChange={(e) => this.onSearchRepository(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon></SearchIcon>
                </InputAdornment>
              )
            }}
          >
          </TextField>
        </div>

        <RepoList userRepos={this.state.userRepos}></RepoList>
        
      </div>
    )
  }
}

export default App;

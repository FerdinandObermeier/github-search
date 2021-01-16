import './App.css';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gitHubUser: [],
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
            this.setState({userRepos: data});
          }));
        }));
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
      </div>
    )
  }
}

export default App;

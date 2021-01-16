import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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
            console.log(data);
            this.setState({userRepos: data});
          }));
        }));
  }

  render () {
    return (
      <div className="App">

      </div>
    )
  }
}

export default App;

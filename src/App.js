import './App.css';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';
import ShareIcon from '@material-ui/icons/Share';
import CodeIcon from '@material-ui/icons/Code';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
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

        <div className="cardContainer">
          {this.state.userRepos.map((repo, index) => {
            return (
              <Card className="card">
                <CardHeader
                  avatar={
                    <Avatar aria-label="repo" className="cardAvatar">
                      <CodeIcon></CodeIcon>
                    </Avatar>
                  }
                  title={repo.name}
                  subheader={repo.created_at}
                >
                </CardHeader>
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {repo.description}
                  </Typography>
                  <List>
                    <ListItem key={'language'+index}>
                      <ListItemIcon>
                        <DeveloperModeIcon></DeveloperModeIcon>
                      </ListItemIcon>
                      <ListItemText>
                        {repo.language}
                      </ListItemText>
                    </ListItem>
                    <ListItem key={'size'+index}>
                      <ListItemIcon>
                        <InsertDriveFileIcon></InsertDriveFileIcon>
                      </ListItemIcon>
                      <ListItemText>
                        {repo.size}KB
                      </ListItemText>
                    </ListItem>
                    <ListItem key={'owner'+index}>
                      <ListItemIcon>
                        <FaceIcon></FaceIcon>
                      </ListItemIcon>
                      <ListItemText>
                        {repo.owner.login}
                      </ListItemText>
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon></FavoriteBorderIcon>
                  </IconButton>
                  <IconButton aria-label="share repo">
                    <ShareIcon></ShareIcon>
                  </IconButton>
                </CardActions>
              </Card>
            )
          })}
        </div>
        
      </div>
    )
  }
}

export default App;

import './Search.css';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

function Search(props) {
    /** Display a textfield which filters the displayed list of repositories for the entered string by using a callback of the parent (App.js). */
    return (
        <div className="search">
          <TextField
            label="Search for a repository"
            variant="outlined"
            onChange={(e) => props.onSearch(e.target.value)}
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
    )
}

export default Search;
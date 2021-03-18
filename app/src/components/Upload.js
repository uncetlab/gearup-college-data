import React from 'react';
import '../Upload.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          csvPath: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({csvPath: event.target.value});
        // console.log(this.state.csvPath);
      }
    
      handleSubmit(event) {
        alert('here');
        event.preventDefault();
        console.log(this.state.csvPath);
      }

    render() {
        return (
            <div className="upload">
                <Grid container spacing={0}>
                    <Grid item xs={8}>
                        <TextField
                        required
                        id="outlined-required"
                        label="Upload file"
                        variant="outlined"
                        fullWidth={true}
                        value={this.state.value}
                        onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <form onSubmit={this.handleSubmit}>
                            <Button variant="contained" type="submit" >Upload</Button>
                        </form>
                    </Grid>
                    
                    
                </Grid>
                
            </div>
            
            
        );
    }
}

export default Upload;
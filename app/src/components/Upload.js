import React from 'react';
import '../Upload.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Upload extends React.Component {
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
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained">Upload</Button>
                    </Grid>
                    
                    
                </Grid>
                
            </div>
            
            
        );
    }
}

export default Upload;
import React, { useEffect, useState } from 'react';
import '../Upload.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Upload = props => {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setSelectedFile(true);
    }

    const handleSubmission = () => {
        console.log(selectedFile);
    }

    return (
        <div className="upload">
            <Grid container spacing={0}>
                <Grid item xs={8}>
                </Grid>
                <Grid item xs={4}>
                    <input type="file" name="file" onChange={changeHandler} />
                    <Button variant="contained" type="submit" onClick={handleSubmission}>
                        Submit
                    </Button>
                </Grid>
                
                
            </Grid>
            
        </div>
        
        
    );
};

export default Upload;
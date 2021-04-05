import React from 'react'
import './App.css'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
// import InputLabel from '@material-ui/core/InputLabel'
// import Input from '@material-ui/core/Input'
// import FormHelperText from '@material-ui/core/FormHelperText'

const getDirectory = (event) => {
  let files = event.target.files

  for (let i=0; i<files.length; i++) {
    files.push(files[i].webkitRelativePath)
  }
  console.log(files)
}

function App() {
    return (
      <div className="main-container">
      <Grid container spacing={3}>
        {/* PAGE HEADER */}
        <Grid className="banner" item xs={12}>
          <h1 className="page-title">Update GEAR UP Colleges Data</h1>
          <p className="page-info">Navigate to each file below to update the college info. The clear button clears the page, so proceed with caution.</p>
        </Grid>
        {/* Select Directory */}
        <Grid item xs={12}>
          <h2 className="add-margin">Select Directory</h2>
          <h3 className="add-margin">Should include files UX_INS, UG_ENROLL, UG_ENTR_EXAMS, UG_EXPENSE_ASGNS</h3>
          <p className="add-margin">Navigate to the UX_INS.csv file to update the college info.</p>

          <FormControl className="add-margin">
            <input type="file" webkitdirectory="" directory="" onClick={getDirectory}></input>
          </FormControl>
          
        </Grid>

        

      
      </Grid>
    </div>
    );
};

export default App;

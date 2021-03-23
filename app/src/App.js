import React, { Component } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Upload from './components/Upload';

function App() {
    return (
      <div className="main-container">
      <Grid container spacing={3}>
        {/* PAGE HEADER */}
        <Grid className="banner" item xs={12}>
          <h1 className="page-title">Update GEAR UP Colleges Data</h1>
          <p className="page-info">Navigate to each file below to update the college info. The clear button clears the page, so proceed with caution.</p>
        </Grid>
        {/* UPLOAD UX_INS FILE */}
        <Grid item xs={12}>
          <h2 className="add-margin">Update UX_INS:</h2>
          <p className="add-margin">Navigate to the UX_INS.csv file to update the college info.</p>
          <Upload />
        </Grid>

        {/* UPLOAD UG_ENROLL */}
        <Grid item xs={12}>
          <h2 className="add-margin">Update UG_ENROLL:</h2>
          <p className="add-margin">Navigate to the UG_ENROLL.csv file to update the college enrollment.</p>
          <Upload />
        </Grid>

        {/* UPLOAD UG_ENTR_EXAMS */}
        <Grid item xs={12}>
          <h2 className="add-margin">Update UG_ENTR_EXAMS:</h2>
          <p className="add-margin">Navigate to the UG_ENTR_EXAMS.csv file to update the college entry exam scores.</p>
          <Upload />
        </Grid>

        {/* UPLOAD UG_EXPENSE_ASGNS */}
        <Grid item xs={12}>
          <h2 className="add-margin">Update UG_EXPENSE_ASGNS:</h2>
          <p className="add-margin">Navigate to the UG_EXPENSE_ASGNS.csv file to update the college in-state and out-of-state tuition.</p>
          <Upload />
        </Grid>

        {/* UPLOAD UG_ACAD_PROG_TYPES */}
        <Grid item xs={12}>
          <h2 className="add-margin">Update UG_ACAD_PROG_TYPES:</h2>
          <p className="add-margin">Navigate to the UG_ACAD_PROG_TYPES.csv file to update the college in-state and out-of-state tuition.</p>
          <Upload />
        </Grid>
      </Grid>
    </div>
    );
};

export default App;

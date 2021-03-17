import './App.css';
import Grid from '@material-ui/core/Grid';

function App() {
  return (
    <div className="main-container">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1 className="page-title">Update GEAR UP Colleges Data</h1>
          <p className="page-info">Navigate to each file below to update the college info. The clear button clears the page, so proceed with caution.</p>
        </Grid>
        <Grid item xs={12}>
          <h2>Update UX_INS:</h2>
          <p>Navigate to the UX_INS.csv file to update the college info.</p>
          
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

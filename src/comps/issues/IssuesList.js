import React from 'react';
import { Button, Grid, TextField, FormControlLabel, Switch, useMediaQuery } from '@material-ui/core';
import Issue from './Issue';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import Fuse from 'fuse.js';
import { useState, useEffect } from 'react';
import Loading from '../Loading';
import './issueList.css';

export default function IssuesList() {

  const isDesktop = useMediaQuery('(min-width:900px)');
  const storedata = useSelector(state => state.handler.list);
  const isLoading = useSelector(state => state.handler.isLoading);

  //combining redux state n localstate - https://stackoverflow.com/questions/57010278/how-can-we-use-redux-state-in-usestate-to-set-initial-values
  useEffect(() => {
    if (storedata) {
      setdata(storedata);
    }
  }, [storedata])

  const [data, setdata] = useState(storedata ? { storedata } : {});

  const handleSearch = (event) => {

    event.preventDefault();
    let query = event.target.query.value;

    //fuse search - https://blog.bitsrc.io/add-a-simple-search-function-to-react-app-without-a-server-22deda8966cd
    const fuse = new Fuse(storedata, {
      keys: ["desc", "severity", "status"],
    });
    const result = fuse.search(query);
    console.log(result);

    const matches = [];
    if (!result.length) {
      setdata([]);
    } else {
      result.forEach(({ item }) => {
        matches.push(item);
      });
      setdata(matches);
    }

    //show back button
    document.getElementById('backbtn').style = { display: 'display' }
  }

  const goback = () => {
    //hide back button
    document.getElementById('backbtn').setAttribute("style", "display:none") //https://stackoverflow.com/questions/18996368/how-to-make-disappear-a-button-in-html/18996660#:~:text=4%20Answers&text=you%20must%20specify%20whether%20you,will%20be%20removed%20from%20page.
    setdata(storedata);
    console.log(document.getElementsByClassName('TextField'));
  }

  const [state, setState] = React.useState({
    severitySwitch: true,
    statusSwitch: true,
    descSwitch: true,
    cdateSwitch: true,
    rdateSwitch: true,
    creatorSwitch: true
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const renderMobileFilters = (
    <Grid container direction="column" justify="space-around" alignItems="center" spacing={1} style={{ marginBottom: '1em' }}>

      <Grid item xs={12}>
        <h3 style={{ fontWeight: '500', margin: '0px' }}>Filters</h3>
      </Grid>

      <Grid container style={{ marginBottom: '1em' }}>

        <Grid className='switch' container xs={6} sm={4}>
          Description<Switch checked={state.descSwitch} name="descSwitch" color='primary' onChange={handleChange} />
        </Grid>

        <Grid className='switch' container xs={6} sm={4}>
          Severity<Switch checked={state.severitySwitch} name="severitySwitch" color='primary' onChange={handleChange} />
        </Grid>

        <Grid className='switch' container xs={6} sm={4}>
          Status<Switch checked={state.statusSwitch} name="statusSwitch" color='primary' onChange={handleChange} />
        </Grid>

        <Grid className='switch' container xs={6} sm={4}>
          Creator<Switch checked={state.creatorSwitch} name="creatorSwitch" color='primary' onChange={handleChange} />
        </Grid>
        
        <Grid className='switch' container xs={6} sm={4}>
          Created<Switch checked={state.cdateSwitch} name="cdateSwitch" color='primary' onChange={handleChange} />
        </Grid>

        <Grid className='switch' container xs={6} sm={4}>
          Closed<Switch checked={state.rdateSwitch} name="rdateSwitch" color='primary' onChange={handleChange} />
        </Grid>
      </Grid>

      <Grid container justify='space-around'>
        <Grid item id='backbtn' style={{ display: 'none' }}>
          <Button  variant='outlined' onClick={() => goback()}>Back</Button>
        </Grid>
        <Grid item>
          <form onSubmit={handleSearch}>
            <TextField variant='outlined' label='Search' size='small' name='query' />
          </form>
        </Grid>

        <Grid item>
          <Button variant='contained' color='primary'>
            <NavLink exact activeClassName="active" to="/addIssue" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>Add Issue</NavLink>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )

  const renderFilters = (
    <Grid container direction="row" justify="space-between" alignItems="center" spacing={1} style={{ marginBottom: '1em' }}>

      <Grid item xs={12} md={1}>
        <h3 style={{ fontWeight: '500' }}>Filters</h3>
      </Grid>

      <Grid item xs={6} sm={4} md={1}>
        <FormControlLabel control={<Switch checked={state.descSwitch} name="descSwitch" color='primary' onChange={handleChange} />}
          label="Description" />
      </Grid>

      <Grid item xs={6} sm={4} md={1}>
        <FormControlLabel control={<Switch checked={state.severitySwitch} name="severitySwitch" color='primary' onChange={handleChange} />}
          label="Severity" />
      </Grid>

      <Grid item xs={6} sm={4} md={1}>
        <FormControlLabel control={<Switch checked={state.statusSwitch} name="statusSwitch" color='primary' onChange={handleChange} />}
          label="Status" />
      </Grid>

      <Grid item xs={6} sm={4} md={1}>
        <FormControlLabel control={<Switch checked={state.creatorSwitch} name="creatorSwitch" color='primary' onChange={handleChange} />}
          label="Creator" />
      </Grid>

      <Grid item xs={6} sm={4} md={1}>
        <FormControlLabel control={<Switch checked={state.cdateSwitch} name="cdateSwitch" color='primary' onChange={handleChange} />}
          label="Created" />
      </Grid>

      <Grid item xs={6} sm={4} md={1}>
        <FormControlLabel control={<Switch checked={state.rdateSwitch} name="rdateSwitch" color='primary' onChange={handleChange} />}
          label="Closed" />
      </Grid>

      <Button id='backbtn' style={{ display: 'none' }} variant='outlined' onClick={() => goback()}>Back</Button>
      <form onSubmit={handleSearch}>
        <TextField variant='outlined' label='Search' size='small' name='query' />
      </form>

      <Button variant='contained' color='primary'>
        <NavLink exact activeClassName="active" to="/addIssue" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>Add Issue</NavLink>
      </Button>
    </Grid>
  )

  const renderList = (
    <Grid container justify='center' spacing={2}>
      {data !== undefined && data.length > 0 ? data.map((row) => (
        <Issue key={row.id} issue={row} displayProps={{ ...state }} />
      )) : <p>No Issues</p>}
    </Grid>
  )

  return (
    <>
      {isDesktop? renderFilters : renderMobileFilters}
      {isLoading ? <Loading /> : renderList}
    </>
  );
}
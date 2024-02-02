import React, {useState} from 'react';
import {TextField,Button,Grid } from '@mui/material';
import axios from 'axios';

const EmailForm =()=>{
  const [name, setName] =useState('');
  const [email, setEmail] =useState('');

  const handleSubmit=async (e)=>{
    e.preventDefault();

    try{
      //send the form data to the backend
      await axios.post('http://localhost:3001/api/sendEmail', {name,email});
      alert('Email sent successfully!');
    } catch(error){
      console.error(error);
      alert('Failed to send email.');
    }

    //clear the form fields
    setName('');
    setEmail('');
  };

  return(
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EmailForm;
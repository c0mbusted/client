import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux'; 

import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles';
import Input from './Input';

const Auth = () => {
    const classes= useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setisSignup] = useState(false); //this we use inside of swtichmode function
    const dispatch = useDispatch();


    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);



    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const switchMode = () => {
        setisSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    };

   

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>

                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                </Grid>
                
                <GoogleLogin className={classes.googleButton} 
                    onSuccess={res => {
                        const result = res?.profileObj;
                        const token = res?.tokenId;

                        try {
                            dispatch({ type: 'AUTH', data: { result, token }});
                        } catch (error) {
                            console.log(error);
                        }

                    }}
                    onError={(error) => {
                        console.log(error);
                    }}

                />
                

                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  );
}

export default Auth;
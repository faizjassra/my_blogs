import * as React from 'react';
// {import Box from '@mui/material/Box';}
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from './firebase'
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [Email, setEmail] = useState("");


    const handlesubmit = async (e) => {
        e.preventDefault()
        await sendPasswordResetEmail(auth, Email)
            .then(() => {
                alert("email send succesfully")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("ERROR:" + errorMessage)
            });
    }

    return (
        <div className='container'>
            <Card component="form" onSubmit={(e) => handlesubmit(e)} sx={{ maxWidth: 500 }}>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Password Reset
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Please enter your email address to send reset password email.
                    </Typography>
                    <TextField
                        type="email"
                        id="email"
                        sx={{ mt: 2 }}

                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        placeholder="Enter Email"
                        size="small"
                        fullWidth
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}

                    />

                </CardContent>
                <CardActions className='left'>
                    <Button sx={{ padding: 1, marginBottom: 2 }} type='button' variant="contained" size="small" onClick={() => navigate(-1)}>Cancel</Button>
                    <Button sx={{ padding: 1, marginBottom: 2 }} type='button ' variant="contained" size="small">Send Email</Button>
                </CardActions>
            </Card>
        </div>
    )
};

export default ForgotPassword;

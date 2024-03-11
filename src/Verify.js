import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { sendEmailVerification } from "firebase/auth";
import { auth } from './firebase'
import { Link } from 'react-router-dom';
export default function Verify() {
    const handleResend = async () => {

        await sendEmailVerification(auth.currentUser)
            .then(() => {
                // Email verification sent!
                alert("Verification email has been resent.")

            });
    }
    return (
        <div className='container'>
            <Card sx={{ maxWidth: 500 }}>

                <CardContent>
                    <div className='center'>
                        <Typography gutterBottom variant="h6" sx={{ fontWeight: 'light' }} component="div">
                            Verify Your Email
                        </Typography>
                        <Typography component='div' color="#90a4ae">
                            <Box fontWeight='fontWeightMedium' display='inline'>
                                check your email & click the link to activate your account
                            </Box>
                        </Typography>

                        <CardMedia
                            sx={{ height: 300, width: 300, }}
                            image="./free-verify-email-1578877-1346696.png"
                            title="green iguana"

                        />
                    </div>
                </CardContent>
                <CardActions >
                    <div className='center1'>
                        <Button variant='outlined' onClick={handleResend}>Resend</Button>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} variant='contained' >
                            <Link style={{ color: "white", textDecoration: "none" }} to="/SignIn">Sign In</Link>
                        </Button>
                    </div>
                </CardActions>
            </Card>
        </div>
    );
}

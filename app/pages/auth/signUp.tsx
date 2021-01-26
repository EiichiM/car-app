import { useState } from 'react';
import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useAuth } from 'lib/useAuth';

const useStyles = makeStyles((theme: Theme) => ({
    buttonBox: {
        display: "flex",
        justifyContent: "flex-end"
    }
}));

export default function SignUp() {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, signUp } = useAuth();

    const onSubmit = async (event) => {
        event.preventDefault();
        signUp(email, password);
    };

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Card >
                    <CardContent>
                        <Box mt={4} mb={2}>
                            <form onSubmit={onSubmit}>
                                {error && <p>{error}</p>}
                                <Typography variant="h4">Sign Up</Typography>
                                <Box pb={2.5} />
                                <TextField
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                    label="Email"
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box pb={2.5} />
                                <TextField
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className="form-control"
                                    label="Password"
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box pb={2.5} className={classes.buttonBox} />
                                <Box className={classes.buttonBox}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        type="submit"
                                    >
                                        Sign Up
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}
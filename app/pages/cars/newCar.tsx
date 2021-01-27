import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAddCarMutation } from 'lib/graphql/mutations/createCar.graphql';
import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    buttonBox: {
        display: "flex",
        justifyContent: "flex-end"
    }
}));

export default function CreateCar() {
    const classes = useStyles();

    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [estimadeDate, setEstimadeDate] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const router = useRouter();

    // Signing In
    const [addCar] = useAddCarMutation();

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addCar({
                variables: { input: { make, model, estimadeDate, description, image } },
            });
            if (data.addCar._id) {
                router.push('/cars');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Card >
                    <CardContent>
                        <Box mt={4} mb={2}>
                            <Typography variant="h4">Create Stream</Typography>
                            <form onSubmit={onSubmit}>
                                <Box pb={2.5} />
                                <TextField
                                    autoFocus
                                    label="Car Make"
                                    value={make}
                                    onChange={(e) => setMake(e.target.value)}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box pb={2.5} />
                                <TextField
                                    autoFocus
                                    label="Car Model"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box pb={2.5} />
                                <TextField
                                    label="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box pb={2.5} />
                                <TextField
                                    label="Estimade date"
                                    value={estimadeDate}
                                    onChange={(e) => setEstimadeDate(e.target.value)}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box pb={2.5} />
                                <TextField
                                    label="Image"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box pb={2.5} />
                                <Box className={classes.buttonBox}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Create Car
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
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { initializeApollo } from 'lib/apollo';
import { useEditCarMutation } from 'lib/graphql/mutations/editCar.graphql';
import { useDeleteCarMutation } from 'lib/graphql/mutations/deleteCar.graphql';
import { CarDocument } from 'lib/graphql/querys/car.graphql';
import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    buttonBox: {
        display: "flex",
        justifyContent: "flex-end"
    }
}));

export default function EditCar({ id }) {
    const classes = useStyles();

    const router = useRouter();
    const [editCar] = useEditCarMutation();
    const [deleteCar] = useDeleteCarMutation();

    const [state, setState] = useState({
        _id: '',
        make: '',
        model: '',
        description: '',
        estimadeDate: '',
        image: '',
    });

    const { _id, make, model, description, estimadeDate, image } = state;

    const fetchCar = async () => {
        const apollo = initializeApollo();
        const { data } = await apollo.query({
            query: CarDocument,
            variables: { streamId: id },
        });
        setState(data.car);
    };

    useEffect(() => {
        fetchCar();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await editCar({
                variables: { input: { id: _id, make, model, description, estimadeDate, image } },
            });
            if (data.editCar._id) {
                router.push('/cars');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const onDelete = async (event) => {
        event.preventDefault();

        try {
            const { data } = await deleteCar({
                variables: { id },
            });
            if (data.deleteCar) {
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
                            <Typography variant="h4">Edit Car</Typography>
                            <form onSubmit={onSubmit}>
                                <Box pb={2.5} />
                                <TextField
                                    autoFocus
                                    label="Car Make"
                                    value={make}
                                    onChange={(e) => setState({ ...state, make: e.target.value })}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box pb={2.5} />
                                <TextField
                                    autoFocus
                                    label="Car Model"
                                    value={model}
                                    onChange={(e) => setState({ ...state, model: e.target.value })}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box pb={2.5} />
                                <TextField
                                    label="Description"
                                    value={description}
                                    onChange={(e) => setState({ ...state, description: e.target.value })}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box pb={2.5} />
                                <TextField
                                    label="Estimade date"
                                    value={estimadeDate}
                                    onChange={(e) => setState({ ...state, estimadeDate: e.target.value })}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box pb={2.5} />
                                <TextField
                                    label="Image"
                                    value={image}
                                    onChange={(e) => setState({ ...state, image: e.target.value })}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box pb={2.5} />
                                <Box className={classes.buttonBox}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Save
                                    </Button>
                                    <Box pb={2.5} />
                                    <Button onClick={onDelete} variant="contained">
                                        Delete
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

EditCar.getInitialProps = ({ query: { id } }) => {
    return { id };
};
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { initializeApollo } from 'lib/apollo';
import { useEditStreamMutation } from 'lib/graphql/mutations/editStream.graphql';
import { useDeleteStreamMutation } from 'lib/graphql/mutations/deleteStream.graphql';
import { StreamDocument } from 'lib/graphql/querys/stream.graphql';
import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    buttonBox: {
        display: "flex",
        justifyContent: "flex-end"
    }
}));

export default function EditStream({ id }) {
    const classes = useStyles();

    const router = useRouter();
    const [editStream] = useEditStreamMutation();
    const [deleteStream] = useDeleteStreamMutation();

    const [state, setState] = useState({
        _id: '',
        title: '',
        description: '',
        url: '',
    });

    const { _id, title, description, url } = state;

    const fetchStream = async () => {
        const apollo = initializeApollo();
        const { data } = await apollo.query({
            query: StreamDocument,
            variables: { streamId: id },
        });
        setState(data.stream);
    };

    useEffect(() => {
        fetchStream();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await editStream({
                variables: { input: { id: _id, title, description, url } },
            });
            if (data.editStream._id) {
                router.push('/streams');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const onDelete = async (event) => {
        event.preventDefault();

        try {
            const { data } = await deleteStream({
                variables: { id },
            });
            if (data.deleteStream) {
                router.push('/streams');
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
                            <Typography variant="h4">Edit Stream</Typography>
                            <form onSubmit={onSubmit}>
                                <Box pb={2.5} />
                                <TextField
                                    autoFocus
                                    label="Title"
                                    value={title}
                                    onChange={(e) => setState({ ...state, title: e.target.value })}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box pb={2.5} />
                                <TextField
                                    label="Description"
                                    value={description}
                                    onChange={(e) =>
                                        setState({ ...state, description: e.target.value })
                                    }
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box pb={2.5} />
                                <TextField
                                    label="URL"
                                    value={url}
                                    onChange={(e) => setState({ ...state, url: e.target.value })}
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

EditStream.getInitialProps = ({ query: { id } }) => {
    return { id };
};
import { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import PostsStream from 'components/PostStream';
import { useStreamsQuery, Stream } from 'lib/graphql/querys/streams.graphql';

export default function Streams() {
    const { data, loading, refetch } = useStreamsQuery({ errorPolicy: 'ignore' });

    useEffect(() => {
        refetch();
    }, []);

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h4">Streams</Typography>
            </Box>
            {!loading && data && data.streams && (
                <PostsStream streams={data.streams as Stream[]} />
            )}
        </Container>
    );
}
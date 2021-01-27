import { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import PostsCars from 'components/PostCar';
import { useCarsQuery, Car } from 'lib/graphql/querys/myCars.graphql';

export default function Cars() {
    const { data, loading, refetch } = useCarsQuery({ errorPolicy: 'ignore' });

    useEffect(() => {
        refetch();
    }, []);

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h4">Cars</Typography>
            </Box>
            {!loading && data && data.MyCars && (
                <PostsCars myCars={data.MyCars as Car[]} />
            )}
        </Container>
    );
}
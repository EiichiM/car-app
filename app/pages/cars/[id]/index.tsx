import Container from '@material-ui/core/Container';

import HeroCar from 'components/HeroCar';
import { useCarQuery, Car } from 'lib/graphql/querys/car.graphql';

export default function CarDetail({ id }) {
    const { data, loading } = useCarQuery({
        variables: { streamId: id },
    });

    if (!loading && data && data.car) {
        return (
            <Container maxWidth="lg">
                <HeroCar car={data.car as Car} />
            </Container>
        );
    }

    return null;
}

CarDetail.getInitialProps = ({ query: { id } }) => {
    return { id };
};
import { Card, CardActionArea, CardContent, CardMedia, Grid, Hidden, Typography } from '@material-ui/core';
import Link from 'next/link';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Car } from '../lib/graphql/querys/myCars.graphql';

interface Props {
    myCars: Car[];
}

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        marginTop: theme.spacing(4),
    },
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardText: {
        maxWidth: '26rem',
    },
    cardMedia: {
        width: 160,
    },
}));

export default function Posts(props: Props) {
    const styles = useStyles();
    const { myCars } = props;

    return (
        <Grid container className={styles.container} spacing={4}>
            {myCars.map((post) => (
                <Grid item key={post._id} xs={12} md={4}>
                    <Link href={`/cars/${post._id}`}>
                        <CardActionArea component="a" href="#">
                            <Card className={styles.card}>
                                <div className={styles.cardDetails}>
                                    <CardContent>
                                        <Typography
                                            component="h2"
                                            variant="h5"
                                            className={styles.cardText}
                                        >
                                            {post.make} {post.model} 
                                        </Typography>
                                        <Typography
                                            noWrap={true}
                                            variant="subtitle1"
                                            color="textSecondary"
                                            className={styles.cardText}
                                        >
                                            {post.estimadeDate}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            paragraph
                                            className={styles.cardText}
                                        >
                                            {post.description}
                                        </Typography>
                                    </CardContent>
                                </div>
                                <Hidden xsDown>
                                    <CardMedia
                                        className={styles.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                </Hidden>
                            </Card>
                        </CardActionArea>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
}


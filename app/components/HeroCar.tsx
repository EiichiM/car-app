import { Box, Button, Grid, Typography, Paper } from '@material-ui/core';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { Car } from '../lib/graphql/querys/car.graphql';
import { useAuth } from 'lib/useAuth';

interface Props {
    car: Car;
}

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        // backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.7)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
}));

export default function Hero({ car }: Props) {
    const styles = useStyles();
    const { user } = useAuth();

    const showEdit =
        user &&
        user._id === car.author._id;

    return (
        <Paper className={styles.mainFeaturedPost}>
            <div className={styles.overlay} />
            <Grid container spacing={4}>
                <Grid item xs={11}>
                    <div className={styles.mainFeaturedPostContent}>
                        <Typography
                            component="h1"
                            variant="h3"
                            color="inherit"
                            gutterBottom
                        >
                            {car.model} {car.make}
                        </Typography>
                        <Grid container item>
                            <Grid item md={6}>
                                <Typography
                                    noWrap={true}
                                    variant="body1"
                                    color="inherit"
                                    gutterBottom
                                >
                                    ID:
                                </Typography>
                                <Box fontWeight={700}>
                                    <Typography
                                        noWrap={true}
                                        variant="subtitle1"
                                        color="inherit"
                                        gutterBottom
                                    >
                                        {car._id}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Typography
                                    noWrap={true}
                                    variant="body1"
                                    color="inherit"
                                    gutterBottom
                                >
                                    Estimade Date:
                                </Typography>
                                <Box fontWeight={700}>
                                    <Typography
                                        noWrap={true}
                                        variant="subtitle1"
                                        color="inherit"
                                        gutterBottom
                                    >
                                        {car.estimadeDate}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Typography
                            noWrap={true}
                            variant="body1"
                            color="inherit"
                            gutterBottom
                        >
                            Description:
                                </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {car.description}
                        </Typography>
                        <Box pb={1} />
                        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {showEdit && (
                                <Link href={`edit/${car._id}`}>
                                    <Button variant="outlined" color="inherit">
                                        Edit Car
                                </Button>
                                </Link>
                            )}
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
}


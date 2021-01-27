import { makeStyles } from '@material-ui/core/styles';

type VideoProps = {
    url: string;
};

const useStyles = makeStyles(() => ({
    container: {
        paddingTop: '56.25%',
        position: 'relative',
    },
    iframe: {
        border: '0',
        height: '100%',
        left: '0',
        position: 'absolute',
        top: '0',
        width: '100%',
    },
}));

export default function Video({ url }: VideoProps) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <iframe
                className={classes.iframe}
                src={url}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
            />
        </div>
    );
}


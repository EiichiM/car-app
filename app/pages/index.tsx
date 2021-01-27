import React from "react";
import { Box, Button, Container, Divider, List, ListItem, ListItemIcon, ListItemText, Grid, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
    }),
);


export default function Index() {
    const classes = useStyles();

    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Eiichi Matsuo FullStack Developer
                </Typography>
                <Typography variant="h5" component="h1" gutterBottom >
                    The aplication was created in fases:
                </Typography>
                <div className={classes.demo}>
                    <List >
                        <ListItem alignItems="flex-start">
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Front-End"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        >
                                            Next.js/React with TypeScript
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Back-End"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        >
                                            TypeScript Node.js Express Apollo
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="GraphQL"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        >
                                            GraphQL
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="DataBase"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        >
                                            Monggose/ Mongo DB
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </div>
                <Typography variant="h5" component="h1" gutterBottom >
                    I hope you can see alll the aspects that yuo requered.
                </Typography>
            </Box>
        </Container>
    );
}
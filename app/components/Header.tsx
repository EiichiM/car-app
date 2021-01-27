import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Link as LinkText,
    Switch,
} from '@material-ui/core';
import Link from 'next/link';
import { useAuth } from 'lib/useAuth';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
}));

export default function Header({ darkState, handleThemeChange }) {
    const classes = useStyles();
    const { user } = useAuth();

    const links = [
        !user && { label: 'Sign Up', href: '/auth/signUp' },
        !user && { label: 'Sign In', href: '/auth/signIn' },
        user && { label: 'Create Stream', href: '/streams/newStream' },
        user && { label: 'Create Car', href: '/cars/newCar' },
        user && { label: 'Sign Out', href: '/auth/signOut' },
    ]
        .filter((link) => link)
        .map(({ label, href }) => {
            return (
                <Link href={href} key={href}>
                    <Button color="inherit">{label}</Button>
                </Link>
            );
        });

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link href="/">
                            <LinkText href="" color="inherit">
                                Car App
                            </LinkText>
                        </Link>
                    </Typography>
                    <Switch checked={darkState} onChange={handleThemeChange} />
                    {links}
                </Toolbar>
            </AppBar>
        </div>
    );
}


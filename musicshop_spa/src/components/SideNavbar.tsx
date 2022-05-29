import * as React from 'react';
import {styled, useTheme, Theme, CSSObject} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link, Route, Routes} from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import Login from './Login';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import LogoutIcon from '@mui/icons-material/Logout';
import {DefaultApi, UserDataDTO} from "../openAPI";
import {Alert, Snackbar} from "@mui/material";
import PlaylistIcon from '@mui/icons-material/LibraryMusic';
import MusicSearch from "./pages/MusicSearch";
import ProductDetails from "./pages/ProductDetails";
import CartOverview from "./pages/CartOverview";
import PlaylistOverview from "./pages/PlaylistOverview";
import IAppProbs from "./apis/IAppProbs";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {useContext} from "react";
import Root from "./Root";


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);



function logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    window.location.assign('/');
}

export default function MiniDrawer(props: IAppProbs) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openLogin, setOpenLogin] = React.useState(false);
    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [snackbarState, setSnackbarState] = React.useState("");
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(true);

    const handleColorChange = () => {
        props.toggleColorMode();
    }

    const login = () => {
        let defaultApi = new DefaultApi();
        let userDataDTO: UserDataDTO = {
            emailAddress: emailAddress,
            password: password,
        }
        defaultApi.loginWeb(userDataDTO).then(response => {
            if (response.status === 200) {
                localStorage.setItem('jwt', response.data);
                localStorage.setItem('user', emailAddress);
                changeSnackbarMessageAndState('Login successful', 'success');

                //window.location.reload();
                handleLoginClose();
            }
        }, error => {

            changeSnackbarMessageAndState(error.response.data, 'error');
            openSnackbar();
        });

    }

    const openSnackbar = () => {
        setSnackbarOpen(true);
    }
    const closeSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    }

    const changeSnackbarMessageAndState = (message: string, state: string) => {
        setSnackbarMessage(message);
        setSnackbarState(state);
    }

    const handleLoginOpen = () => {
        setOpenLogin(true);
    }

    const handleLoginClose = () => {
        setOpenLogin(false);
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // let cartOverviewProbs : ICartOverviewProbs = {
    //     openLogin: handleLoginOpen,
    //     closeLogin: handleLoginClose,
    // }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Music Shop
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>

                    <ListItemButton component={Link} to={"/"}
                                    key={"musicSearch"}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                    >

                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <SearchIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Music Search"} sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>

                    <ListItemButton component={Link} to={"/shopping-cart"}
                                    key={"shoppingCart"}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <ShoppingCartIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Shopping Cart"} sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                    {localStorage.getItem("jwt") ? <ListItemButton component={Link} to={"/playlist"}
                                    key={"playlist"}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <PlaylistIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Playlist"} sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton> : null}
                    <ListItemButton onClick={handleColorChange}
                                    key={"toggleColorMode"}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </ListItemIcon>
                        <ListItemText primary={"Switch Color Mode"} sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                </List>
                <Divider/>
                <List>
                    {localStorage.getItem("jwt") == null ?
                        <ListItemButton onClick={handleLoginOpen}
                                        key={"Login"}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <LoginIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Login"} sx={{opacity: open ? 1 : 0}}/>
                        </ListItemButton> :
                        <ListItemButton onClick={logout}
                                        key={"Logout"}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <LogoutIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Logout"} sx={{opacity: open ? 1 : 0}}/>
                        </ListItemButton>}
                </List>
            </Drawer>


            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>

                <Dialog open={openLogin}>
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter your credentials.
                        </DialogContentText>
                        <TextField
                            value={emailAddress}
                            onChange={(event: any) => setEmailAddress(event.target.value)}
                            autoFocus
                            margin="dense"
                            id="emailAddress"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            value={password}
                            onChange={(event: any) => setPassword(event.target.value)}
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleLoginClose}>Cancel</Button>
                        <Button onClick={() => {
                            login();
                        }}>Login</Button>
                    </DialogActions>

                </Dialog>
                {/*TODO: move snackbar to App.tsx and open with callback*/}
                {snackbarOpen ? <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={closeSnackbar}
                    message={snackbarMessage}

                    // action={action}
                >
                    <Alert
                        severity={snackbarState.includes("success") ? "success" : "error"}
                        sx={{width: '100%'}}
                        onClose={closeSnackbar}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar> : null}
                <Routes>

                    <Route path={"/"} element={<MusicSearch/>}></Route>
                    <Route path={"/product-detail"} element={<ProductDetails/>}></Route>
                    <Route path={"/shopping-cart"} element={<CartOverview openLogin={handleLoginOpen} closeLogin={handleLoginClose} openSnackbar={openSnackbar} changeSnackbarMessageAndState={changeSnackbarMessageAndState} />}></Route>
                    <Route path={"/playlist"} element={<PlaylistOverview/>}></Route>

                </Routes>
            </Box>

        </Box>
    );
}

import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, FormControlLabel, FormGroup, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

interface Props {
    switchTheme: () => void;
}

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
]
const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
]
const navStyles = { color: 'inherit', typography: 'h6', '&:hover': { color: 'secondary.main' }, '&.active': { color: 'text.secondary' }, textDecoration: 'none' }

export default function Header({ switchTheme }: Props) {
    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <Box sx={{display: 'flex'}}>
                    <Typography variant='h6' component={NavLink} to='/' sx={navStyles}>
                        RE-STORE
                    </Typography>
                    <FormGroup sx={{ ml: 2 }}>
                        <FormControlLabel control={<Switch onChange={switchTheme} />} label="Dark Mode" />
                    </FormGroup>
                </Box>

                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>

                <Box sx={{display: 'flex'}}>
                    <IconButton size='large' sx={{ color: 'inherit' }}>
                        <Badge badgeContent={3} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>

            </Toolbar>
        </AppBar>
    )
}
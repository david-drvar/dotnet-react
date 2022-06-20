import { AppBar, FormControlLabel, FormGroup, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    switchTheme : () => void;
}

export default function Header({switchTheme} : Props) {
    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant='h6'>
                    RE-STORE
                </Typography>
                <FormGroup sx={{ml: 2}}>
                    <FormControlLabel control={<Switch onChange={switchTheme}/>} label="Dark Mode" />
                </FormGroup>

            </Toolbar>
        </AppBar>
    )
}
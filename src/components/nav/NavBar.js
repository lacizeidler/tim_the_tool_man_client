import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function NavTabs() {
    const history = useHistory()
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                <Tab label="Home" href="/" />
                <Tab label="Requests" href="/requests" />
                <Tab label="Form" href="/requests/new" />
                {
                    (localStorage.getItem("tm_token") !== null) ?
                        <Tab 
                        label="Logout"
                        onClick={() => {
                            localStorage.removeItem("tm_token")
                            history.push({ pathname: "/" })
                        }}
                        /> :
                        <>
                            <Tab label="Login" href="/login" />
                            <Tab label="Register" href="/register" />
                        </>
                }
            </Tabs>
        </Box>
    );
}

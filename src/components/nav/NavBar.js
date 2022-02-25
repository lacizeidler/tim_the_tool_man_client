import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

export default function NavTabs() {
    const history = useHistory()
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                <LinkTab label="Home" href="/" />
                <LinkTab label="Requests" href="/requests" />
                <LinkTab label="Form" href="/requests/new" />
                <LinkTab label="About" href="/" />
                {
                    (localStorage.getItem("tm_token") !== null) ?
                        <LinkTab 
                        label="Logout"
                        onClick={() => {
                            localStorage.removeItem("tm_token")
                            history.push({ pathname: "/" })
                        }}
                        /> :
                        <>
                            <LinkTab label="Login" href="/login" />
                            <LinkTab label="Register" href="/register" />
                        </>
                }
            </Tabs>
        </Box>
    );
}

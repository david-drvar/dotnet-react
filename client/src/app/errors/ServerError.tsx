// @ts-nocheck

import { Button, Divider, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { history } from "../..";

export default function ServerError() {
    const [output, setOutput] = useState();

    useEffect(() => {
        setOutput(history.location.state.state.detail);
        //console.log(output)
    }, [])

    return (
        <Container component={Paper}>
            {history.location.state ? (
                <>
                    <Typography  variant="h3" color='error' gutterBottom>Server error</Typography>
                    <Divider />
                    <Typography gutterBottom>{output || "Internal server error"}</Typography>

                </>
            ) : (
                <Typography variant="h5" gutterBottom>Server error</Typography>
            )}

            <Button onClick={() => history.push('/catalog')}>Go back to the store</Button>

        </Container>
    )
}
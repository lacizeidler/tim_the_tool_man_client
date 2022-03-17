import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { MessageForm } from "./message_form"
import { getRequestById } from "./message_manager"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const MessageList = () => {
    const { requestId } = useParams()
    const [request, modifyRequest] = useState({})

    useEffect(
        () => {
            getRequestById(requestId)
                .then(modifyRequest)
        },
        [requestId]
    )

    return (
        <>
            {
                request.message_request?.map(message => {
                    return <Card key={message.id} sx={{ "margin": "1%" }}>
                    <CardHeader
                        title={request.customer.user.first_name}
                        subheader={request.customer.user.last_name}
                    />
                    <CardContent>
                        <Typography paragraph>
                            {message.message}
                        </Typography>
                    </CardContent>
                </Card>
                })
            }
            <MessageForm requestId={requestId} />
        </>
    )
}
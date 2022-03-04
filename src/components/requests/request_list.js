import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { getRequests } from './request_manager';

export default function RequestList() {
    const [requests, modifyRequests] = React.useState([])
    const [expanded, setExpanded] = React.useState(false);

    React.useEffect(
        () => {
            getRequests().then(requests => modifyRequests(requests))
        },
        []
    )


    return (
        <>
            {
                requests.map(request => {
                    return <div key={request.id} style={{ marginBottom: "3%" }}>
                        <Card sx={{ maxWidth: "70%", marginRight: "15%", marginLeft: "15%" }}>
                            <CardHeader
                                title={request.customer.user.first_name}
                                subheader={request.customer.user.last_name}
                            />
                            <CardContent>
                                <Typography paragraph>
                                    Description: {request.description}
                                </Typography>
                                <Typography paragraph>
                                    Budget: ${request.budget}
                                </Typography>
                                <Typography paragraph>
                                    Topic: {request.topic.label}
                                </Typography>
                                <Typography paragraph>
                                    Label: {request.status.label}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                }
                )
            }
        </>
    )
}
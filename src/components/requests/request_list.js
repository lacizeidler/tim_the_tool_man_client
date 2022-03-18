import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getRequests, getSingleCustomer } from './request_manager';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function RequestList() {
    const [requests, modifyRequests] = React.useState([])
    const [currentCustomer, setCurrentCustomer] = React.useState({})
    const history = useHistory()

    React.useEffect(
        () => {
            getSingleCustomer()
                .then(setCurrentCustomer)
        },
        []
    )

    React.useEffect(
        () => {
            getRequests().then(requests => modifyRequests(requests))
        },
        []
    )

    const deleteRequest = (id) => {
        fetch(`http://localhost:8000/requests/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("tm_token")}`
            }
        })
    }


    return (
        <>
            {
                requests?.map(request =>
                    currentCustomer.user_id === 1
                        ? <div key={request.id} style={{ "margin": "1%" }}>
                            <Card>
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
                                    <Button
                                        key={`/requests/editstatus/${request.id}`}
                                        onClick={
                                            () => {
                                                history.push(`/requests/editstatus/${request.id}`)
                                            }
                                        }
                                        value={request.id}
                                    >
                                        Update Status
                                    </Button>
                                    <Button
                                        onClick={
                                            () => {
                                                deleteRequest(parseInt(request.id))
                                                history.push("/requests")
                                            }
                                        }
                                    >Delete Request</Button>
                                    <Button
                                        key={`/message_list/${request.id}`}
                                        onClick={
                                            () => {
                                                history.push(`/message_list/${request.id}`)
                                            }
                                        }
                                        value={request.id}
                                    >
                                        Messages
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                        : <div key={request.id} style={{ "margin": "1%" }}>
                            <Card>
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
                                    <Button
                                        key={`/message_list/${request.id}`}
                                        onClick={
                                            () => {
                                                history.push(`/message_list/${request.id}`)
                                            }
                                        }
                                        value={request.id}
                                    >
                                        Messages
                                    </Button>
                                    <Button
                                        onClick={
                                            () => {
                                                history.push(`/requests/edit/${request.id}`)
                                            }
                                        }
                                    >
                                        Edit
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
            )
            }
        </>
    )
}
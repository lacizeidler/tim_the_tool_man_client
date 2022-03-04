//! The responsibility of this module is to populate the JSX of the message form. 
//! This should include an input text box and a button that sends the message to the API. 
//! This should have the recipientId, senderId, requestId, read boolean, message string, and a Send button. 
import React, { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { GetMessagesFromRequests } from "./message_manager"
import Input from '@mui/material/Input'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

//*When React sees an element representing a user-defined component, it passes JSX attributes and children to this component as a single object. We call this object “props”.
export const MessageForm = ({ modifyMessages }) => {
    const { requestId } = useParams()
    const currentUser = parseInt(localStorage.getItem("toolMan_customer"))
    const [message, modifyMessage] = useState({
        message: "",
        requestId: requestId,
        read: false
    })

    const SendMessage = (event) => {
        //*The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
        event.preventDefault()
        const newMessage = {
            message: message.message,
            requestId: parseInt(message.requestId),
            senderId: currentUser,
            timestamp: Date.now(),
            read: message.read
        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("tm_token")}`
            },
            body: JSON.stringify(newMessage)
        }
        fetch("http://localhost:8000/messages", fetchOption)
            .then(
                () => {
                    GetMessagesFromRequests(requestId)
                        .then(modifyMessages)
                        .then(modifyMessage(emptyMessage))
                }
            )
    }
    const emptyMessage = { message: "" }

    //* ? is a conditional operator.
    return (
        <>
            <div style={{ marginBottom: "3%" }}>
                <Card sx={{ maxWidth: "70%", marginRight: "15%", marginLeft: "15%" }}>
                    <h2>New Request</h2>
                    <CardContent>
                        <div>
                            <Input
                                value={message.message}
                                onChange={
                                    (evt) => {
                                        const copy = { ...message }
                                        copy.message = evt.target.value
                                        modifyMessage(copy)
                                    }
                                }
                                placeholder="Type message here..."
                                type="text"
                                required autoFocus
                            />
                        </div>
                        <div>
                            <Button
                                onClick={SendMessage}>
                                Submit
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
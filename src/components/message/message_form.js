//! The responsibility of this module is to populate the JSX of the message form. 
//! This should include an input text box and a button that sends the message to the API. 
//! This should have the recipientId, senderId, requestId, read boolean, message string, and a Send button. 
import React, { useState } from "react"
import { createMessage } from "./message_manager"
import Input from '@mui/material/Input'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

//*When React sees an element representing a user-defined component, it passes JSX attributes and children to this component as a single object. We call this object “props”.
export const MessageForm = ({ requestId }) => {
    const [newMessage, modifyNewMessage] = useState({
        message: "",
        request_id: requestId,
        read: 0
    })

    const changeMessageState = (domEvent) => {
        const copy = { ...newMessage }
        const key = domEvent.target.name
        const value = domEvent.target.value
        copy[key] = value
        modifyNewMessage(copy)
      }

    //* ? is a conditional operator.
    return (
        <>
            <div style={{"margin": "1%"}}>
                <Card>
                    <h2 style={{"marginLeft": "2%"}}>New Message</h2>
                    <CardContent>
                        <div>
                            <Input
                                value={newMessage.message}
                                name="message"
                                onChange={changeMessageState}
                                placeholder="Type message here..."
                                type="text"
                                required autoFocus
                            />
                        </div>
                        <div>
                            <Button
                                onClick={evt => {
                                    evt.preventDefault()
                                    const message = {
                                        message: newMessage.message,
                                        read: newMessage.read,
                                        request_id: newMessage.request_id,
                                        timestamp: new Date().toISOString().slice(0, 10)
                                    }
                                    createMessage(message)
                                }
                                }>
                                Send
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { MessageForm } from "./message_form"
import { GetMessagesFromRequests, GetRegisterExistingUserCheck } from "./message_manager"

export const MessageList = () => {
    const { requestId } = useParams()
    const [messages, modifyMessages] = useState([])
    const [customers, modifyCustomers] = useState([])

    useEffect(
        () => {
            GetMessagesFromRequests(requestId)
                .then(modifyMessages)
        },
        [requestId]
    )
    useEffect(
        () => {
            GetRegisterExistingUserCheck()
                .then(modifyCustomers)
        },
        []
    )
    return (
        <>
            {
                messages.map(
                    message => {
                        const findUserName = customers.find(customer => {
                            return customer.id === message.sender_id
                        })
                        return <div key={`message--${message.id}`} className={message.senderId === 1 ? "color" : "previous__messages"}>
                            <h2>From: {findUserName?.name}</h2>
                            <h2>{message.message}</h2>
                            <h2>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(message.timestamp)}</h2>
                        </div>
                    }
                )
            }
            <MessageForm modifyMessages={modifyMessages} />
        </>
    )
}
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react/cjs/react.development"
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';
import { getTopics } from "./request_manager";

export const EditRequest = () => {
    const { requestId } = useParams()
    const history = useHistory()
    const [topics, modifyTopics] = useState([])
    const [request, modifyRequest] = useState({
        description: "",
        budget: "",
        topic_id: 0
    })

    useEffect(
        () => {
            getTopics()
                .then(modifyTopics)
        },
        []
    )

    const changeRequestState = (domEvent) => {
        const copy = { ...request }
        const key = domEvent.target.name
        const value = domEvent.target.value
        copy[key] = value
        modifyRequest(copy)
    }

    const UpdatedRequest = (evt) => {
        evt.preventDefault()
        const updatedRequest = {
            description: request.description,
            budget: request.budget,
            topic: request.topic_id
        }
        fetch(`http://localhost:8000/requests/${requestId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("ch_token")}`
            },
            body: JSON.stringify(updatedRequest)
        })
            .then(
                () => {
                    history.push(`/`)
                }
            )
    }

    return (
        <>
            <div style={{ "margin": "1%" }}>
                <Card>
                    <h2 style={{ "marginLeft": "2%" }}>New Request</h2>
                    <CardContent>
                        <div>
                            <Input
                                style={{ width: "100%" }}
                                value={newRequest.description}
                                onChange={changeRequestState}
                                placeholder="Description..."
                                type="text"
                                name="description"
                                required autoFocus
                            />
                        </div>
                        <div>
                            <Input
                                onChange={changeRequestState}
                                name="budget"
                                value={newRequest.budget}
                                placeholder="What's your budget?"
                                type="text"
                                required autoFocus
                            />
                        </div>
                        <div>
                            <NativeSelect className="topic__select"
                                onChange={changeRequestState}
                                name="topic_id"
                                value={newRequest.topic_id}
                            >
                                <option className="topic__option" value={0}>Select a topic...</option>
                                {
                                    topics.map(topic => <option className="topic__option" key={`topic--${topic.id}`} value={topic.id}>{topic.label}</option>)
                                }
                            </NativeSelect>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                onClick={evt => {UpdatedRequest(evt)}}
                            >
                                Save
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
import * as React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getTopics } from './request_manager';
import Input from '@mui/material/Input'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { NativeSelect } from '@mui/material';


export default function RequestForm() {
  const history = useHistory()
  const [topics, modifyTopics] = React.useState([])
  const [request, modifyRequest] = React.useState({
    description: "",
    topic_id: 0,
    budget: "",
    status_id: 1,
    read: 0
  })

  React.useEffect(
    () => {
      getTopics().then(topic => modifyTopics(topic))
    },
    []
  )

  const SubmitForm = () => {
    //* Object that gets Posted to the API in the requests array.
    const newRequest = {
      description: request.description,
      topic_id: request.topic_id,
      user_id: parseInt(localStorage.getItem("tm_token")),
      timestamp: Date.now(),
      budget: request.budget,
      status_id: request.status_id,
      read: request.read
    }

    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("tm_token")}`
      },
      body: JSON.stringify(newRequest)
    }
    return fetch(`http://localhost:8000/requests`, fetchOption)
  }

  return (
    <div key={request.id} style={{ marginBottom: "3%" }}>
      <Card sx={{ maxWidth: "70%", marginRight: "15%", marginLeft: "15%" }}>
        <h2>New Request</h2>
        <CardContent>
          <div>
          <Input
            style={{ width: "100%" }}
            onChange={
              (evt) => {
                const copy = { ...request }
                copy.description = evt.target.value
                modifyRequest(copy)
              }
            }
            placeholder="Description..."
            type="text"
            required autoFocus
          />
          </div>
          <div>
          <Input
            onChange={
              (evt) => {
                const copy = { ...request }
                copy.budget = evt.target.value
                modifyRequest(copy)
              }
            }
            placeholder="What's your budget?"
            type="text"
            required autoFocus
          />
          </div>
          <div>
          <NativeSelect className="topic__select"
                    onChange={
                        (evt) => {
                            const copy = { ...request }
                            copy.topic_id = parseInt(evt.target.value)
                            modifyRequest(copy)
                        }
                    }
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
            onClick={
              () => {
                SubmitForm()
                history.push(`/requests`)
              }
            }
          >
            Submit
          </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
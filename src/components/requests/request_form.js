import * as React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { createRequest, getTopics } from './request_manager';
import Input from '@mui/material/Input'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { NativeSelect } from '@mui/material';


export default function RequestForm() {
  const history = useHistory()
  const [topics, modifyTopics] = React.useState([])
  const [newRequest, modifyNewRequest] = React.useState({
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

  const changeRequestState = (domEvent) => {
    const copy = { ...newRequest }
    const key = domEvent.target.name
    const value = domEvent.target.value
    copy[key] = value
    modifyNewRequest(copy)
  }

  return (
    <div style={{ "margin": "1%" }}>
      <Card>
        <h2 style={{"marginLeft": "2%"}}>New Request</h2>
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
              onClick={evt => {
                evt.preventDefault()
                const request = {
                  topic_id: parseInt(newRequest.topic_id),
                  description: newRequest.description,
                  budget: newRequest.budget,
                  status_id: parseInt(newRequest.status_id),
                  read: newRequest.read,
                  timestamp: new Date().toISOString().slice(0, 10)
                }
                createRequest(request)
                  .then(history.push('/requests'))
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
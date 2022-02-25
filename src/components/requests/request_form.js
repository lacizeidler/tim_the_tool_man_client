import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getTopics } from './request_manager';

export default function RequestForm() {
    const history = useHistory()
    const [topics, modifyTopics] = React.useState([])
    const currentUser = parseInt(localStorage.getItem("tm_token"))
    const [request, modifyRequest] = React.useState({
        description: "",
        topic_id: 0,
        budget: "",
        status_id: 0
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
            status_id: request.status_id
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("tm_token")}`
            },
            body: JSON.stringify(newRequest)
        }
        return fetch(`http://localhost:8088/requests`, fetchOption)
    }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>New Request</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}
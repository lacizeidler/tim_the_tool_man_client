export const getMessages = () => {
    return fetch("http://localhost:8000/messages", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tm_token")}`
        }
    })
        .then(response => response.json())
}

export const GetMessagesFromRequests = (id) => {
    return fetch(`http://localhost:8000/messages/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tm_token")}`
        }
    })
    .then(res => res.json())
}

export const GetRegisterExistingUserCheck = () => {
    return fetch ("http://localhost:8000/customers", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tm_token")}`
        }
    })
    .then(res => res.json())
}

export const getRequestById = (id) => {
    return fetch(`http://localhost:8000/requests/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tm_token")}`
        }
    })
        .then(response => response.json())
}

export const createMessage = (message) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("tm_token")}`
        },
        body: JSON.stringify(message)
    }
    return fetch("http://localhost:8000/messages", fetchOptions)
    .then(response => response.json())
}
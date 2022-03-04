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
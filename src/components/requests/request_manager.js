export const getRequests = () => {
    return fetch("http://localhost:8000/requests", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tm_token")}`
        }
    })
        .then(response => response.json())
}
export const getTopics = () => {
    return fetch("http://localhost:8000/topics", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tm_token")}`
        }
    })
        .then(response => response.json())
}
export const getRequestPhotos = () => {
    return fetch("http://localhost:8000/requestphotos", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tm_token")}`
        }
    })
        .then(response => response.json())
}

export const createRequest = (request) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("tm_token")}`
        },
        body: JSON.stringify(request)
    }
    return fetch("http://localhost:8000/requests", fetchOptions)
    .then(response => response.json())
}

export const getSingleCustomer = () => {
    return fetch(`http://localhost:8000/customers/currentcustomer`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tm_token")}`
        }
    })
        .then(response => response.json())
}
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
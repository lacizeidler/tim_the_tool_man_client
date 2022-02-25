export const getMessages = () => {
    return fetch("http://localhost:8000/messages", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tm_token")}`
        }
    })
        .then(response => response.json())
}
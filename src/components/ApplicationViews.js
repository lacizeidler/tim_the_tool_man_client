import React from "react"
import { Route } from "react-router-dom"
import { HomePage } from "./homepage/HomePage"
import RequestForm from "./requests/request_form"
import RequestList from "./requests/request_list"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem"
        }}>
            <Route exact path="/requests">
                <RequestList />
            </Route>
            <Route exact path="/requests/new">
                <RequestForm />
            </Route>
            <Route exact path="/">
                <HomePage />
            </Route>
        </main>
    </>
}

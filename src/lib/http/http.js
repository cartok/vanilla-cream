import moduleLogPrefix from "./_log-prefix.js"
import systemLogPrefix from "../_log-prefix.js"
import baseLogPrefix from "../../_log-prefix.js"
const PRE = `${baseLogPrefix}.${systemLogPrefix}.${moduleLogPrefix} |`

export function get(url, init) { 
    if(!url) throw new Error(`${PRE} Empty parameter 'url'.`)
    const request = new Request(url, init ? init : {
        method: "GET",
        credentials: "same-origin",
        headers: new Headers({
            "Content-Type" : "application/json",
        }),
    })
    console.log(`${PRE} GET: ${url}`)
    return fetch(request).then((response) => {
        return handleJsonResponse(response)
    })
}
export function getParallel(urls, init) {
    console.log(`${PRE} GET (parallel):`)
    return Promise.all(urls.map(url => this.request(url, init)))
        .then((responses) => {
            console.log(`${PRE} Requested parallel:`, responses)
            return responses.map(response => response.json())
        })
}
export function post(url, data) {
    // if(!data) throw new Error(`${PRE} Empty parameter 'data'.`)
    const request = new Request(url, {
        method: "POST",
        credentials: "include",
        headers: new Headers({
            "Content-Type" : "application/json",
            "X-CSRFToken" : Cookies.get("csrftoken"),
        }),
        body: JSON.stringify(data ? data : {}),
    })
    console.log(`${PRE} POST: ${url}`)
    console.dir(data)
    return fetch(request).then((response) => handleJsonResponse(response))
}
export function patch(url, data){
    // if(!data) throw new Error(`${PRE} Empty parameter 'data'.`)
    const request = new Request(url, {
        method: "PATCH",
        credentials: "include",
        headers: new Headers({
            "Content-Type" : "application/json",
            "X-CSRFToken" : Cookies.get("csrftoken"),
        }),
        body: JSON.stringify(data ? data : {}),
    })
    console.log(`${PRE} PATCH: ${url}`)
    console.log(data)
    return fetch(request).then((response) => handleJsonResponse(response))
}
export function del(url){
    const request = new Request(url, {
        method: "DELETE",
        credentials: "same-origin",
        headers: new Headers({
            "Content-Type" : "application/json",
            "X-CSRFToken" : Cookies.get("csrftoken"),
        })
    })
    console.log(`${PRE} DELETE: ${url}`)
    return fetch(request).then((response) => handleJsonResponse(response))
}

function handleJsonResponse(response){
    if(response.ok){
        return response.json()
    } else {
        throw new Error(`${PRE} Network response was not ok. Response status: ${response.status}: ${response.statusText}.`)
    }
}
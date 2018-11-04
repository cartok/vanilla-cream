import moduleLogPrefix from "./_log-prefix.js"
import systemLogPrefix from "../_log-prefix.js"
import baseLogPrefix from "../../_log-prefix.js"
const PRE = `${baseLogPrefix}.${systemLogPrefix}.${moduleLogPrefix} |`


export default function removeEmptyAttributes(from: Element, attr: String | Array<String>){
    // if attr is a string, it will be handled as an array with one string.
    attr = Array.isArray(attr) ? attr : [attr]
    Array.from(from.getElementsByTagName("*")).forEach(element => {
        attr.forEach(a => {
            if(element.getAttribute(a) === ""){
                element.removeAttribute(a)
            }
        })
    })
}

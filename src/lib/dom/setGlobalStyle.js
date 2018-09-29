import moduleLogPrefix from "./_log-prefix"
import systemLogPrefix from "../_log-prefix"
import baseLogPrefix from "../../_log-prefix"
const PRE = `${baseLogPrefix}.${systemLogPrefix}.${moduleLogPrefix} |`


export default function setGlobalStyle(property: String, value: String, important: Boolean){
	let matchImportant = value.match(/\s*!important$/)
	if(matchImportant !== null){
		important = true
		value = value.substr(0, matchImportant.index)
    }
	const allNodes = Array.from(document.body.getElementsByTagName("*"))
    for(let i = allNodes.length-1; i > 0; i--){
        allNodes[i].style.setProperty(property, value, important ? "important" : "")
    }
}
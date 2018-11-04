import moduleLogPrefix from "./_log-prefix.js"
import systemLogPrefix from "../_log-prefix.js"
import baseLogPrefix from "../../_log-prefix.js"
const PRE = `${baseLogPrefix}.${systemLogPrefix}.${moduleLogPrefix} |`


/**
 * 
 * @param {*} eventTarget 
 * @param {*} className 
 */
export default function isChildOf(eventTarget, className: String){
    // get all parents of the targeted element
    var targetParents = [];

    function getParents(t){
        targetParents.push(t)
        if(t.parentNode){
            if(t.parentNode.localName !== ("body" || "html")){
                getParents(t.parentNode)
            }
        }
    }
    getParents(eventTarget)
    
    // search for class name
    for(var i = targetParents.length - 1; i >= 0; i--){
        if(targetParents[i].classList && targetParents[i].classList.contains(className)){
            return true
        }
    }
    return false
}
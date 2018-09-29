import moduleLogPrefix from "./_log-prefix"
import systemLogPrefix from "../_log-prefix"
import baseLogPrefix from "../../_log-prefix"
const PRE = `${baseLogPrefix}.${systemLogPrefix}.${moduleLogPrefix} |`


/**
* a function to extract css rules by id or class selection via parameter.
*/
// @todo REMOVE COMPLETELY (use getComputedStyle etc.)
export default function getElementStyle (classOrId){
    // get all stylesheet rules in one array
    let _StyleSheetList = document.styleSheets
    var cssRules = []
    for (var key in _StyleSheetList) {
        let index = parseInt(key)
        if(!isNaN(index)){
            let _CSSStyleSheet = _StyleSheetList[index]
            try {
                let _CSSRuleList = _CSSStyleSheet.rules || _CSSStyleSheet.cssRules
                for(var key in _CSSRuleList) {
                    let rule = _CSSRuleList[key]
                    if(rule.__proto__.constructor.name === "CSSStyleRule") {
                        cssRules.push(rule)
                    }
                }
            } catch(e){
                if(e.name !== "SecurityError"){
                    throw e
                }
            }
        }
    }
    // find rule matching the name parameter
    let i = cssRules.length - 1
    for (; i >= 0; i--) {
        // console.log(cssRules[i].selectorText)
        if (cssRules[i].selectorText === classOrId) {
            return cssRules[i].style
        }
    }
}
import moduleLogPrefix from "./_log-prefix.js"
import systemLogPrefix from "../_log-prefix.js"
import baseLogPrefix from "../../_log-prefix.js"
const PRE = `${baseLogPrefix}.${systemLogPrefix}.${moduleLogPrefix} |`

export default {
    /**
     * browser names thank can be detected.
     */
    BROWSER_NAMES: [
        "Chrome", "Safari", "Firefox", "Edge", "Internet Explorer 10", "Internet Explorer 11", "Opera"
    ],
    /**
     * browser name that is detected.
     */
    BROWSER_NAME: (()=>{
        const userAgentString = navigator.userAgent
        let result = ""
        // check useragent string
        if (userAgentString.includes("Chrome")) {
            result = "Chrome"
        } else if (userAgentString.includes("Safari")) {
            result = "Safari"
        } else if (userAgentString.includes("Firefox")) {
            result = "Firefox"
        } else if (userAgentString.includes("Edge")){
            result = "Edge"
        } else if (userAgentString.includes("MSIE")){
            result = "Internet Explorer 10"
        } else if (userAgentString.includes("Trident")){
            result = "Internet Explorer 11"
        } else if (userAgentString.includes("Opera") || userAgentString.includes('OPR')) {
            result = "Opera"
        } else {
            result = "unknown"
        }
        console.log(`${PRE} Browser: ${result}`)
        return result
    })(),
}

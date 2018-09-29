import moduleLogPrefix from "./_log-prefix"
import systemLogPrefix from "../_log-prefix"
import baseLogPrefix from "../../_log-prefix"
const PRE = `${baseLogPrefix}.${systemLogPrefix}.${moduleLogPrefix} |`

import WizardTabView from "./WizardTabView"

class ExampleWizardTabView extends WizardTabView {
    constructor(){
        // the config object can be declared outside
        // of the class or directly into the super call aswell.
        const config = {
            title: "give a title",
            icon: "give an icon string",
            content: `
                <h1>write html content</h1>
            `,
        }
        super(config)
    }
    // ... dom manipulating methods ...
    // to acces the content use the 'NodeTemplate':
    // => this.html
}
export default new ExampleWizardTabView()
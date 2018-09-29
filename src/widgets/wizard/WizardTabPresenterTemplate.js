import moduleLogPrefix from "./_log-prefix"
import systemLogPrefix from "../_log-prefix"
import baseLogPrefix from "../../_log-prefix"
const PRE = `${baseLogPrefix}.${systemLogPrefix}.${moduleLogPrefix} |`

import WizardTabPresenter from "./WizardTabPresenter"

class ExampleWizardTab extends WizardTabPresenter {
    constructor(){
        super()
        // to acces the 'WizardTabView':
        // => this.view
    }
    
    // INSTRUCTION: override isValidated or extend validate!
    // /**
    //  * @override
    //  */
    // isValidated(){
    //     // ...
    //     return true
    // }

    // /**
    //  * @extend
    //  */
    // validate(){
    //     super.validate(()=>{
    //         // ...
    //         return true
    //     })
    // }
}
export default new ExampleWizardTab()
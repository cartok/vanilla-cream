# NEED TO REWRITE THE README

# vanilla-cream

## Installation:
```npm install vanilla-cream```

## Library contains:


## General Structure of our Apps
Were using MVP file-structure and theirfore use [literal-observer](https://github.com/cartok/observe-literal/blob/master/README.md) to achive this and [dom-node-template](https://github.com/cartok/dom-node-template/blob/master/README.md) to *make it good*.



### Backend Access
To easily handle REST-Service requests to our backend we use a tiny data layer.

```javascript
import { http } from "vanilla-cream"

// methods
http.request(url: String): Promise
http.requestParallel(url: String): Promise
http.send(url: String): Promise
```



### Application State Handling
For model state save ability the **state module** offers a data **stack** where **state restoring functions** can be passed in by methods to alow **undo and redo** features for any application.

```javascript
import { state } from "vanilla-cream"

// read the history size
state.historySize: Number
// check if initialized
state.initialized: Boolean

// set the history size
state.setHistorySize(x: Number): void
// reset the statemachine
state.reset(): void
// initialize the statemachine, add a function to restore 
// current application state.
state.init(state: Function): void
// add application state, by passing a funtion to restore
// current application state.
state.dodo(state: Function): void
// undo state change, by calling the previous restore function.
state.undo(): void
// redo state change, by calling the next restore function.
state.redo(): void
```

### Wizard UI Element
For our SPA's ability to guide the user through some required steps we use the wizard to achive.  
To create a wizard for an application you need to:


+ create a WizardTabView by extending that base class.
```javascript
// view

import { WizardTabView } from "vanilla-cream"

class MyTabView extends WizardTabView {
    constructor(){
        super({
            title: "A title or no title",
            icon: "fontawesome or glyphicon string",
            content: `
                Any html here. It will become a NodeTemplate !
                Accessable through: this.html
            `,
        })
    }
    // ...methods to change the content...
    // their execution can be bound to model changes
    // in the presenter.
}

// singleton export (parameterless, if no initial data needed)
export default new SelectPipelineView()
// class export
export default SelectPipelineView
```

+ create a WizardTabPresenter by extending that base class.
```javascript
// presenter

import { WizardTabPresenter } from "vanilla-cream"
import MyTabView from "vanilla-cream"

class MyTabPresenter extends WizardTabPresenter {
    constructor(){
        super()
        // if singleton export
        this.view = MyTabView
        // if class export
        this.view = new MyTabView(/* parameters */)
    }
    // extend the validate method...
    validate(){
        super.validate(() => {
            // ...
        })
    }
    // ...or override the isValidated method
    isValidated(){
        // ...
    }
}

// same export options here. 
// both exports need to match. 
export default MyTabPresenter
export default new MyTabPresenter()
```

+ instantiate a wizard 
```javascript
// app

import { Wizard } from "vanilla-cream"
import MyTabPresenter from "..."
import AnotherTabPresenter from "..."

const wizard = new Wizard("my-wizard-container-id-or-a-reference")

// Configurate tab activation dependence if needed.
// The 'AnotherTabPresenter' can only be opened if 'MyTabPresenter' is validated.
// You can also pass an array of 'WizardTabPresenters' here. 
AnotherTabPresenter.requiresValid(MyTabPresenter)

wizard.add([MyTabPresenter, AnotherTabPresenter])
```


### DOM Library
Current list of DOM related functions:
```javascript
// Get the style rules of a class or id that are defined in css. 
getElementStyle(classOrId: String)
// example:
const menuHeight = parseInt(getElementStyle(".box-menu-node").height))

// anitpattern to use ... explain or remove
isChildOf

/**
 * The iterate function gets a node and a callback function... 
 * It starts iterating the dom from the node, recoursively executing the callback.
 * If the callback function itself does not call 'return', the iterate function
 * will return false after executing the recursion.
 */
iterate(n: Node, cb: Function): void | false
```

### Input Library
+ mouse  
+ keyboardValidation  

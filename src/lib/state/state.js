import moduleLogPrefix from "./_log-prefix"
import systemLogPrefix from "../_log-prefix"
import baseLogPrefix from "../../_log-prefix"
const PRE = `${baseLogPrefix}.${systemLogPrefix}.${moduleLogPrefix} |`

// import "../../lib/prototype/Array"

const UNDO = []
const REDO = []
let popElement = undefined
let topElement = undefined

let historySize = 5
let initialized = false

let logging = true

/** init */
export function init(options = {
    logging: true
}){
    console.log(`${PRE} state initialized`)
    UNDO.length = 0
    REDO.length = 0
    popElement = undefined
    topElement = undefined
    initialized = true
    logging = options.logging
}
export function setHistorySize(x: Number){
    historySize = x
}

/** main */
export function add(obj){
    if(!initialized) throw new Error(`${PRE} call state.init() at the start of your application before using it.`)
    // reset redo
    REDO.length = 0

    // keep history size
    let sizeWithNextElement = UNDO.length + 1
    if(sizeWithNextElement > historySize){
        UNDO.shift()
    }

    // do
    if(obj instanceof StateElement){
        UNDO.push(obj)
    } else {
        UNDO.push(new StateElement(obj))
    }
    if(logging){
        console.log(`${PRE} added restore point.`)
    }
}
// @prototype: used Array.top before. Had Problems with other librarys that override Array's prototype aswell.
export function undo(){
    if(!initialized) throw new Error(`${PRE} call state.init() at the start of your application before using it.`)
    if(UNDO.length > 0){
        topElement = UNDO[UNDO.length-1]
        popElement = UNDO.pop()
        if(popElement !== undefined){
            REDO.push(popElement)
            if(topElement !== undefined){
                console.log(`${PRE} executing undo.`)
                topElement.undo()
            }
        }
    }
}
// @prototype: used Array.top before. Had Problems with other librarys that override Array's prototype aswell.
export function redo(){
    if(!initialized) throw new Error(`${PRE} call state.init() at the start of your application before using it.`)
    if(REDO.length > 0){
        popElement = REDO.pop()
        if(popElement !== undefined){
            UNDO.push(popElement)
            topElement = UNDO[UNDO.length-1]
            if(topElement !== undefined){
                console.log(`${PRE} executing redo.`)
                topElement.redo()
            }
        }
    }
}

export class StateElement {
    constructor(obj){
        this.redoObjects = []
        this.undoObjects = []
        if(obj && obj.do){
            if(Array.isArray(obj.do)){
                obj.do.forEach(obj => this.addRedo(obj))
            } else {
                this.addRedo(obj.do)
            }
        }
        if(obj && obj.undo){
            if(Array.isArray(obj.undo)){
                obj.undo.forEach(obj => this.addUndo(obj))
            } else {
                this.addUndo(obj.undo)
            }
        }
    }
    addRedo(obj){
        if(logging){
            console.log(`${PRE} added redo: ${obj}`)
        }
        this.redoObjects.push(obj)
    }
    redo(){
        // run forward
        this.redoObjects.forEach(o => {
            if(logging){
                console.log(`${PRE} redo: ${o}`)
            }
            o.fn(o.data)
        })
    }
    addUndo(obj){
        if(logging){
            console.log(`${PRE} added undo: ${obj}`)
        }
        this.undoObjects.push(obj)
    }
    undo(){
        // run backward
        for(let i = this.undoObjects.length - 1; i >= 0; i--){
            if(logging){
                console.log(`${PRE} undo: ${this.undoObjects[i]}`)
            }
            this.undoObjects[i].fn(this.undoObjects[i].data)
        }
    }
}
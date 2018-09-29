import moduleLogPrefix from "./_log-prefix"
import systemLogPrefix from "../_log-prefix"
import baseLogPrefix from "../../_log-prefix"
const PRE = `${baseLogPrefix}.${systemLogPrefix}.${moduleLogPrefix} |`


function validateModType(mod: String | Array<String>){
    if(
        (
            typeof mod === "string"
            || (Array.isArray(mod) && mod.every(m => typeof m === "string"))
        )
        === false
    ){
        throw new Error("wrong parameter-type for 'mod'. must be string or array of strings.")
    }
}
function validateKeyType(key: String | Array<String>){
    if(
        (
            typeof key === "string" 
            || (Array.isArray(key) && key.every(k => typeof k === "string"))
        ) 
        === false
    ){
        throw new Error("wrong parameter-type for 'key'. must be string or array of strings.")
    }
}
// allow: ctrl and capitalize word keys
function normalizeModifiers(mod: String | Array<String>){
    if(typeof mod === "string"){
        return exec(mod)
    } else {
        return mod.map(m => exec(m))
    }
    function exec(mod: String){
        mod = mod.toLocaleLowerCase()
        mod = mod[0].toLocaleUpperCase().concat(mod.substr(1))
        switch(mod){
            case "Ctrl":
                mod = "Control"
                break
        }
        return mod
    }
}
// allow: esc, del, space, spacebar and capitalize word keys
function normalizeKeys(key: String | Array<String>, caseSensitive: Boolean){
    const keys = Array.isArray(key) ? key : [key]
    return keys.map(key => {
        if(key.length > 1){
            key = key[0].toLocaleUpperCase().concat(key.substr(1))
            switch(key){
                case "Esc":
                    key = "Escape"
                    break
                case "Del":
                    key = "Delete"
                    break
                case "Space":
                case "Spacebar":
                    key = " "
                    break
                // modifiers can also be seen and checked as keys.
                case "Ctrl":
                    key = "Control"
            }
        } else {
            if(!caseSensitive){
                key = key.toLocaleLowerCase()
            }
        }
        return key
    }) 
}
function additionalModifierHit($event, mod: String | Array<String>){
    // remove the valid allowedMods from the list, and counter-check the rest of the list.
    const modifierList = MODIFIER_LIST.slice(0)
    if(typeof mod === "string"){
        modifierList.splice(modifierList.indexOf(mod), 1)
    } else {
        mod.forEach(m => modifierList.splice(modifierList.indexOf(m), 1))
    }
    // validate event (fast array iteration)
    let endIndex = modifierList.length - 1
    for(let i = endIndex; i >= 0; i--){
        if($event.originalEvent.getModifierState(modifierList[i])){
            return true
        }
    }
    return false
}
function modifierHit($event, mod: String | Array<String>, strict: Boolean){
    mod = normalizeModifiers(mod)
    // dont allow additional modifiers if strict
    if(strict){
        if(additionalModifierHit($event, mod)){
            return false
        } else {
            return execute(mod)
        }
    } else {
        return execute(mod)
    }
    function execute(mod){
        if(typeof mod === "string"){
            return $event.originalEvent.getModifierState(mod)
        } else {
            return mod.every(m => $event.originalEvent.getModifierState(m))
        }
    }
}
function keyHit($event, key: String | Array<String>, caseSensitive: Boolean){
    key = normalizeKeys(key)
    if(!caseSensitive){
        return typeof key === "string"
            ? $event.key.toLocaleLowerCase() === key.toLocaleLowerCase()
            : key.some(k => k.toLocaleLowerCase() === $event.key.toLocaleLowerCase())
    } else {
        return typeof key === "string"
            ? $event.key === key
            : key.some(k => k === $event.key)

    }
}

/**
 * 
 */
export const MODIFIER_LIST = [
    "Alt", "AltGraph", "Control", "Fn", "Hyper", "Meta", "Shift", "Super"
]

/**
 * Default behavoiur: Exactly match the keystroke given. Don't allow additional modifiers or keys to be active. 
 * Notice: Only jquery events are supported at this moment.
 * @param shortcuts:
 * { mod: "Control", key: "Z" }
 * { mod: "Control", key: ["X", "Y", "Z"] }
 * { mod: ["Control", "Shift"], key: ["X", "Y", "Z"] }
 * isShortcutHit($event, { mod: "Control", key: ["X", "Y", "Z"] }, { mod: "Alt", key: "R" })
 */
export function isShortcutHit($event, shortcut, options = { 
    strict: true
}){
    const { strict } = options
    // @todo: apply this pattern everywhere
    let shortcuts = Array.isArray(shortcut)
        ? shortcut
        : [shortcut]
    // check for type errors
    shortcuts.forEach(s => validateModType(s.mod))
    shortcuts.forEach(s => validateKeyType(s.key))
    // normalize modifiers
    shortcuts = shortcuts.map(s => {
        s.mod = normalizeModifiers(s.mod)
        return s
    })
    return shortcuts.some(s => {
        return modifierHit($event, s.mod, true) && keyHit($event, s.key, false)
    })
}

/**
 * 
 * @param {*}  
 * @param {*} mod 
 * @param {*} options 
 */
export function isModifierHit($event, mod, options = { 
    strict: false
}){
    const { strict } = options
    validateModType(mod)
    return modifierHit($event, mod, strict)
}
/**
 * 
 * @param {*}  
 * @param {*} mod 
 * @param {*} options 
 */
export function isModifierNotHit($event, mod, options){
    return !isModifierHit($event, mod, options)
}

/**
 * 
 * @param {*}  
 */
export function isAModifierHit($event){
    return MODIFIER_LIST.some(m => $event.originalEvent.getModifierState(m) === true)
}
/**
 * 
 * @param {*}  
 */
export function isNoModifierHit($event){
    return !isAModifierHit($event)
}

/**
 * 
 * @param {*}  
 * @param {*} k 
 */
export function isKeyHit($event, key, options = { 
    caseSensitive: true 
}){
    const { caseSensitive } = options
    validateKeyType(key)
    return keyHit($event, key, caseSensitive)
}
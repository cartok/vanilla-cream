import moduleLogPrefix from "./_log-prefix"
import systemLogPrefix from "../_log-prefix"
import baseLogPrefix from "../../_log-prefix"
const PRE = `${baseLogPrefix}.${systemLogPrefix}.${moduleLogPrefix} |`

import * as dom from "../dom/_collection"
import stylesheet from "../../stylesheet"
import { BROWSER_NAME } from "../browser/_collection"

export const button = {
    isLeft: btn => btn === 0,
    isRight: btn => btn === 2 || btn === 3, // if event.buttons is passed
    isMid: btn => btn === 1 || btn === 4, // if event.buttons is passed
}

/**
* get the mouseposition (0,0) starts on parent element of
* the event target or the element given with the second argument.
*/
let x = undefined
let y = undefined
let rect = undefined
export const getMousePosition = (event, nodeToRelateTo) => {
    if(nodeToRelateTo instanceof Node === false){
        throw new Error(`${PRE} the parent node or scope node parameter must be of type HTMLNode.`)
    }
    if(nodeToRelateTo.nodeType === Node.ELEMENT_NODE
    || nodeToRelateTo.nodeType === Node.TEXT_NODE){
        // use the event targets parent element or a custom one.
        rect = (nodeToRelateTo !== undefined)
            ? nodeToRelateTo.getBoundingClientRect()
            : event.target.nodeToRelateTo.getBoundingClientRect()
        // use originalEvent if a jquery event was passed.
        event = event.originalEvent ? event.originalEvent : event
        // calculate.
        x = (event.clientX - rect.left)
        x = Math.round(x)
        y = (event.clientY - rect.top)
        y = Math.round(y)
        return { x, y }
    } else {
        return undefined
    }
}

/**
 * 
 */
let lastCursorClass = undefined
// QUICKFIX (mocha, jsdom, stylesheet, undefined)
if(BROWSER_NAME !== "unknown"){
    stylesheet.insertRule(`
        .NO_POINTER_EVENTS {
            pointer-events: none !important; 
        }`
    )
    stylesheet.insertRule(`
        .NO_SELECTION {
            -moz-user-select: -moz-none !important;
            -khtml-user-select: none !important;
            -webkit-user-select: none !important;
            -o-user-select: none !important;
            user-select: none !important;
        }`
    )
    stylesheet.insertRule(
        `.cursor-default{
            cursor : auto;
        }`
    )
    stylesheet.insertRule(
        `.cursor-none{
            cursor : none !important;
        }`
    )
    stylesheet.insertRule(
        `.cursor-default{
            cursor : default !important;
        }`
    )
    stylesheet.insertRule(
        `.cursor-create{
            cursor : crosshair !important;
        }`
    )
    stylesheet.insertRule(
        `.cursor-select{
            cursor : pointer !important;
        }`
    )
    stylesheet.insertRule(
        `.cursor-move{
            cursor : grab !important;
            cursor : -moz-grab !important;
            cursor : -webkit-grab !important;
        }`
    )
    stylesheet.insertRule(
        `.cursor-top-left{
            cursor : nw-resize !important;
        }`
    )
    stylesheet.insertRule(
        `.cursor-top-right{
            cursor : ne-resize !important;
        }`
    )
    stylesheet.insertRule(
        `.cursor-bottom-left{
            cursor : sw-resize !important;
        }`
    )
    stylesheet.insertRule(
        `.cursor-bottom-right{
            cursor : se-resize !important;
        }`
    )
    stylesheet.insertRule(
        `.cursor-top{
            cursor : n-resize !important;
        }`
    )
    stylesheet.insertRule(
        `.cursor-right{
            cursor : e-resize !important;
        }`
    )
    stylesheet.insertRule(
        `.cursor-bottom{
            cursor : s-resize !important;
        }`
    )
    stylesheet.insertRule(
        `.cursor-left{
            cursor : w-resize !important;
        }`
    )
}
export const CURSORS = {
    NONE: {
        id: 0,
        class: "cursor-none",
        value: "none",
    },
    DEFAULT: {
        id: 1,
        class: "cursor-default",
        value: "default",
    },
    CREATE: {
        id: 2,
        class: "cursor-create",
        value: "crosshair",
    },
    SELECT: {
        id: 3,
        class: "cursor-select",
        value: "pointer",
    },
    MOVE: {
        id: 4,
        class: "cursor-move",
        value: (() => {
            switch (BROWSER_NAME) {
                case "Firefox":
                    return "-moz-grab"
                case "Chrome":
                    return "-webkit-grab"
                default:
                    return "grab"
            }
        })()
    },
    CURSOR_CORNER_TOP_LEFT: {
        id: 5,
        class: "cursor-top-left",
        value: "nw-resize",
    },
    CURSOR_CORNER_TOP_RIGHT: {
        id: 6,
        class: "cursor-top-right",
        value: "ne-resize",
    },
    CURSOR_CORNER_BOTTOM_LEFT: {
        id: 7,
        class: "cursor-bottom-left",
        value: "sw-resize",
    },
    CURSOR_CORNER_BOTTOM_RIGHT: {
        id: 8,
        class: "cursor-bottom-right",
        value: "se-resize",
    },
    CURSOR_EDGE_TOP: {
        id: 9,
        class: "cursor-top",
        value: "n-resize",
    },
    CURSOR_EDGE_RIGHT: {
        id: 10,
        class: "cursor-right",
        value: "e-resize",
    },
    CURSOR_EDGE_BOTTOM: {
        id: 11,
        class: "cursor-bottom",
        value: "s-resize",
    },
    CURSOR_EDGE_LEFT: {
        id: 12,
        class: "cursor-left",
        value: "w-resize",
    }
}
export function setGlobalCursor(cursorClass: String, freeze: Boolean){
    lastCursorClass = cursorClass
    document.documentElement.classList.toggle(cursorClass, true)
    if(freeze){
        document.documentElement.classList.toggle("NO_SELECTION", true)
        document.documentElement.classList.toggle("NO_POINTER_EVENTS", true)
    }
}
export function unsetGlobalCursor(){
    document.documentElement.classList.toggle("NO_SELECTION", false)
    document.documentElement.classList.toggle("NO_POINTER_EVENTS", false)
    if(lastCursorClass){
        document.documentElement.classList.toggle(lastCursorClass, false)
    }
    if(document.documentElement.getAttribute("class") === ""){
        document.documentElement.removeAttribute("class")
    }
}

// CSS
import "./stylesheet.js"

// JS
// - external
import _Observable from "./core/Observable/Observable.js"
import _NodeTemplate from "./core/NodeTemplate/NodeTemplate.js"

export const Observable = _Observable
export const NodeTemplate = _NodeTemplate

// - lib
import * as _http from "./lib/http/http.js"
import * as _dom from "./lib/dom/_collection.js"
import * as _input from "./lib/input/_collection.js"
import * as _state from "./lib/state/state.js"
import * as _browser from "./lib/browser/_collection.js"
import * as _svg from "./lib/svg/_collection.js"

export const http = _http
export const state = _state
export const svg = _svg

export const dom = _dom
/**/export const getElementStyle = dom.getElementStyle
/**/export const isChildOf = dom.isChildOf
/**/export const iterate = dom.iterate
/**/export const setGlobalStyle = dom.setGlobalStyle
/**/export const removeEmptyAttributes = dom.removeEmptyAttributes

export const input = _input
/**/export const mouse = input.mouse
/**//**/export const button = input.mouse.button
/**//**/export const getMousePosition = input.mouse.getMousePosition
/**/export const keyboard = input.keyboard
/**//**/export const MODIFIER_LIST = input.keyboard.MODIFIER_LIST
/**//**/export const isShortcutHit = input.keyboard.isShortcutHit
/**//**/export const isKeyHit = input.keyboard.isKeyHit
/**//**/export const isModifierTheOnlyOne = input.keyboard.isModifierTheOnlyOne
/**//**/export const isModifierHit = input.keyboard.isModifierHit
/**//**/export const isModifierNotHit = input.keyboard.isModifierNotHit
/**//**/export const isAnyModifierHit = input.keyboard.isAnyModifierHit
/**//**/export const isNoModifierHit = input.keyboard.isNoModifierHit

export const browser = _browser
// @todo: rename
/**/export const BROWSER_NAME = browser.BROWSER_NAME
/**/export const BROWSER_NAMES = browser.BROWSER_NAMES


// CSS
import "./stylesheet"

// JS
import _Observable from "./external/Observable/Observable"
import _NodeTemplate from "./external/NodeTemplate/NodeTemplate"
import _BaseModal from "./widgets/modal/BaseModal"
import _ContextMenu from "./widgets/contextmenu/ContextMenu"
import * as _wizard from "./widgets/wizard/_collection"
import * as _http from "./lib/http/http"
import * as _dom from "./lib/dom/_collection"
import * as _input from "./lib/input/_collection"
import * as _state from "./lib/state/state"
import * as _browser from "./lib/browser/_collection"

// - external
export const Observable = _Observable
export const NodeTemplate = _NodeTemplate

// - lib
export const http = _http
export const state = _state
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
/**/export const browser = browser.browser
// @todo: rename
/**//**/export const BROWSER_NAME = browser.BROWSER_NAME
/**//**/export const BROWSER_NAMES = browser.BROWSER_NAMES
// @todo: rename

// - widgets
// @todo: rename to indicate widget
export const BaseModal = _BaseModal
export const ContextMenu = _ContextMenu
export const wizard = _wizard
/**/export const Wizard = wizard.Wizard
/**/export const WizardTabPresenter = wizard.WizardTabPresenter
/**/export const WizardTabView = wizard.WizardTabView
// @todo: rename to indicate widget

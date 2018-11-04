import moduleLogPrefix from "./_log-prefix.js"
import systemLogPrefix from "../_log-prefix.js"
import baseLogPrefix from "../../_log-prefix.js"
const PRE = `${baseLogPrefix}.${systemLogPrefix}.${moduleLogPrefix} |`

import NodeTemplate from "../../core/NodeTemplate/NodeTemplate"
import * as mouse from "../../lib/input/mouse"
import * as dom from "../../lib/dom/_collection"

/**
 * Example (class syntax):
 * $(foo).on("click", $event => {
 *      new ContextMenu($event, foo, {
 *          name: "a entry",
 *          icon: "fa-super",   // would require font-awesome css
 *          fn: () => { console.log("works") }
 *      })
 * })
 * @todo: Validate names, they must be unique.
 * @todo: Add function wrapper: mouse.showContextMenu(foo, bar, baz).
 * @param event: Any mouse event.
 * @param container: The element that acts as container.
 * @param entries: Objects like: { name: String, icon: String, fn: Function }
 */
export default class ContextMenu {
    constructor(event, container, ...entries){
        console.warn("The ContextMenu positioning still needs to be tested!")

        // use originalEvent if a jquery event was passed.
        event = event.originalEvent ? event.originalEvent : event

        // move the context menu to mouse mouse position
        const mousePosition = mouse.getMousePosition(event, container)
        
        this.view = new NodeTemplate(`
            <div class="vc-context-menu" style="
                left: ${mousePosition.x}px;
                top: ${mousePosition.y}px;
            ">
                ${
                    entries.map(e => `
                        <div id="${e.name}" class="${e.class}">
                            <i class="${e.icon}"></i><span>${e.name}</span>
                        </div>`).join("")
                }
            </div>
        `)

        Object.values(this.view.ids).forEach(n => {
            n.onclick = () => {
                entries.find(e => e.name === n.id).fn()
                // execute the context menu function and remove the context menu
                document.body.removeChild(this.view.root)
            }
        })
        
        document.body.appendChild(this.view.fragment)
        
        // remove the context menu on resize
        window.addEventListener("resize", onetime(() => {
            document.body.removeChild(this.view.root)
        }).handler)
        
        // remove the context menu if clicked elsewhere
        window.addEventListener("click", onetime(() => {
            if(!dom.isChildOf(event.target, "vc-context-menu")){
                document.body.removeChild(this.view.root)
            }
        }).handler)
   
    }
}

// create a one-time event
function onetime(callback) {
    // this = window (from event handler)
    const contextHelper = {
        handler: function(){
            // this is still window!
            callback()
            window.removeEventListener(event.type, this.handler)
        }
    }
    return contextHelper
}
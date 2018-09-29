// add chai to env
import { should } from "chai"
import { expect } from "chai"
should()

// add jquery to env
import $ from "jquery"

// actual imports
import { Observable, NodeTemplate } from "../dist/index"

import { data } from "../dist/index"
import { state } from "../dist/index"
import { BaseModal } from "../dist/index"

import { wizard } from "../dist/index"
import { Wizard, WizardTabPresenter, WizardTabView } from "../dist/index"

import { ContextMenu } from "../dist/index"

import { dom } from "../dist/index"
import { getElementStyle, isChildOf, iterate, setGlobalStyle, removeEmptyAttributes } from "../dist/index"

import { input } from "../dist/index"
import { mouse, keyboard } from "../dist/index"

// import { prototype } from "../dist/index"

import { util } from "../dist/index"
import { browser } from "../dist/index"
import { BROWSER_NAME, BROWSER_NAMES } from "../dist/index"


describe("testing imports from /dist/index.js", ()=>{

    it("should import the ext libs for Observable", ()=>{ 
        Observable.should.be.a("function")
        describe("testing the Observable object:", ()=>{
            it("should be able to create an Observable", ()=>{
                const o = new Observable("test")
                o.should.be.an("object")
            })
        })
    })
    it("should import the ext libs for NodeTemplate", ()=>{ 
        NodeTemplate.should.be.a("function")
        describe("testing the NodeTemplate object:", ()=>{
            it("should be able to create a NodeTemplate", ()=>{
                const n = new NodeTemplate("<h1>test</h1>")
                n.should.be.an("object")
            })
        })
    })

    it("should import data:", ()=>{
        data.should.be.an("object")
    })
    it("should import state:", ()=>{
        state.should.be.an("object")
    })
    it("should import BaseModal:", ()=>{
        BaseModal.should.be.a("function")
    })
    it("should import wizard", ()=>{
        wizard.should.be.an("object")
        wizard.Wizard.should.be.a("function")
        wizard.WizardTabPresenter.should.be.a("function")
        wizard.WizardTabView.should.be.a("function")
    })
    it("should import wizard components", ()=>{
        Wizard.should.be.a("function")
        WizardTabPresenter.should.be.a("function")
        WizardTabView.should.be.a("function")
    })
    it("should import ContextMenu components", ()=>{
        ContextMenu.should.be.a("function")
    })

    it("should import dom", ()=>{
        dom.should.be.an("object")
        dom.getElementStyle.should.be.a("function")
        dom.isChildOf.should.be.a("function")
        dom.iterate.should.be.a("function")
        dom.setGlobalStyle.should.be.a("function")    
        dom.removeEmptyAttributes.should.be.a("function")    
    })
    it("should import dom functions", ()=>{
        getElementStyle.should.be.a("function")
        isChildOf.should.be.a("function")
        iterate.should.be.a("function")    
        setGlobalStyle.should.be.a("function")    
        removeEmptyAttributes.should.be.a("function")    
    })

    it("should import input", ()=>{
        input.should.be.an("object")
        input.keyboard.should.be.an("object")
        input.mouse.should.be.an("object")
    })
    it("should import input components", ()=>{
        keyboard.should.be.an("object")
        mouse.should.be.an("object")
    })
    
    // it("should import all prototype extensions", ()=>{
    //     Array.prototype.clone.should.be.a("function")
    //     Array.prototype.top.should.be.a("function")
    //     Function.prototype.equals.should.be.a("function")
    //     Object.prototype.isNumber.should.be.a("function")
    //     Object.prototype.isObject.should.be.a("function")
    //     Object.prototype.getClassName.should.be.a("function")
    //     Object.prototype.clone.should.be.a("function")
    // })
    
    it("should import util", ()=>{
        util.should.be.an("object")
        util.browser.should.be.an("object")
        util.browser.BROWSER_NAMES.should.be.an("array")
        util.browser.BROWSER_NAME.should.be.an("string")
    })
    it("should import browser", ()=>{
        browser.should.be.an("object")
        browser.BROWSER_NAMES.should.be.an("array")
        browser.BROWSER_NAME.should.be.an("string")
    })
    it("should import browser components", ()=>{
        BROWSER_NAMES.should.be.an("array")
        BROWSER_NAME.should.be.an("string")
    })

})
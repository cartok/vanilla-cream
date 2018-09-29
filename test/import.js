// add chai to env
import { should } from "chai"
import { expect } from "chai"
should()

// add jquery to env
import $ from "jquery"

// actual imports
import { Observable, NodeTemplate } from "../dist/index"

import { http } from "../dist/index"
import { state } from "../dist/index"

import { dom } from "../dist/index"
import { getElementStyle, isChildOf, iterate, setGlobalStyle, removeEmptyAttributes } from "../dist/index"

import { svg } from "../dist/index"

import { input } from "../dist/index"
import { mouse, keyboard } from "../dist/index"

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

    it("should import http:", ()=>{
        http.should.be.an("object")
    })
    it("should import state:", ()=>{
        state.should.be.an("object")
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

    it("should import svg", ()=>{
        svg.should.be.an("object")
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
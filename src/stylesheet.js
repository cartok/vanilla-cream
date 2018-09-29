export default (() => {
	const style = document.createElement("style")
    style.title = "vanilla-cream"
	// Add the <style> element to the page
	document.head.appendChild(style)
    return Array.from(document.styleSheets).find(s => s.title === "vanilla-cream")
})()
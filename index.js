document.getElementById("connect").addEventListener("click", e =>{
	chrome.tabs.query({active:true,currentWindow:true},tabs=>{
		chrome.scripting.executeScript({target:{tabId:tabs[0].id}, files:['content.js']})
	})
})
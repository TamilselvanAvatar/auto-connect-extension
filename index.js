ibtnConnect = document.getElementById("connect");
ibtnTimer = document.getElementById("timer-count");
close = false
ibtnConnect.addEventListener("click", e =>{
	chrome.tabs.query({active:true,currentWindow:true},tabs=>{
		chrome.scripting.executeScript({target:{tabId:tabs[0].id}, files:['content.js']})
	})
	
	if(close){
		chrome.runtime.sendMessage({type: "notification", options : { status : "Stop" }})
	}
})


chrome.runtime.onMessage.addListener((msg , request, sender) => {
	console.log("BTN",ibtnConnect)
	console.log("TIM",ibtnTimer)
	console.log(msg)
	if(msg.type === "notification"){
		const text = msg.options.status === "Done" ? "Connection Done" : "Stop Connection";
		ibtnConnect.innerText = text
		// ibtnConnect.disabled = true
		ibtnTimer.innerText = msg.options.count
		close = true
	}
})
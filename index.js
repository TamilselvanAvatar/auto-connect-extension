ibtnConnect = document.getElementById("connect");
ibtnTimer = document.getElementById("timer-count");
clear = 0 
close = false
ibtnConnect.addEventListener("click", e =>{	
	if(close && clear){
		chrome.tabs.query({active:true,currentWindow:true}, function(tab) {
			chrome.tabs.sendMessage(tab[0].id, {status : "Stop" , interval : clear});
		}); 
		ibtnConnect.style.display = "none"
		close = false
	}
	else{

		ibtnConnect.style.backgroundColor = "#ea4646cc"
		ibtnConnect.style.color = "white"
		ibtnConnect.innerText = "Connecting..."
		chrome.tabs.query({active:true,currentWindow:true}, function(tab) {
			chrome.tabs.sendMessage(tab[0].id, {event:true});
		});
	}
})


chrome.runtime.onMessage.addListener((msg , request, sender) => {
	if(msg.type === "notification"){
		const text = msg.options.status === "Done" ? "Connection Done" : "Stop Connection";
		clear = msg.options.clear
		ibtnConnect.innerText = text
		if(msg.options.count === msg.options.total){
			console.log(msg, "disabled")
			ibtnConnect.disabled = true
			ibtnConnect.style.backgroundColor = "##58df44cc"
		} 
		ibtnTimer.innerText = msg.options.count
		close = true
	}
})
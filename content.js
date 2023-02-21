//Get All button details of page
btnAll = document.getElementsByTagName('button')

//Store Connect button details alone
btnConnect = []

countConnect = 0 

for(let i in btnAll){
	
	//Get Connect button from All Button Array
    if(btnAll[i]['ariaLabel'] && btnAll[i]['ariaLabel'].match(/^Invite.*connect$/)){
        btnConnect = [...btnConnect, btnAll[i]]
    }
	
}

// Set Interval to initiate the connect request 
interval =  setInterval (()=>{
	btn = btnConnect.shift();
	btn.style.backgroundColor = "green";
	if(btnConnect.length === 0){
		console.log("Connect request done")
		chrome.runtime.sendMessage({type: "notification", options : { status : "Done" }});
		clearInterval(interval)
	}
	countConnect = countConnect +  1
	chrome.runtime.sendMessage({type: "notification", options: { 
		status: "Connect Request",
		count: countConnect
	}});
},5000)

chrome.runtime.onMessage.addListener((msg , request, sender) => {
	console.log("MSG",msg)
	if(msg.type === "notification"){
		clearInterval(interval)
	}
})

//const event = new MouseEvent("click", {
 //   view: window,
  //  bubbles: true,
 //   cancelable: true,
  //});
//document.getElementById("input").dispatchEvent(event)






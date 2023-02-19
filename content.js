//Get All button details of page
btnAll = document.getElementsByTagName('button')

//Store Connect button details alone
btnConnect = []

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
		clearInterval(interval)
	}
},5000)

//const event = new MouseEvent("click", {
 //   view: window,
  //  bubbles: true,
 //   cancelable: true,
  //});
//document.getElementById("input").dispatchEvent(event)






//Get All button details of page
btnAll = document.getElementsByTagName("button");

//Store Connect button details alone
btnConnect = [];

countConnect = 0;

totalRequest = 0;

interval = 0;

clickEvent = new MouseEvent("click", {
  view: window,
  bubbles: true,
  cancelable: true,
});

chrome.runtime.onMessage.addListener((msg, request, sender) => {
  btnAll = document.getElementsByTagName("button");
  for (let i in btnAll) {
    //Get Connect button from All Button Array
    if (
      btnAll[i]["ariaLabel"] &&
      btnAll[i]["ariaLabel"].match(/^Invite.*connect$/)
    ) {
      btnConnect = [...btnConnect, btnAll[i]];
    }
  }

  totalRequest = btnConnect.length;

  console.log("MSG from Content", msg);
  if (msg?.event) {
    interval = setInterval(() => {
      btn = btnConnect.shift();
	  countConnect = countConnect + 1;
    //   btn.dispatchEvent(clickEvent)
      btn.style.backgroundColor = "green";
      if (btnConnect.length === 0) {
        console.log("Connect request done");
        chrome.runtime.sendMessage({
          type: "notification",
          options: {
            status: "Done",
            count: countConnect,
            total: totalRequest,
          },
        });
        clearInterval(interval);
      } else {
        chrome.runtime.sendMessage({
          type: "notification",
          options: {
            status: "Connect Request",
            count: countConnect,
            clear: interval,
            total: totalRequest,
          },
        });
      }
    }, 5000);
  }
  if (msg?.status === "Stop") {
    clearInterval(msg.interval);
  }
  console.log({ btnAll, btnConnect, countConnect, interval });
});

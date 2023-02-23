//Store Connect button details alone
btnConnect = [];

countConnect = 0;

totalRequest = 0;

interval = 0;

btn = null;

click = null;

send = null;

btnSend = [];

clickEvent = new MouseEvent("click", {
  view: window,
  bubbles: true,
  cancelable: true,
});

class IntervalTimer {
  callbackStartTime;
  remaining = 0;
  paused = false;
  timerId = null;
  _callback;
  _delay;

  constructor(callback, delay) {
    this._callback = callback;
    this._delay = delay;
  }

  pause() {
    if (!this.paused) {
      this.clear();
      this.remaining = new Date().getTime() - this.callbackStartTime;
      this.paused = true;
    }
  }

  resume() {
    if (this.paused) {
      if (this.remaining) {
        setTimeout(() => {
          this.run();
          this.paused = false;
          this.start();
        }, this.remaining);
      } else {
        this.paused = false;
        this.start();
      }
    }
  }

  clear() {
    clearInterval(this.timerId);
  }

  start() {
    this.clear();
    this.timerId = setInterval(() => {
      this.run();
    }, this._delay);
  }

  run() {
    this.callbackStartTime = new Date().getTime();
    this._callback();
  }
}

const execFunc = () => {
  btn = btnConnect.shift();
  click = !!btn && btn.dispatchEvent(clickEvent);
  if (click) {
    btnSend = [...document.querySelectorAll('[aria-label = "Send now"]')];
    // btnSend = [...document.querySelectorAll('[aria-label = "Dismiss"]')];
    send = btnSend.length > 0 && btnSend[0].dispatchEvent(clickEvent);
    if (send) {
      countConnect = countConnect + 1;
      console.log({
        countConnect,
        btnConnect,
        send,
        click,
        time: Date(window.timestamp),
      });
      // btn.style.backgroundColor = "green";
      if (btnConnect.length < 0) {
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
    }
  }
}

chrome.runtime.onMessage.addListener((msg, request, sender) => {
  //Get All button details of page
  btnConnect = [...document.querySelectorAll("span")].filter(
    (el) =>
      el.innerText === "Connect" &&
      el.parentElement["ariaLabel"].match(/^Invite.*connect$/)
  );
  totalRequest = btnConnect.length;

  if (msg?.event) {
    interval = setInterval(execFunc, 5000);
  }
  if (msg?.status === "Stop") {
    clearInterval(msg.interval)
  }
  console.log({ btnConnect, countConnect, interval });
});

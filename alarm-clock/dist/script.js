var sound = new Audio(
  "https://www.freespecialeffects.co.uk/soundfx/animals/duck1.wav"
);
sound.loop = true;
let newAlarms = [];

setDisplay = () => {
  const d = new Date();
  let currentTime = d.toLocaleTimeString();
  document.querySelector("#display").innerHTML = currentTime;
};

setAlarmsToStorage = () => {
  const newAlarmsJson = JSON.stringify(newAlarms);
  localStorage.setItem("alarms", newAlarmsJson);
};

addAlarm = () => {
  newAlarmh = document.querySelector(".hours").value;
  newAlarmM = document.querySelector(".minutes").value;
  newAlarmAmPm = document.querySelector(".amPm").value;
  newAlarms.push(`${newAlarmh}:${newAlarmM}:00 ${newAlarmAmPm}`);
  setAlarmsToStorage();
};

setAlarmList = () => {
  //get items form local storage
  const storedAlarmsJson = localStorage.getItem("alarms");
  const storedAlarms = JSON.parse(storedAlarmsJson);
  //generate html elements from local storage
  console.log(storedAlarms[1], storedAlarms);
  let alarmList = document.querySelector(".alarm-list");

  for (i = 0; i < storedAlarms.length; i++) {
    let newLi = document.createElement("li");
    newLi.innerText = storedAlarms[i];
    alarmList.append(newLi);
  }
};

window.addEventListener("load", setAlarmList);

checkForAlarm = () => {
  let d = new Date();
  let currentTime = d.toLocaleTimeString();
  const storedAlarmsJson = localStorage.getItem("alarms");
  const storedAlarms = JSON.parse(storedAlarmsJson);
  for (i = 0; i <= newAlarms.length; i++) {
    if (currentTime === storedAlarms[i]) {
      sound.play();
    }
  }
};

createHourOptions = () => {
  for (i = 1; i <= 12; i++) {
    var x = document.querySelector(".hours");
    var option = document.createElement("option");
    option.text = i;
    x.add(option);
  }
};

createMinuteOptions = () => {
  for (i = 0; i <= 59; i++) {
    var x = document.querySelector(".minutes");
    var option = document.createElement("option");
    if (i < 10) {
      option.text = "0" + i;
    } else {
      option.text = i;
    }
    x.add(option);
  }
};

document.querySelector("#add-more-alarms").addEventListener("click", () => {
  addAlarm();
  setAlarmList();
});

document.querySelector("#alarm-stop").addEventListener("click", () => {
  sound.pause();
  newAlarms.pop();
});

document.querySelector("#alarm-snooze").addEventListener("click", () => {
  sound.pause();
});

createHourOptions();
createMinuteOptions();
setInterval(setDisplay, 1000);
setInterval(checkForAlarm, 1000);

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

addMoreAlarms = () => {
  newAlarmh = document.querySelector(".hours").value;
  newAlarmM = document.querySelector(".minutes").value;
  newAlarmAmPm = document.querySelector(".amPm").value;
  newAlarms.push(`${newAlarmh}:${newAlarmM}:00 ${newAlarmAmPm}`);
};

setAlarmList = () => {
  let newLi = document.createElement("li");
  let alarmList = document.querySelector(".alarm-list");
  newLi.innerText = newAlarms.slice(-1);
  alarmList.append(newLi);
};

checkForAlarm = () => {
  let d = new Date();
  let currentTime = d.toLocaleTimeString();

  for (i = 0; i <= newAlarms.length; i++) {
    if (currentTime === newAlarms[i]) {
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
  addMoreAlarms();
  setAlarmList();
  console.log(document.querySelector(".date-time").value);
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

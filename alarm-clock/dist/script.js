var sound = new Audio(
  "https://www.freespecialeffects.co.uk/soundfx/animals/duck1.wav"
);
sound.loop = true;
let alarm = [];
let d = new Date();
let currentTime = d.toLocaleTimeString();
const regex = /'\..\'/;

setDisplay = () => {
  const d = new Date();
  let currentTime = d.toLocaleTimeString();
  date = new Date();
  let alarmtime = `${alarm[0]}:${alarm[1]}:${regex} ${alarm[2]}`; //"2:16:15 PM";
  document.querySelector("#display").innerHTML = currentTime;
  // console.log(alarmtime);
  if (alarm.length > 3) {
    alarm.length = 0;
  }
  if (alarmtime === currentTime) {
    sound.play();
  }
};

// adds alarms to ui Creates list items and put that string into a new alarms array to access later.
addMoreAlarms = () => {
  newAlarmh = document.querySelector(".hours").value;
  newAlarmM = document.querySelector(".minutes").value;
  newAlarmAmPm = document.querySelector(".amPm").value;
  let alarmli = document.createElement("li");
  let alarmList = document.querySelector(".alarm-list");
  let newLi = ` Alarm set for ${newAlarmh}:${newAlarmM}:00 ${newAlarmAmPm}`;
  alarmList.append(newLi);
  newAlarms.push(`${newAlarmh}:${newAlarmM}:00 ${newAlarmAmPm}`);
};

let newAlarms = [];

checkForAlarm = () => {
  const alarmList = document.querySelectorAll(".alarm-list li");
  let d = new Date();
  let currentTime = d.toLocaleTimeString();
  for (i = 0; i <= newAlarms.length; i++) {
    let alarmCheck = newAlarms[i];
    if (currentTime === alarmCheck) {
      console.log(currentTime, newAlarms[i]);
      sound.play();
    }
    console.log(currentTime, newAlarms[i]);
  }
};

createHourOptions = () => {
  let newHourOption = document.createElement("option");
  let select = document.querySelector(".hours");
  for (i = 1; i <= 12; i++) {
    var x = document.querySelector(".hours");
    var option = document.createElement("option");
    option.text = i;
    x.add(option);
  }
};

createMinuteOptions = () => {
  let newMinuteOption = document.createElement("option");
  let select = document.querySelector(".minutes");
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

document.querySelector("#alarm-set").addEventListener("click", () => {
  setAlarm();
});

document.querySelector("#add-more-alarms").addEventListener("click", () => {
  addMoreAlarms();
});

document.querySelector("#alarm-stop").addEventListener("click", () => {
  sound.pause();
  alarm.length = 0;
  newAlarms.pop();

  document.querySelector(".alarm-display").innerHTML = " ";
});

document.querySelector("#alarm-snooze").addEventListener("click", () => {
  checkForAlarm();
});

//setDisplay();
createHourOptions();
createMinuteOptions();
setInterval(setDisplay, 1000);
setInterval(checkForAlarm, 1000);

/*
setAlarm = () => {
  alarm.push(document.querySelector(".hours").value);
  alarm.push(document.querySelector(".minutes").value);
  alarm.push(document.querySelector(".amPm").value);
  document.querySelector(
    ".alarm-display"
  ).innerHTML = `Alarm is set for ${alarm[0]}:${alarm[1]} ${alarm[2]}`;
};
*/

var sound = new Audio(
  "https://www.freespecialeffects.co.uk/soundfx/animals/duck1.wav"
);
sound.loop = true;
let newAlarms = [];
let alarmList = document.querySelector(".alarm-list");
const alarmToggleBtn = document.querySelector('.alarm-ctn-toggle');


setDisplay = () => {
  const d = new Date();
  let currentTime = d.toLocaleTimeString();
  document.querySelector("#display").innerHTML = currentTime;
};

addAlarmToStorage = () => {
  const newAlarmh = document.querySelector(".hours").value;
  const newAlarmM = document.querySelector(".minutes").value;
  const newAlarmAmPm = document.querySelector(".amPm").value;
  newAlarms.push(`${newAlarmh}:${newAlarmM}:00 ${newAlarmAmPm}`);
  const newAlarmsJson = JSON.stringify(newAlarms);
  localStorage.setItem("alarms", newAlarmsJson);
  console.log(localStorage.getItem("alarms"));
};

setAlarmList = () => {
  const storedAlarmsJson = localStorage.getItem("alarms");
  const storedAlarms = JSON.parse(storedAlarmsJson);
  let alarmList = document.querySelector(".alarm-list");
  storedAlarms.forEach((storedAlarms) => {
    createLi(alarmList, storedAlarms);
  });
};

updateAlarmList = () => {
  let alarmList = document.querySelector(".alarm-list");
  createLi(alarmList, newAlarms.slice(-1));
};

createLi = (x, y) => {
  let newLi = document.createElement("li");
  newLi.innerHTML = y;
  x.append(newLi);
};

const clearAllAlarms = () => {
  localStorage.clear();
  alarmList.innerHTML =  localStorage.getItem('alarms')
};

checkForAlarm = () => {
  let d = new Date();
  let currentTime = d.toLocaleTimeString();
  const storedAlarmsJson = localStorage.getItem("alarms");
  const storedAlarms = JSON.parse(storedAlarmsJson);
  for (i = 0; i <= storedAlarms.length; i++) {
    if (currentTime === storedAlarms[i]) {
      sound.play();
    } else {
      console.log("no alarm");
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

alarmToggleBtn.addEventListener('click', ()=>{
  alarmctn = document.querySelector('.alarm-ctn')
  alarmctn.classList.toggle('hide')
  console.log('click')
})

document.querySelector("#add-more-alarms").addEventListener("click", () => {
  addAlarmToStorage();
  updateAlarmList();
});

document.querySelector("#alarm-stop").addEventListener("click", () => {
  sound.pause();
  clearAllAlarms();
  newAlarms.pop();
});

document.querySelector("#alarm-snooze").addEventListener("click", () => {
  sound.pause();
});
window.addEventListener("load", setAlarmList);

createHourOptions();
createMinuteOptions();
setInterval(setDisplay, 1000);
setInterval(checkForAlarm, 1000);

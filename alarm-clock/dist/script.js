var sound = new Audio(
  "https://www.freespecialeffects.co.uk/soundfx/animals/duck1.wav"
);
const todayDate = new Date();

sound.loop = true;
let newAlarms = [];
let alarmList = document.querySelector(".alarm-list");
const alarmToggleBtn = document.querySelector(".alarm-ctn-toggle");
document.querySelector('.date-time').setAttribute('min', new Date())

setDisplay = () => {
  const d = new Date();
  let currentTime = d.toLocaleTimeString();
  document.querySelector("#display").innerHTML = currentTime;
};

addAlarmToStorage = () => {
  const newAlarmh = document.querySelector(".hours").value;
  const newAlarmM = document.querySelector(".minutes").value;
  const newAlarmAmPm = document.querySelector(".amPm").value;
  const dateInput = document.querySelector(".date-time");
  const selectedDate = dateInput.value;
  newAlarmInputObj = {
    newTimeInput: `${newAlarmh}:${newAlarmM}:00 ${newAlarmAmPm}`,
    newDateInput: selectedDate,
    repeat: false,

  };
  newAlarms.push(newAlarmInputObj);
  const newAlarmsJson = JSON.stringify(newAlarms);
  localStorage.setItem("alarms", newAlarmsJson);
  let storedAlarmsJson = localStorage.getItem("alarms");
  let storedAlarms = JSON.parse(storedAlarmsJson);
  console.log(storedAlarms[0].newTimeInput, storedAlarms[0].newDateInput);
};

checkForAlarm = () => {
  let d = new Date();
  let currentTime = d.toLocaleTimeString();
  const storedAlarmsJson = localStorage.getItem("alarms");
  const storedAlarms = JSON.parse(storedAlarmsJson);
  if (storedAlarms) {
    for (i = 0; i < storedAlarms.length; i++) {
      if(storedAlarms[i].newTimeInput === currentTime && storedAlarms[i].newDateInput === d)
      // if (storedAlarms.some((alarmTime) => alarmTime === currentTime)) {
        sound.play();
      }
    }
  }
//};

setAlarmList = () => {
  let storedAlarmsJson = localStorage.getItem("alarms");
  let storedAlarms = JSON.parse(storedAlarmsJson);
 
  if (storedAlarms === null) {
    console.log("no stored alarms");
    return;
  } else
    storedAlarms.forEach((storedAlarms) => {
      createLi(alarmList, storedAlarms.newTimeInput);
    });
};

updateAlarmList = () => {
  console.log(newAlarms.slice(-1)[0].newTimeInput)
  createLi(alarmList, newAlarms.slice(-1)[0].newTimeInput);
};

createLi = (x, y) => {
  let newLi = document.createElement("li");
  newLi.innerHTML = y;
  x.append(newLi);
};

const clearAllAlarms = () => {
  localStorage.clear();
  alarmList.innerHTML = localStorage.getItem("alarms");
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

alarmToggleBtn.addEventListener("click", () => {
  alarmctn = document.querySelector(".alarm-ctn");
  alarmctn.classList.toggle("hide");
});

document.querySelector("#add-more-alarms").addEventListener("click", () => {
  addAlarmToStorage();
  updateAlarmList();
});

document.querySelector("#alarm-stop").addEventListener("click", () => {
  sound.pause();
});

document.querySelector("#alarm-snooze").addEventListener("click", () => {
  sound.pause();
  setInterval(() => {
    sound.play();
  }, 30000);
});

window.addEventListener("load", setAlarmList);

createHourOptions();
createMinuteOptions();
setInterval(setDisplay, 1000);

const storedAlarmsJson = localStorage.getItem("alarms");
const storedAlarms = JSON.parse(storedAlarmsJson);

if (storedAlarms === null) {
  console.log("no alarms in storage");
} else {
  setInterval(checkForAlarm, 1000);
  console.log(newAlarms);
}

const alarmListItems = document.querySelectorAll(".alarm-list li");
//not working
document.addEventListener("DOMContentLoaded", () => {
  alarmListItems.forEach((alarmListItem) => {
    alarmListItem.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("click");
    });
  });
});

settingsBtnClick = () => {
  console.log("should open settings tab open");
};

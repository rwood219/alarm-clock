const sounds = [
  "https://freesound.org/s/707050/",
  "https://www.freespecialeffects.co.uk/soundfx/animals/duck1.wav",
];
const sound = new Audio(sounds[0]);
sound.loop = true;
const todaysDate = new Date();
let newAlarms = [];
let alarmList = document.querySelector(".alarm-list");
const alarmToggleBtn = document.querySelector(".alarm-ctn-toggle");
const storedAlarmsJson = localStorage.getItem("alarms");
const storedAlarms = JSON.parse(storedAlarmsJson);
const brightnessSlider = document.getElementById("brightness");

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
  let selectedDate = dateInput.value;
  const repeatToggle = document.querySelector("#repeat");
  if (!selectedDate) {
    selectedDate = todaysDate;
  }
  if (selectedDate && newAlarmh && newAlarmM && newAlarmAmPm) {
    newAlarmInputObj = {
      newTimeInput: `${newAlarmh}:${newAlarmM}:00 ${newAlarmAmPm}`,
      newHourInput: newAlarmh,
      newMinuteInput: newAlarmM,
      newDateInput: selectedDate,
      repeat: false,
    };

    newAlarms.push(newAlarmInputObj);
    const newAlarmsJson = JSON.stringify(newAlarms);
    localStorage.setItem("alarms", newAlarmsJson);
  } else {
    alert("invalid entry");
  }
};
setInterval(() => {
  console.log(new Date().getSeconds());
  if (storedAlarms === null) {
    console.log("No Alarms Stored");
    return;
  }
  if (new Date().getSeconds() === 0) {
    checkForAlarm();
    console.log("zero");
  }
}, 1000);

checkForAlarm = () => {
  let isoDate = new Date().toISOString().slice(1, 10);
  let currentTime = new Date().toLocaleTimeString();
  const storedAlarmsJson = localStorage.getItem("alarms");
  const storedAlarms = JSON.parse(storedAlarmsJson);
  // console.log(new Date().getSeconds())
  if (storedAlarms) {
    for (i = 0; i < storedAlarms.length; i++) {
      const currentStoredAlarm = storedAlarms[i];
      if (
        currentStoredAlarm.repeat === true &&
        currentStoredAlarm.newTimeInput === currentTime
      ) {
        sound.play();
        console.log(currentStoredAlarm, "Alarm triggered");
      } else if (
        currentStoredAlarm.newTimeInput === currentTime &&
        currentStoredAlarm.newDateInput === isoDate
      ) {
        sound.play();
        console.log("Alarm triggered");
      }
    }
  }
};

setAlarmList = () => {
  let storedAlarmsJson = localStorage.getItem("alarms");
  let storedAlarms = JSON.parse(storedAlarmsJson);

  if (storedAlarms === null) {
    console.log("no stored alarms");
    return;
  } else {
    storedAlarms.forEach((storedAlarms) => {
      createLi(
        alarmList,
        `${storedAlarms.newTimeInput}${" "}${storedAlarms.newDateInput.slice(
          5,
          10
        )}`
      );
    });
  }
};
updateAlarmList = () => {
  createLi(
    alarmList,
    `${
      newAlarms.slice(-1)[0].newTimeInput
    }${" "}${storedAlarms.newDateInput.slice(5, 10)}`
  );
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

brightnessSlider.addEventListener("input", function () {
  const brightnessValue = this.value; // Get the current slider value
  const brightnessPercentage = brightnessValue + "%";

  document.body.style.filter = `brightness(${brightnessPercentage})`;
});

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
  const settingsPopup = document.querySelector(".settings-popup");
  settingsPopup.classList.toggle("hide");
};



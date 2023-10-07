var sound = new Audio(
  "https://www.freespecialeffects.co.uk/soundfx/animals/duck1.wav"
);
sound.loop = true;

let alarm = [];

setDisplay = () => {
  date = new Date();
  currentTime = date.toLocaleTimeString();
  //let alarmtime = "7:55:00 PM";
  let alarmtime = `${alarm[0]}:${alarm[1]}:00 ${alarm[2]}`; //"2:16:15 PM";
  document.querySelector("#display").innerHTML = currentTime;
  console.log(alarmtime);
  if (alarm.length > 3) {
    alarm.length = 0;
  }
  if (alarmtime === currentTime) {
    sound.play();
  }
};

setAlarm = () => {
  date = new Date();
  let alarmHour = document.querySelector(".hours").value;
  let alarmMinute = document.querySelector(".minutes").value;
  alarm.push(alarmHour);
  alarm.push(alarmMinute);
  alarm.push(document.querySelector(".amPm").value);
  document.querySelector(
    ".alarm-display"
  ).innerHTML = `Alarm is set for ${alarm[0]}:${alarm[1]} ${alarm[2]}`;
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

document.querySelector("#alarm-stop").addEventListener("click", () => {
  sound.pause();
  alarm.length = 0;
  document.querySelector(".alarm-display").innerHTML = " ";
});

document.querySelector("#alarm-snooze").addEventListener("click", () => {
  console.log(alarm.length);
});

setDisplay();
createHourOptions();
createMinuteOptions();
setInterval(setDisplay, 1000);

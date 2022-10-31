import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix, { Notify } from "notiflix";

const input = document.getElementById("datetime-picker"),
    btnStart = document.querySelector("[data-start]"),
    daysValue = document.querySelector("[data-days]"),
    hoursValue = document.querySelector("[data-hours]"),
    minValue = document.querySelector("[data-minutes]"),
    secValue = document.querySelector("[data-seconds]");

btnStart.disabled = true;
let deadline = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
            Notify.failure("Please choose a date in the future");
        } else {
            btnStart.disabled = false;
            return (deadline = selectedDates[0]);
        }
    },
};
flatpickr(input, options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}

btnStart.addEventListener("click", () => {
    let timerId = setInterval(() => {
        const todayDate = new Date().getTime();
        const diff = deadline.getTime() - todayDate;
        let newDay = convertMs(diff).days;
        daysValue.textContent = addLeadingZero(newDay);
        let newHour = convertMs(diff).hours;
        hoursValue.textContent = addLeadingZero(newHour);
        let newMinute = convertMs(diff).minutes;
        minValue.textContent = addLeadingZero(newMinute);
        let newSecond = convertMs(diff).seconds;
        secValue.textContent = addLeadingZero(newSecond);

        if (diff < 1000) {
            Notiflix.Notify.success("Countdown finished");
            clearInterval(timerId);
        }
        getDifference();
    }, 1000);
});

// function updateClock() {
//     var t = getTimeRemaining(endtime);
//     clock.innerHTML =
// "days: " +
// t.days +
// "  " +
// "hours: " +
// t.hours +
// "  " +
// "minutes: " +
// t.minutes +
// "  " +
// "seconds: " +
// t.seconds;
//     if (t.total <= 0) {
//         clearInterval(timeinterval);
//     }
// }

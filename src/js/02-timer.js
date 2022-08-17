import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    input: document.querySelector('#datetime-picker'),
    timerDays: document.querySelector('span[data-days]'),
    timerHours: document.querySelector('span[data-hours]'),
    timerMinutes: document.querySelector('span[data-minutes]'),
    timerSeconds: document.querySelector('span[data-seconds]'),
};

let selectedDate;

const today = new Date();
refs.startBtn.setAttribute('disabled', true);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: today,
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() <= today.getTime()) {
            Notiflix.Notify.failure("Please choose a date in the future");
            
        } 
        else {
            refs.startBtn.removeAttribute('disabled');
            
            return (selectedDate = selectedDates[0].getTime());
        }    
    }
};

flatpickr(refs.input, options);
refs.startBtn.addEventListener('click', startTimer);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

function startTimer(e) {
    refs.startBtn.setAttribute('disabled', true);
  setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;
    if (deltaTime <= 0) {
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    refs.timerDays.textContent = addLeadingZero(days);
    refs.timerHours.textContent = addLeadingZero(hours);
    refs.timerMinutes.textContent = addLeadingZero(minutes);
    refs.timerSeconds.textContent = addLeadingZero(seconds);
  }, 1000);
};

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
     
    return { days, hours, minutes, seconds };
}
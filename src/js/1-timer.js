import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= new Date()) {
      btn.setAttribute('disabled', '');
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      btn.removeAttribute('disabled');
      userSelectedDate = selectedDates[0];
    }
  },
};
flatpickr('#datetime-picker', options);

let userSelectedDate;

console.log(userSelectedDate);

const btn = document.querySelector('button');
const input = document.querySelector('#datetime-picker');
const daysVal = document.querySelector('[data-days]');
const hoursVal = document.querySelector('[data-hours]');
const minutesVal = document.querySelector('[data-minutes]');
const secondsVal = document.querySelector('[data-seconds]');

btn.addEventListener('click', handleStartClick);
function handleStartClick(event) {
  const curMoment = new Date();
  btn.setAttribute('disabled', '');
  input.setAttribute('disabled', '');
  let timeDiff = userSelectedDate - curMoment;
  const intervalId = setInterval(updateCount, 1000);
  function updateCount() {
    if (timeDiff < 1000) {
      clearInterval(intervalId);
      btn.removeAttribute('disabled');
      input.removeAttribute('disabled');
      daysVal.textContent = '00';
      hoursVal.textContent = '00';
      minutesVal.textContent = '00';
      secondsVal.textContent = '00';
    } else {
      const countdowm = convertMs(timeDiff);
      console.log(
        countdowm.days,
        countdowm.hours,
        countdowm.minutes,
        countdowm.seconds
      );
      daysVal.textContent = addLeadingZero(countdowm.days);
      hoursVal.textContent = addLeadingZero(countdowm.hours);
      minutesVal.textContent = addLeadingZero(countdowm.minutes);
      secondsVal.textContent = addLeadingZero(countdowm.seconds);
      timeDiff -= 1000;
    }
  }
}

//=====================================================================

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

//==========================================

function addLeadingZero(value) {
  const fullNumber = value.toString().padStart(2, '0');
  return fullNumber;
}

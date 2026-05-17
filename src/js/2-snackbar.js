// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');

form.addEventListener('submit', handleFormSubmit);
function handleFormSubmit(event) {
  event.preventDefault();
  const selectedRadio = form.querySelector('input[name="state"]:checked');

  const state = selectedRadio.value;

  const delayInput = form.querySelector('input[name="delay"]');
  const delay = Number(delayInput.value);
  console.log(delay);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: '',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
  delayInput.value = '';
}

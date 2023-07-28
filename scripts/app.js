const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.card img');
const icon = document.querySelector('.icon img');
const formInput = document.querySelector('form input');
const forecast = new Forecast();
const updateUI = (data) => {
  const { cityDets, weather } = data;

  details.innerHTML = `<h5 class="my-3">${cityDets.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>`;

  let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

  time.setAttribute('src', timeSrc);

  let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

cityForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityForm.city.value.trim();
  cityForm.reset();
  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.error(err));

  localStorage.setItem('city', city);
  formInput.setAttribute('placeholder', city);
});
if (localStorage.getItem('city')) {
  forecast
    .updateCity(localStorage.getItem('city'))
    .then((data) => updateUI(data))
    .catch((err) => console.error(err));
  formInput.setAttribute('placeholder', localStorage.getItem('city'));
}

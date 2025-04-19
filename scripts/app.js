const app = Vue.createApp({
  data() {
    return {
      user: {
        name: '',
        age: '',
        picture: ''
      },
      weatherInput: {
        city: 'London',
        province: 'Ontario',
        country: 'Canada'
      },
      weather: {
        temperature: '',
        wind: '',
        description: ''
      },
      definition: {
        word: '',
        phonetic: '',
        definition: ''
      }
    };
  },
  methods: {
    randomUser() {
      fetch('https://comp6062.liamstewart.ca/random-user-profile')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.log('An error occurred. Please try again.');
          }
        })
        .then(data => {
          this.user.name = `${data.first_name} ${data.last_name}`;
          this.user.age = data.age;
          this.user.picture = data.profile_picture;
        })
        .catch(error => {
          console.log('Total Failure', error);
        });
    },

    getWeather() {
      const { city, province, country } = this.weatherInput;// Construct the weather API URL using user i/ps
      const url = `https://comp6062.liamstewart.ca/weather-information?city=${encodeURIComponent(city)}&province=${encodeURIComponent(province)}&country=${encodeURIComponent(country)}`;
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.log('An error occurred. Please try again.');
          }
        })
        .then(data => {
          this.weather.temperature = data.temperature;
          this.weather.wind = data.wind_speed;
          this.weather.description = data.weather_description;
        })
        .catch(error => {
          console.log('Weather error:', error);
        });
    },

    defineWord() {
      if (!this.wordQuery.trim()) return;
        const url = `https://comp6062.liamstewart.ca/define?word=${this.wordQuery}`;
  
        fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.log('An error occurred. Please try again.');
          }
        })
          .then(data => {
            const first = data[0];
            this.definition = {
              word: first.word,
              phonetic: first.phonetic,
              definition: first.definition
            };
          })

        .catch(error => {
          console.error("Definition Fetch Error:", error);
          alert("Failed to fetch definition. Please check the word.");
        });
    }
  },

  created() {
    this.randomUser();
    this.getWeather();
  },
});

app.mount('#app');

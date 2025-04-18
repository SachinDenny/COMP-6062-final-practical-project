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
      dictionaryInput: '',
      definition: {
        word: '',
        phonetic: '',
        meaning: ''
      },
      posts: [] // for fetchData()
    };
  },
  methods: {
    randomUser() {
      fetch('http://comp6062.liamstewart.ca/random-user-profile')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.log('An error occurred. Please try again.');
            throw new Error('Fetch failed');
          }
        })
        .then(data => {
          this.user.name = `${data.firstName} ${data.lastName}`;
          this.user.age = data.age;
          this.user.picture = data.picture;
        })
        .catch(error => {
          console.log('Total Failure', error);
        });
    },

    getWeather() {
      const { city, province, country } = this.weatherInput;
      const url = `http://comp6062.liamstewart.ca/weather-information?city=${encodeURIComponent(city)}&province=${encodeURIComponent(province)}&country=${encodeURIComponent(country)}`;
      
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.log('Failed to fetch weather.');
            throw new Error('Weather fetch failed');
          }
        })
        .then(data => {
          this.weather.temperature = data.temperature;
          this.weather.wind = data.wind;
          this.weather.description = data.description;
        })
        .catch(error => {
          console.log('Weather error:', error);
        });
    },

    defineWord() {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.dictionaryInput}`)
        .then(response => {
          if (response.ok) return response.json();
          throw new Error('Failed to fetch definition');
        })
        .then(data => {
          const entry = data[0];
          this.definition.word = entry.word;
          this.definition.phonetic = entry.phonetic || 'N/A';
          this.definition.meaning = entry.meanings[0].definitions[0].definition;
        })
        .catch(error => {
          console.error('Definition Fetch Error:', error);
        });
    },
  },

  // Call randomUser & weather right after instance is created
  created() {
    this.randomUser();
    this.getWeather();
    this.defineWord();
  },
});

app.mount('#app');

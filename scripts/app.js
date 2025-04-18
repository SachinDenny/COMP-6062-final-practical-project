const app=Vue.createApp({
    data(){
        return{
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
              }
        };
    },
    

    methods: {
        clearfields(){
            this.firstname='',
            this.lastName='',
            this.quantity=0
        }
    }
});
app.mount('#app');
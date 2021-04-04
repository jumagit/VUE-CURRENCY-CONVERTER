     //const key = 'f2105ec80d64900c8014';
     const urlKey = 'https://free.currconv.com/api/v7/currencies?apiKey=f2105ec80d64900c8014';

     new Vue({
          el: '#app',
          data: {
               currencies: {},
               amount: 0,
               from: 'EUR',
               to: 'USD',
               result: 0
          },
          mounted() {

               this.getCurrencies();

          },
          computed: {

               formattedCurrencies() {

                    return Object.values(this.currencies);
               },
               calculate_amount(){
               	return Number(this.result)*Number(this.amount);
               }


          },
          methods: {

               convertCurrency() {

                    const key = `${this.from}_${this.to}`;

                    axios.get(`https://free.currconv.com/api/v7/convert?q=${key}&compact=ultra&apiKey=f2105ec80d64900c8014`)
                         .then(response => {

                              var answer = Object.values(response.data)
                              this.result = answer[0];
                         })

               },
               getCurrencies() {

                    const currencies = localStorage.getItem('currencies');

                    if (currencies) {

                         this.currencies = JSON.parse(currencies);

                         return;
                    }

                    axios.get(urlKey)
                         .then(response => {

                              this.currencies = response.data.results;
                              localStorage.setItem('currencies', JSON.stringify(response.data.results));

                         })

               }
          }
     })
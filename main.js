
const basket = [
  {
    name: "One-Punch Man, Vol. 5",
    price: 10.02,
    quantity: 0,
    discount:5
  },
  {
    name: "Batman '66, Vol. 5",
    price: 9.98,
    quantity: 0,
    discount:5
  },
  {
    name: "Dragon Ball Freeza Arc, Vol. 1",
    price: 15.98,
    quantity: 0,
    discount:5
  },
  {
    name: "Uzumaki: Spiral into Horror, Vol. 1",
    price: 4.84,
    quantity: 0,
    discount:5
  },
  {
    name: "Superman: Red Son (New Edition)",
    price: 10.93,
    quantity: 0,
    discount:5
  }
];

new Vue({
     el:'#basket',
     data: {
          products:basket
     },
     computed: {
          total: function(){
          
          let total = [];
          
          Object.entries(this.products).forEach(([key, val]) => {
          total.push(val.price) // the value of the current key.
          });
          
          return total.reduce(function(total, num){ return total + num }, 0);
          
          },
          discount:function()
          {
               let total = [];
               
               Object.entries(this.products).forEach(([key, val]) => {
               total.push(val.price) // the value of the current key.
               });
               
               return total.reduce(function(total, num){ return total + num }, 0);
               
               },
          }
     },
     methods: {
          
     }
})
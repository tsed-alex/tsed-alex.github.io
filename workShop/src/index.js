 function toggleCheckBox() {
   const checkBox = document.querySelectorAll('#discount-checkbox');

   checkBox.forEach((item) => {
     item.addEventListener('change', (event) => {

       if (event.currentTarget.checked) {
         event.currentTarget.nextElementSibling.classList.add('checked');
       } else {
         event.currentTarget.nextElementSibling.classList.remove('checked');
       }
     });
   });
 }

 // work with bascket
 function toggleBasket() {
   const btnCart = document.getElementById('cart');
   const modalCart = document.querySelector('.cart');
   const btnCloseModal = document.querySelector('.cart-close');

   btnCart.addEventListener('click', () => {
     modalCart.style.display = 'flex';
     document.body.style.overflow = 'hidden';
   });

   btnCloseModal.addEventListener('click', () => {
     modalCart.style.display = 'none';
     document.body.style.overflow = '';
   });
 }

 //add card to basket
 function toggleAddCard() {
   const cards = document.querySelectorAll('.goods .card');
   const cartWrapper = document.querySelector('.cart-wrapper');
   const emptyCart = document.querySelector('#cart-empty');
   const countGoods = document.querySelector('.counter');

   cards.forEach(item => {
     const btn = item.querySelector('.btn.btn-primary');
     btn.addEventListener('click', (event) => {

       const cardClone = item.cloneNode(true);
       const btnInBasket = cardClone.querySelector('.btn.btn-primary');
       btnInBasket.textContent = "Удалить из корзины";
       btnInBasket.addEventListener('click', () => {
         cardClone.remove();
         showCountItem();
       });

       cartWrapper.appendChild(cardClone);

       showCountItem();
     });
   });

   function showCountItem() {
     const count = cartWrapper.querySelectorAll('.card');
     const cartPrice = cartWrapper.querySelectorAll('.card-price');
     const cartTotal = document.querySelector('.cart-total span');
     //console.log('cartTotal: ', cartTotal);
     let sum = 0;
     countGoods.textContent = count.length;

     if (count.length !== 0) {
       emptyCart.remove();
     } else {
       cartWrapper.appendChild(emptyCart);
     }

     cartPrice.forEach((item) => {
       sum += parseFloat(item.textContent);

     });
     cartTotal.textContent = sum;
     //console.log(sum);
     //console.log(count.length);
   }
 }

 // filter saller
 function actionPage(){
   const cards = document.querySelectorAll('.goods .card');
   const discountCheckBox = document.querySelector('#discount-checkbox');

   const min = document.querySelector('#min');
   const max = document.querySelector('#max');

   const search = document.querySelector('.search-wrapper_input');
   const searchBtn = document.querySelector('.search-btn');

   discountCheckBox.addEventListener('click',()=>{
    cards.forEach((item)=>{
      const scale = item.querySelector('.card-sale');
      if(discountCheckBox.checked){
        if(scale){
          item.parentNode.style.display='block';
        }else{
          item.parentNode.style.display='none';
        }
      }
      else{
        item.parentNode.style.display='block';
      }
      /*const scale = item.querySelector('.card-sale');
      console.log(scale);*/
    });
   });

   function filterPrice(){
    cards.forEach( item => {
      const cardPrice = item.querySelector('.card-price');
      const price = parseFloat(cardPrice.textContent);
      //console.log(min);
      //console.log(max);
      if( (min.value && price < min.value) || (max.value && price > max.value) ){  // продумать правильную логику
        item.parentNode.style.display='none';
      }else{
        item.parentNode.style.display='';
      }
    });
   }
   min.addEventListener('change', filterPrice);
   max.addEventListener('change', filterPrice);

   searchBtn.addEventListener('click', () =>{  //ещё ентер попробовать добавить
     const serchText = new RegExp(search.value.trim(), 'i');
     cards.forEach(item => {
       const title = item.querySelector('.card-title');
       if(!serchText.test(title.textContent)){
        item.parentNode.style.display='none';
       }else {
        item.parentNode.style.display='';
       }
     });
     //console.log('serchText: ', serchText);
   });
 };
 // end filter

 function actionPageCustom(){
  const cards = document.querySelectorAll('.goods .card');
  let psevdoCards = [];

  cards.forEach( item => {
    psevdoCards.push({
      linkCard:item,
      price:true,
      scale:true
    });
  });
  //console.log(psevdoCards);

  const discountCheckBox = document.querySelector('#discount-checkbox');

  const min = document.querySelector('#min');
  const max = document.querySelector('#max');

  const search = document.querySelector('.search-wrapper_input');
  const searchBtn = document.querySelector('.search-btn');

  discountCheckBox.addEventListener('click',()=>{
    psevdoCards.forEach((item)=>{
     const scale = item.linkCard.querySelector('.card-sale');
     //console.log(scale);

     if(discountCheckBox.checked){
       if(scale){
         item.scale = true;
       }else{
        item.scale = false;
       }
     }
     else{
      item.scale = true;
     }
     
   });

   filterArbitr();
  });


  function filterPrice(){
    psevdoCards.forEach( item => {
     const cardPrice = item.linkCard.querySelector('.card-price');
     const price = parseFloat(cardPrice.textContent);     
     
     if( (min.value && price < min.value) || (max.value && price > max.value) ){  // продумать правильную логику
      item.price = false;       
     }else{
      item.price = true;       
     }
   });
   //console.log(psevdoCards);
   filterArbitr();
  }

  min.addEventListener('change', filterPrice);
  max.addEventListener('change', filterPrice);

  searchBtn.addEventListener('click', () =>{  //ещё ентер попробовать добавить
    const serchText = new RegExp(search.value.trim(), 'i');
    cards.forEach(item => {
      const title = item.querySelector('.card-title');
      if(!serchText.test(title.textContent)){
       item.parentNode.style.display='none';
      }else {
       item.parentNode.style.display='';
      }
    });
    //console.log('serchText: ', serchText);
  });

  // функция, которая принимает решение, отображать элемент или нет
  function filterArbitr(){
    psevdoCards.forEach( item => {
      if( item.scale && item.price ){
        item.linkCard.parentNode.style.display='';
      }else{
        item.linkCard.parentNode.style.display='none';
      }

    });
    //console.log(psevdoCards);
  }
 }

 toggleCheckBox();

 toggleBasket();

 toggleAddCard();

 //actionPage();

 actionPageCustom();
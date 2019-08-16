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
 function actionPage() {
   const cards = document.querySelectorAll('.goods .card');
   const discountCheckBox = document.querySelector('#discount-checkbox');

   const min = document.querySelector('#min');
   const max = document.querySelector('#max');

   const search = document.querySelector('.search-wrapper_input');
   const searchBtn = document.querySelector('.search-btn');

   discountCheckBox.addEventListener('click', () => {
     cards.forEach((item) => {
       const scale = item.querySelector('.card-sale');
       if (discountCheckBox.checked) {
         if (scale) {
           item.parentNode.style.display = 'block';
         } else {
           item.parentNode.style.display = 'none';
         }
       } else {
         item.parentNode.style.display = 'block';
       }
       /*const scale = item.querySelector('.card-sale');
       console.log(scale);*/
     });
   });

   function filterPrice() {
     cards.forEach(item => {
       const cardPrice = item.querySelector('.card-price');
       const price = parseFloat(cardPrice.textContent);
       //console.log(min);
       //console.log(max);
       if ((min.value && price < min.value) || (max.value && price > max.value)) { // продумать правильную логику
         item.parentNode.style.display = 'none';
       } else {
         item.parentNode.style.display = '';
       }
     });
   }
   min.addEventListener('change', filterPrice);
   max.addEventListener('change', filterPrice);

   searchBtn.addEventListener('click', () => { //ещё ентер попробовать добавить
     const serchText = new RegExp(search.value.trim(), 'i');
     cards.forEach(item => {
       const title = item.querySelector('.card-title');
       if (!serchText.test(title.textContent)) {
         item.parentNode.style.display = 'none';
       } else {
         item.parentNode.style.display = '';
       }
     });
     //console.log('serchText: ', serchText);
   });
 }
 // end filter

 function actionPageCustom() {
   const cards = document.querySelectorAll('.goods .card');
   let psevdoCards = [];
   let curentActiveCategory = 'ALL';

   cards.forEach(item => {
     psevdoCards.push({
       linkCard: item,
       price: true,
       scale: true,
       category: item.dataset.category
     });
     //console.log(item.dataset.category);
   });
   //console.log(psevdoCards);

   const discountCheckBox = document.querySelector('#discount-checkbox');

   const min = document.querySelector('#min');
   const max = document.querySelector('#max');

   const search = document.querySelector('.search-wrapper_input');
   const searchBtn = document.querySelector('.search-btn');

   const categoryBtn = document.querySelector('.catalog-button');//catalog-list

   categoryBtn.addEventListener('click', (event)=>{     
     if(event.target.nodeName === 'LI'){
      curentActiveCategory = event.target.textContent;
      filterArbitr();      
     }
     console.log(curentActiveCategory);
   });

   discountCheckBox.addEventListener('click', () => {
     psevdoCards.forEach((item) => {
       const scale = item.linkCard.querySelector('.card-sale');
       //console.log(scale);

       if (discountCheckBox.checked) {
         if (scale) {
           item.scale = true;
         } else {
           item.scale = false;
         }
       } else {
         item.scale = true;
       }

     });

     filterArbitr();
   });


   function filterPrice() {
     psevdoCards.forEach(item => {
       const cardPrice = item.linkCard.querySelector('.card-price');
       const price = parseFloat(cardPrice.textContent);

       if ((min.value && price < min.value) || (max.value && price > max.value)) { // продумать правильную логику
         item.price = false;
       } else {
         item.price = true;
       }
     });
     //console.log(psevdoCards);
     filterArbitr();
   }

   min.addEventListener('change', filterPrice);
   max.addEventListener('change', filterPrice);

   searchBtn.addEventListener('click', () => { //ещё ентер попробовать добавить
     const serchText = new RegExp(search.value.trim(), 'i');
     cards.forEach(item => {
       const title = item.querySelector('.card-title');
       if (!serchText.test(title.textContent)) {
         item.parentNode.style.display = 'none';
       } else {
         item.parentNode.style.display = '';
       }
     });
     //console.log('serchText: ', serchText);
   });

   // функция, которая принимает решение, отображать элемент или нет
   function filterArbitr() {
     psevdoCards.forEach(item => {
       if (item.scale && item.price && ((curentActiveCategory === 'ALL') || (item.category === curentActiveCategory))) {
         item.linkCard.parentNode.style.display = '';
       } else {
         item.linkCard.parentNode.style.display = 'none';
       }

     });
     //console.log(psevdoCards);
   }
 }

 // getting data from the server
 function getData() {
   const goodsWraper = document.querySelector('.goods');
   return fetch('https://tsed-alex.github.io/workShop/db/db.json').then((Response) => {
       if (Response.ok) {
         return Response.json();
       } else {
         throw new Error("Данные не были получены: " + Response.status);
       }
     })
     .then(data => {
       return data;
     })
     .catch((err) => {
       console.warn(err);
       goodsWraper.innerHTML = '<div style="color:red; font-size:30px">Упс, что-то пошло не так!</div>';
     });
   //console.log(fetch('../db/db.json'));
 }

 function renderCards(data) {
   const goodsWraper = document.querySelector('.goods');
   data.goods.forEach((item) => {
     const card = document.createElement('div');
     card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
     card.innerHTML = `
     
                <div class="card" data-category='${item.category}'>
                ${item.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}									
									<div class="card-img-wrapper">
										<span class="card-img-top"
											style="background-image: url('${item.img}')"></span>
									</div>
									<div class="card-body justify-content-between">
										<div class="card-price">${item.price} ₽</div>
										<h5 class="card-title">${item.title}</h5>
										<button class="btn btn-primary">В корзину</button>
									</div>
								</div>
							
     `;
     goodsWraper.appendChild(card);
   });
   /*
      toggleCheckBox();

      toggleBasket();

      toggleAddCard();

      //actionPage();

      actionPageCustom();*/
 }

 // end getting data
 function renderCatalog() {
   const cards = document.querySelectorAll('.goods .card');
   const catalogList = document.querySelector('.catalog-list');
   const catalogBtn = document.querySelector('.catalog-button');
   const catalogCol = new Set();

   cards.forEach((card) => {
     catalogCol.add(card.dataset.category);
     //console.log('card: ', cards);
     //console.log('card.dataset.category: ', card.dataset.category);
   });
   //console.log(catalogCol);
   catalogCol.forEach((item) => {
     const liElem = document.createElement('li');
     liElem.textContent = item;
     catalogList.appendChild(liElem);
   });
   const allCategor = document.createElement('li');
   allCategor.textContent = 'ALL';
   catalogList.appendChild(allCategor);//на скору руку

   catalogBtn.addEventListener('click', () => {
     if (document.querySelector('.catalog').style.display) {
       document.querySelector('.catalog').style.display = '';
     } else {
       document.querySelector('.catalog').style.display = "block";
     }
   });
 }

 getData().then((data) => {
   renderCards(data);
   renderCatalog();

   toggleCheckBox();
   toggleBasket();
   toggleAddCard();
   //actionPage();
   actionPageCustom();
   
 });
/* total price of all booked movies */
let priceTotal = 0;
/* get container where all booked movies will be placed */
let cartMoviesContainer = document.querySelector('#booking__movies');
/* message if cart is empty */
let emptyCartMssg = document.createElement('h3');

function addToCart(element){
    /* container for this movie */
    let movieContainer = element.closest('.repertoire__movie'); 
    let moviePrice = movieContainer.querySelector('.repertoire__movie-price').innerText; // price of this movie
    let movieName = movieContainer.querySelector('h3').innerText; // name of this movie
    let movieQuantity = movieContainer.querySelector('input').value; // quantity as a result of user input

    /* check if user enter a quantity, otherwise warn him */
    if(parseFloat(movieQuantity) > 0) {
        movieContainer.setAttribute('style', 'background-color: #b9d2df'); // add background color for selected movie
        moviePrice = moviePrice.substring(9); // get rid of $
        moviePrice = parseFloat(moviePrice); // convert string to number
        let totalPriceMovie = moviePrice * parseInt(movieQuantity); // calculate the total amount of this movie (price * quantity)
        totalPriceMovie = parseFloat(totalPriceMovie.toFixed(2)); // short total price on two decimals

        /* create paragraph where movie will be added in the cart */
        let cartMovie = document.createElement('p');

        cartMovie.innerHTML = `<div class="booking__movie">
                                    <h4>${movieName}</h4>
                                    <p>$${moviePrice} x ${movieQuantity} = <span>$<span>${totalPriceMovie}</span></span> &nbsp;</p>
                                    <button onclick="removeFromCart(this)" class="booking__removeBtn">REMOVE</button>
                              </div>`;

        cartMoviesContainer.appendChild(cartMovie); // append paragraph to the container for all cart movies

        /* if cart is empty, add 'h3' element with message, otherwise remove it */
        let countMovies = document.querySelectorAll('#booking__movies p').length; // checkout amount of booked movies
        if(countMovies == 0){
            cartMoviesContainer.appendChild(emptyCartMssg);
            emptyCartMssg.innerHTML = 'The cart is empty';
        } else {
            emptyCartMssg.remove();
        }

        /* get prices of all movies together */
        priceTotal += totalPriceMovie;
    
        document.querySelector('#booking__total p').innerText = `Total: $${parseFloat(priceTotal.toFixed(2))}`;
        document.querySelector('#booking__total p').style.fontWeight = 'bold';

        /* after user booked movie, change its background and disable user from adding it again */
        element.style.background = 'linear-gradient(90deg, rgba(2,61,90,1) 0%, rgba(8,97,140,1) 100%)';
        element.style.color = 'white';
        element.innerText = 'CANCEL';
        element.setAttribute('disabled', 'true');
    } else {
        alert('Pick quantity');
    }
}

function removeFromCart(element) {
    /* get movie from cart */
    let movieCart = element.closest('.booking__movie');
    let movieCartPrice = movieCart.querySelector('p span > span').innerText; // get price of movie added in the cart 
    let movieCartName = movieCart.querySelector('h4').innerText; // get name of movie added in the cart 

    /* substruct totalprice with price of the removed element */
    movieCartPrice = parseFloat(movieCartPrice);
    priceTotal -= parseFloat(movieCartPrice);
    document.querySelector('#booking__total p').innerHTML = `Total: $${parseFloat(priceTotal.toFixed(2))}`; // update total

    /* remove movie from cart */
    let cartMovieRemove = movieCart.closest('p');
    cartMovieRemove.remove();

    /* get all movies from the repertoire */
    let allMovies = document.querySelectorAll('.repertoire__movie');
    /* Compare movieName from repertoire and cart; enable button and set input value on the zero for removed movie */
    allMovies.forEach(function(movie) {
        let movieName = movie.querySelector('.repertoire__movie-info h3').innerText;
        if(movieName === movieCartName){
            movie.querySelector('.repertoire__movie-booking input').value = 0;
            movie.querySelector('.repertoire__movie-booking button').removeAttribute('disabled');
            movie.querySelector('.repertoire__movie-booking button').innerText = 'ADD';
            movie.querySelector('.repertoire__movie-booking button').style.background = 'linear-gradient(90deg, rgba(18,212,237,1) 0%, rgba(124,210,221,1) 100%)';
            movie.querySelector('.repertoire__movie-booking button').style.color = 'black';
            movie.closest('.repertoire__movie').setAttribute('style', 'background-color: rgba(255,255,255, 1)'); // add new background color for removed movie
        }
    });

    /* if cart is empty, add 'h3' element with message, otherwise remove it */
    let countMovies = document.querySelectorAll('#booking__movies p').length; 
    if(countMovies == 0){
        cartMoviesContainer.appendChild(emptyCartMssg);
        emptyCartMssg.innerHTML = 'THE CART IS EMPTY';
        emptyCartMssg.style.textAlign = 'center';
        emptyCartMssg.style.fontSize = '20px';
        emptyCartMssg.style.padding = "20px 0";
        emptyCartMssg.style.color = 'rgba(31, 69, 122, 0.8)';
    } else {
        emptyCartMssg.remove();
    }
}


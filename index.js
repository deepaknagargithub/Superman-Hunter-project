var searchBar = document.querySelector('#input')


// Create a array in localstorage

let myLocalStorage = window.localStorage;
if (!myLocalStorage.getItem('superheroID')) {
    let arr = [];
    myLocalStorage.setItem('superheroID', JSON.stringify(arr));
}

myLocalStorage.setItem('showSuperHero', '');




// addEventListener to search superhero

searchBar.addEventListener('keyup', getsearchsuperhero)

function getsearchsuperhero() {

    var list = document.querySelector('#list')
    list.innerHTML = `<h1 style='color:white;'>Loading Super Heroes .... </h1>`

    var xhrRequest = new XMLHttpRequest();

    xhrRequest.onload = function () {


        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(xhrRequest.response);
            console.log(data)

            if (data.response === 'error') {
                list.innerHTML = `<h1 style='color:white;'>Oops ! There is no super hero with such name, please make sure that you are spelling it correctly :</h1>`
            }



            if (searchBar.value != data['results-for']) {
                return;
            }

            list.innerHTML = ''



            for (let hero of data.results) {

                let heroCard = document.createElement('div');
                console.log(heroCard)
                heroCard.setAttribute('id', 'heroCard');
                heroCard.className = 'hero-card'



                // // function for info of superhero 

                // heroCard.onclick = function () {
                //     selectedHero(hero.id)
                // };


                var nameOfHero = document.createElement('div');
                var infoOfHero = document.createTextNode(hero.name);
                nameOfHero.classList = "fst-italic"
                nameOfHero.appendChild(infoOfHero);
                nameOfHero.style.color = 'white';


                console.log(nameOfHero)


                let imageOfHero = document.createElement('img');
                console.log(imageOfHero)
                imageOfHero.setAttribute("src", hero.image.url ?? "./image/bad.jpg");
                imageOfHero.style.borderRadius = '50%'
                imageOfHero.style.height = '100px'
                imageOfHero.style.width = '100px'
                imageOfHero.style.display = 'block'


                let favButton = document.createElement('button')
                favButton.classList = 'favbtn'
                favButton.classList = 'btn btn-secondary'
                favButton.style.fontSize = '8px'
                favButton.style.marginTop = '10px'
                console.log(favButton)



                var arr = JSON.parse(localStorage.getItem('superheroID'))

                console.log(arr)

                if (arr.includes(hero.id)) {

                    favButton.style.color = '#460b0b';
                    favButton.style.backgroundColor = 'white'
                    favButton.innerHTML = '<span> Favourite <i class = "fas fa-heart"></i> </span> ';

                } else {
                    favButton.style.color = '#460b0b';
                    favButton.style.backgroundColor = 'white'
                    favButton.innerHTML = '<span> Add to Favourites <i class = "fas fa-heart"></i> </span> ';
                }

                favButton.onclick = function (event) { addToFavourite(event, hero.id, favButton) };

                heroCard.appendChild(nameOfHero);
                heroCard.appendChild(imageOfHero);
                heroCard.appendChild(favButton);
                list.appendChild(heroCard);


            }

        }
    }

    xhrRequest.open('get', 'https://superheroapi.com/api.php/1500237820345742/search/' + searchBar.value, true)
    xhrRequest.send();

}



function addToFavourite(event, hero_id, favButton) {

    var data = JSON.parse(myLocalStorage.getItem('superheroID'))
    console.log(data)

    if (data.includes(hero_id)) {

        favButton.innerHTML = '<span> Add to Favourites </span> <i class = "fas fa-heart"></i>';

    } else {

        favButton.innerHTML = '<span> Favourite </span> <i class = "fas fa-heart"></i>';
        data.push(hero_id)

    }

    myLocalStorage.setItem('superheroID', JSON.stringify(data));
    event.stopPropagation();

}




// function selectedHero(hero_id) {

//     myLocalStorage.setItem('showSuperHero', hero_id);
//     document.getElementById('input').value = '';
//     window.location.assign("infoOfHero.html");

// }

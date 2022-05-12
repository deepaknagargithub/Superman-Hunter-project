let displayfavouriteslist = document.querySelector('.displayfavouriteslist')

let myLocalStorage = window.localStorage;

var favId = myLocalStorage.getItem('superheroID')

var arr = JSON.parse(favId)

console.log(arr)

for (var heroId of arr) {


    var url = 'https://superheroapi.com/api.php/1500237820345742/' + heroId;

    var xhrRequest = new XMLHttpRequest();


    xhrRequest.onload = function () {

        if (this.readyState == 4 && this.status == 200) {


            var data = JSON.parse(this.responseText);
            console.log(data)


            let heroCard = document.createElement('div');
            heroCard.setAttribute('id', 'heroCard');
            heroCard.className = 'hero-card'
            heroCard.id = 'hero-card' + heroId;

            console.log(heroCard.id)

            var nameOfHero = document.createElement('div');
            var infoOfHero = document.createTextNode(data.name);
            nameOfHero.appendChild(infoOfHero);
            nameOfHero.style.color = 'white';




            let imageOfHero = document.createElement('img');
            imageOfHero.setAttribute("src", data.image.url ?? "./");
            imageOfHero.style.borderRadius = '50%'
            imageOfHero.style.height = '100px'
            imageOfHero.style.width = '100px'
            imageOfHero.style.display = 'block'


            let deleteButton = document.createElement('button')
            deleteButton.classList = 'deletebtn'
            deleteButton.style.marginTop = '10px'



            deleteButton.innerHTML = `<i class = "fas fa-trash"> </i>`;
            deleteButton.onclick = function (event) { deleteFromFavourite(event, data.id, heroCard.id) };

            heroCard.appendChild(nameOfHero);
            heroCard.appendChild(imageOfHero);
            heroCard.appendChild(deleteButton);

            displayfavouriteslist.appendChild(heroCard);


        }

    }


    xhrRequest.open('get', url, true)
    xhrRequest.send();

}


function deleteFromFavourite(event, id, favHeroCard) {

    for (let he in arr) {

        if (arr[he] == id) {
            var tempArr = arr[he];
            arr.splice(he, 1);
            console.log("deleting", tempArr);
            break;
        }
        console.log(arr);

    }

    myLocalStorage.setItem("superheroID", JSON.stringify(arr));
    var card = document.getElementById(favHeroCard);
    card.remove();
    event.stopPropagation();
    
}







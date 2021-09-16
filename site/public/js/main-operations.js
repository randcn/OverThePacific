
let restaurants;
let viewMore;


window.addEventListener("load", function() {

    restaurants = document.querySelectorAll(".restaurant_card");
    viewMore = document.querySelector(".viewMore");

    restaurants = document.querySelectorAll(".restaurant_card");
    setOriginalDisplay();
    if (viewMore!=null) {
        viewMore.addEventListener("click", () => {
            viewMoreItems();
        });
    }

});


function setOriginalDisplay() {
    if (restaurants.length !=0 && restaurants.length<=10)  {

        viewMore.innerHTML = "That's all restaurants in this city";
    }
    for (let i = 0; i < restaurants.length; i++) {
        if (i < 10) {
            restaurants[i].style.display = "flex";
        } else {
            restaurants[i].style.display = "none";
        }
    }
}

function viewMoreItems(){
    if (viewMore.innerHTML == "Collapse") {
        setOriginalDisplay()
        viewMore.innerHTML = "More restaurants...";
    } else {
        for (let i = 0; i < restaurants.length; i++) {
            if (restaurants[i].style.display == "none") {
                for (let j = i; (j < i + 10 && j<restaurants.length); j++) {
                    restaurants[j].style.display = "flex";
                }
                break;
            }
        }
    }
    if (restaurants[restaurants.length - 1].style.display  == "flex")  {
        viewMore.innerHTML = "Collapse";
    }
}

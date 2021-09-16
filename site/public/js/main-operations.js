window.addEventListener("load", function() {

    const restaurants = document.querySelectorAll(".restaurant_card");
    const viewMore = document.querySelector(".viewMore");
    const restaurantsContainer = document.querySelector("#restaurants_container");

    setOriginalReviewDisplay()

    viewMore.addEventListener("click", () => {
        if (viewMore.innerHTML == "Collapse") {
            setOriginalReviewDisplay()
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


        restaurantsContainer.addEventListener("load", function() {
            alert("load");
            setOriginalReviewDisplay()
        })

    });

    function setOriginalReviewDisplay() {
        if (restaurants[restaurants.length - 1].style.display  == "flex")  {
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

});



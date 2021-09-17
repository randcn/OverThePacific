// choose city

window.addEventListener("load", function() {
    const citySelect = document.querySelector("#citySelect");
    const cityArr= document.querySelectorAll(".city");
    const selectedCity = citySelect.getAttribute("selectedCity")

    for (let i = 0; i < cityArr.length; i++) {
        if (cityArr[i].value === selectedCity) {
            cityArr[i].selected = true;

        }
    }
});


function selectOnchange() {

    const citySelect = document.querySelector("#citySelect");

    const cityIndex = citySelect.selectedIndex;
    const city = citySelect.options[cityIndex].value;
    const restaurantsDiv = document.querySelector("#restaurants_container");



           $.ajax({
               type: "POST",
               url: "/city",
               data: {city: city},
               success: function (data) {
                   if (data !== undefined) {
                       $("#restaurants_container").load(location.href + " #restaurants_container");


                   }
               }
           })




    let sleep = function(time){
        setTimeout(()=>{

            displayRestaurant();
        },time);
    }

    sleep(1000);

    function displayRestaurant() {
        restaurants = document.querySelectorAll(".restaurant_card");
        viewMore = document.querySelector(".viewMore");
        setOriginalDisplay();
        if (viewMore != null) {
            viewMore.addEventListener("click", () => {
                viewMoreItems();
            });
        }
    }
}



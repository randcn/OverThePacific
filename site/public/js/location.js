// choose city
function selectOnchange() {

    const citySelect = document.querySelector("#citySelect");
    const cityIndex = citySelect.selectedIndex;
    const city = citySelect.options[cityIndex].value;
    const restaurantsDiv = document.querySelector("#restaurants_container");


        console.log(city);
        $.ajax({
            type: "POST",
            url: "/city",
            data: {city: city},
            success: function (data) {
                if (data == "1") {
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

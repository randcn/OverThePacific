// choose city
function selectOnchange() {

    const citySelect = document.querySelector("#citySelect");
    const cityIndex = citySelect.selectedIndex;
    const city = citySelect.options[cityIndex].value;
    const restaurantsDiv = document.querySelector("#restaurants_container");
    restaurants = document.querySelectorAll(".restaurant_card");
    viewMore = document.querySelector(".viewMore");

        console.log(city);
        $.ajax({
            async: false,
            type: "POST",
            url: "/city",
            data: {city: city},
            success: function (data) {
                if (data == "1") {
                    $("#restaurants_container").load(location.href + " #restaurants_container");
                    setOriginalDisplay();
                    if (viewMore!=null) {
                        viewMore.addEventListener("click", () => {
                            viewMoreItems();
                        });
                    }
                }
            }
        })
}

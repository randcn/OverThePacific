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
        success: function(data){
            if (data == "1") {
                $("#restaurants_container").load(location.href + " #restaurants_container");
            }
        }})


}

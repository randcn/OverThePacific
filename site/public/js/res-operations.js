// commenter delete and author hide

window.addEventListener("load", function() {

    const submitRateBtn = document.querySelector(".button1");
    const starLabels = document.querySelectorAll(".lables");
    const stars = document.querySelectorAll(".stars");
    const review = document.querySelector(".Input_text");
    const restaurantName =  document.querySelector(".restaurantName");

    let star;
    for (let i = 0; i < starLabels.length; i++) {
        starLabels[i].addEventListener("click", () => {
            star = i+1;
            stars[i].setAttribute("checked","checked")
        });
    }

    submitRateBtn.addEventListener("click", () => {
        let reviewText = review.value;
        let business_id=restaurantName.getAttribute("business_id")
        insertReview(business_id,reviewText,star)
    });

    function insertReview(business_id,reviewText,star){
        var result = '';
        $.ajax({
            async: false,
            type: "POST",
            url: "/insertReview",
            data: {business_id:business_id, reviewText: reviewText,star: star},
            dataType: "json",
            success: function (callback) {
                result = callback;
            },
            error: function (jqXHR) {
                alert("error happens: " + jqXHR.status);
            }
        });
    }



});

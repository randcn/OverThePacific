// commenter delete and author hide

window.addEventListener("load", function() {

    const submitRateBtn = document.querySelector(".button1");
    const starLabels = document.querySelectorAll(".lables");
    const stars = document.querySelectorAll(".stars");
    const review = document.querySelector(".Input_text");
    const restaurantName =  document.querySelector(".restaurantName");
    const Navigation =  document.querySelector(".button");
    const reviews = document.querySelectorAll(".comment");
    const viewMore = document.querySelector(".class4");


    let starRate=5;
    for (let i = 0; i < 4; i++) {


        starLabels[i].addEventListener("click", () => {
            stars[4].removeAttribute("checked")
            starRate = i+1;
            stars[i].setAttribute("checked","checked");
        });
    }

    submitRateBtn.addEventListener("click", () => {
        let reviewText = review.value;
        if (reviewText==""){
            reviewText = starRate + " stars";
        }
        let business_id=restaurantName.getAttribute("business_id");
        let result = insertReview(business_id,reviewText,starRate);
        if (result) {
            submitRateBtn.disabled = true;
            review.disabled = true;
            confirm("Review submitted successfully. Please refresh page to review your review information.");
        }
    });

    viewMore.addEventListener("click", () => {
        for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].style.display == "none") {
                alert(i);
              for (let j=i;j<i+10;j++){
                  reviews[j].style.display = "block";
                  alert(j);
              }
              break;
            }
        }
    });

    Navigation.addEventListener("click", () => {
        alert("start Navigation");
    });

    setOriginalReviewDisplay ()

    function setOriginalReviewDisplay () {
        for (let i = 0; i < reviews.length; i++) {
            if (i < 9) {
                reviews[i].style.display = "block";
            } else {
                reviews[i].style.display = "none";
            }
        }
    }

    function insertReview(business_id,reviewText,stars){
        var result = '';
        $.ajax({
            async: false,
            type: "POST",
            url: "/insertReview",
            data: {business_id:business_id, reviewText: reviewText,starRate: starRate},
            dataType: "json",
            success: function (callback) {
                result = callback;
            },
            error: function (jqXHR) {
                alert("error happens: " + jqXHR.status);
            }
        });
        return result;
    }
});

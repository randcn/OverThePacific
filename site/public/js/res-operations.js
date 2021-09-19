
window.addEventListener("load", function() {

    const submitRateBtn = document.querySelector("#button1");
    const starLabels = document.querySelectorAll(".lables");
    const stars = document.querySelectorAll(".stars");
    const review = document.querySelector(".Input_text");
    const restaurantName =  document.querySelector(".restaurantName");
    const Navigation =  document.querySelector(".button");
    const reviews = document.querySelectorAll(".comment");
    const viewMore = document.querySelector(".class4");

    setOriginalReviewDisplay ();
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
            alert("Review inserted successfully");
        }
    });

    viewMore.addEventListener("click", () => {
        viewMoreItems()
    });

    function setOriginalReviewDisplay () {
        if (reviews.length==0) {
            viewMore.innerHTML = "No reviews for this restaurant."
            return;
        }
       if (reviews.length <=10)  {
            viewMore.innerHTML = "That's all reviews for the restaurants";
            return;
        }
        for (let i = 0; i < reviews.length; i++) {
            if (i < 10) {
                reviews[i].style.display = "block";
            } else {
                reviews[i].style.display = "none";
            }
        }
    }

    function viewMoreItems(){
        if (viewMore.innerHTML == "Collapse") {
            setOriginalReviewDisplay()
            viewMore.innerHTML = "More reviews...";
        } else {
            for (let i = 0; i < reviews.length; i++) {
                if (reviews[i].style.display == "none") {
                    for (let j = i; (j < i + 10 && j<reviews.length); j++) {
                        reviews[j].style.display = "block";
                    }
                    break;
                }
            }
        }
        if (reviews[reviews.length - 1].style.display  == "block")  {
            viewMore.innerHTML = "Collapse";
        }
    }


    function insertReview(business_id,reviewText,starRate){
        var result = '';
        $.ajax({
            async: false,
            type: "POST",
            url: "/insertReview",
            data: {business_id:business_id, reviewText: reviewText,starRate: starRate},
            dataType: "json",
            success: function (callback) {
                result = callback;
                if (result) {
                    $("#comments").load(location.href + " #comments");
                }
            },
            error: function (jqXHR) {
                alert("error happens: " + jqXHR.status);
            }
        });
        return result;
    }

});

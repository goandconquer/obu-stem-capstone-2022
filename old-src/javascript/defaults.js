//
// This code handles the toggling of the mobile-friendly menu. 
//

var hamburger = document.getElementById("burger");
var nav = document.getElementById("nav")
var navToggled = false;

hamburger.addEventListener("click", function() {

    (navToggled ? (nav.style.marginTop = "-250px", navToggled = false) : (nav.style.marginTop = "0", navToggled = true));

});
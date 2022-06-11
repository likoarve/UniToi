function addUser(username, password) {
    if (localStorage.getItem(username)) {
        alert("User already exists");
        document.getElementById("myform").reset();
        return false
    }

    localStorage.setItem(username, password);
    alert("Sign in successful! Please log in to your account.")
    return true;
}
    
function checkLogin(username, password) {
    if (localStorage.getItem(username) == password) {
        sessionStorage.setItem("user", username);
        return true;
    } 

    document.getElementById("myform").reset();
    alert("Incorrect Username or Password.")
    return false;
}

function isLoggedIn() {
    if (sessionStorage.getItem("user")) {
        return true;
    } else {
        alert("Please log in to use this function");
        return false;
    }
}

function logOut() {
    var x = confirm("Do you want to log out?");
    if (x) {
        sessionStorage.removeItem("user");
    }
}

function header() {
    
    if (sessionStorage.getItem("user")) {
        document.getElementById("login-or-logout").style.display = "none";
    }
}

function addFilter(name, checkbox) {
    var x = "";
    x += name.toLowerCase();

    for (var index = 0; index < checkbox.length; index++) {
        if (checkbox[index].checked) {
            x += ";" + checkbox[index].value;
        }
    }

    sessionStorage.setItem("filter", x);
}

function noFilter() {
    sessionStorage.removeItem("filter");
}

function toilets() {
    try {
        var filters = sessionStorage.getItem("filter").split(";");
    } catch(TypeError) {
        return;
    }

    // Create toilets
    var toilets = new Array();
    toilets.push({name: "School of Information Technology, Level 1", filters:"shower;handicap;unisex;rating;clean;near"});
    toilets.push({name: "Seymour Centre, Level 1", filters:"handicap;unisex;clean;near;spacious;rating"});
    toilets.push({name: "Electrical Engineering Building (J03), 5th Floor", filters:"handicap;unisex"});
    toilets.push({name: "Scitech Library, Level 1", filters:"rating;handicap;baby;spacious"});
    toilets.push({name: "Wentworth Building, Level 1", filters:"rating;handicap;unisex;spacious"});
    toilets.push({name: "Carslaw Building, Main Entrance", filters:"handicap;spacios"});
    toilets.push({name: "New Law Building, Level 2", filters:"rating;handicap;shower;spacious;clean"});
    toilets.push({name: "Fisher Library, Level 2", filters:"rating;shower;handicap;unisex;baby;clean"});
    toilets.push({name: "Abercrombie Business School, Ground Floor", filters:"rating;handicap;unisex;baby;spacios;clean"});
    toilets.push({name: "Abercrombie Business School, Basement B2", filters:"rating;handicap;shower;clean"});
    


    for (var i = 0; i < toilets.length; i++) {
        // Check if name matches
        if (filters[0].length > 0) {
            var toiletName = toilets[i].name.toLowerCase();
            if (!toiletName.includes(filters[0])) {
                document.getElementById("toilet" + (i + 1)).style.display = "none";
                continue;
            }
        }

        // Iterate through filters
        for (var j = 1; j < filters.length; j++) {
            if (!toilets[i].filters.includes(filters[j])) {
                document.getElementById("toilet" + (i + 1)).style.display = "none";
            }
        }  
    }
}

function showReview() {
    if (sessionStorage.getItem("user")) {
        var reviewForm = document.getElementById("create-review")
        if (reviewForm.style.display === "none") {
            reviewForm.style.display = "block";
        } else {
            reviewForm.style.display = "none";
        }
    } else {
        alert("You must be logged in to write a review.")
    }
}

function createReview(content, rating) {
    document.getElementById("new-review").style.display = "block";
    document.getElementById("new-review-name").innerHTML = sessionStorage.getItem("user");
    document.getElementById("new-review-content").innerHTML = content;
    document.getElementById("new-review-rating").innerHTML = rating;
    document.getElementById("create-review").style.display = "none";
}

function deleteReview() {
    document.getElementById("new-review").style.display = "none";
}

function editReview() {
    document.getElementById("new-review").style.display = "none";
    document.getElementById("create-review").style.display = "block";
}


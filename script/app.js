var input = "";
CardHistory = [];
cards = [];
var counter = 0;
var input__text = document.querySelector('.input__text');
var SubmitButton = document.getElementById("SubmitButton");
var image = document.getElementById("card");
var HistoryDivPage1 = document.getElementById("HistoryPage1");
var HistoryDivPage2 = document.getElementById("HistoryPage2");
var CategoryHeader = document.getElementById("CategoryHeader");
var LoadingImage = document.getElementById("LoadingImageContainer");

$("input[name='qualities']").change(function () {
    var selectedOption = document.querySelector('input[name="qualities"]:checked');
    console.log(selectedOption.value);
    console.log(selectedOption.name);
    GetAllCards(selectedOption);
    window.location.href = "#HistoryPage2";
    clearRadios(selectedOption.name);
});
$("input[name='sets']").change(function () {
    var selectedOption = document.querySelector('input[name="sets"]:checked');
    console.log(selectedOption.value);
    console.log(selectedOption.name);
    GetAllCards(selectedOption);
    window.location.href = "#HistoryPage2";
    clearRadios(selectedOption.name);
});
$("input[name='races']").change(function () {
    var selectedOption = document.querySelector('input[name="races"]:checked');
    console.log(selectedOption.value);
    console.log(selectedOption.name);
    GetAllCards(selectedOption);
    window.location.href = "#HistoryPage2";
    clearRadios(selectedOption.name);
});

SubmitButton.addEventListener("click", function () {
    GetCard(input__text.value);
    input__text.value = '';
});

document.addEventListener('keypress', function (e) {
    if (e.keyCode == 13) {
        GetCard(input__text.value);
        input__text.value = '';
    }
});

function GetAllCards(input) {
    LoadingImage.style.visibility = 'visible';
    console.log("ready!");
    $.ajaxSetup({
        headers: {
            'X-Mashape-Key': '4aO7VuyDYPmshwWUYzHBugXnxeWZp1K13ZmjsntzvFKhksBQab'
        }
    });
    console.log(input.name);
    console.log(input.value);
    $.ajax({
        url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/" + input.name + "/" + input.value,
        success: function (result) {
            bindHTMLMultipleCards(result)
        },
        error: function (result) {

        }
    });

    CategoryHeader.innerHTML = input.name + " - " + input.value;
}


function GetCard(input) {
    $.ajaxSetup({
        headers: {
            'X-Mashape-Key': '4aO7VuyDYPmshwWUYzHBugXnxeWZp1K13ZmjsntzvFKhksBQab'
        }
    });
    $.ajax({
        url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/" + input,
        success: function (result) {
            bindHTMLOneCard(result);
            input__text.placeholder = 'card found';
            input__text.classList.remove('Invalid')
        },
        error: function (result) {
            input__text.className += ' Invalid';
            input__text.placeholder = 'card not found';
        }
    });
}

function bindHTMLMultipleCards(data) {
    removeAllOutput();
    var contents = "";
    for (var i = 0; i < data.length; i++) {
        if (data[i].img) {
            // var element = document.createElement("img");
            // element.setAttribute("src", data[i].img);
            // element.className = "HistoryImages"
            // HistoryDivPage2.appendChild(element);
            var newImage = '<div><img src="' + data[i].img + '" class="HistoryImages"/></div>';
            contents += newImage;
        }
    }
    HistoryDivPage2.innerHTML = contents;
    LoadingImage.style.visibility = 'hidden';
}

function bindHTMLOneCard(data) {
    var sliderValue = document.getElementById('slider').checked;
    if (sliderValue == true) {
        card.src = data[0].imgGold;
        CardHistory.push(data[0].imgGold);
    }
    else {
        card.src = data[0].img;
        CardHistory.push(data[0].img);
    }

    var element = document.createElement("img");
    element.setAttribute("src", CardHistory[counter]);
    element.className = "HistoryImages";
    var newdiv = document.createElement('article');
    HistoryDivPage1.appendChild(newdiv);
    newdiv.appendChild(element);
    counter += 1;
}

function removeAllOutput() {
    var o = document.querySelectorAll('.HistoryImages');
    console.log(o);
    for (var i = 0; i < o.length; i++) {
        console.log(o[i]);
        o[i].remove();
    }
}

function clearRadios(name) {
    var radio = document.querySelectorAll('input[type=radio]')
    for (x = 0; x < radio.length; x++) {
        if (radio[x].name != name) {
            radio[x].checked = false;
        }
        else {

        }
    }
}
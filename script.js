
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function LocationsCalculate() {
	var locarr = [] 
	for (var i = 0; i < 26; i++) {
		locarr.push(i + 11)
	}
	locarr.splice(6,4)
	locarr.splice(12,4)
	return locarr;
}
function DeckArrFunc() {
	var Arr = [];
	for (var i = 0; i < 52; i++) {
		Arr.push(i + 1);
	}

	for (var i = 0; Arr.length > 9; i++) {
		var except = getRandomInt(1, Arr.length);
		Arr.splice(except,1)
	}
	for (var i = 0; i < 9; i++) {
		Arr.push(Arr[i]);
	}
	return Arr;
}

function DeckArrFinalFunc() {
	var DeckArrFinal = []
	for (var i = 0; i < 18; i++) {
		var RandomDeck = getRandomInt(0, DeckArr.length);
		var RandomCoordinates = getRandomInt(0, LocationsArr.length);
		DeckArr[RandomDeck] = {
			id: DeckArr[RandomDeck],
			location: LocationsArr[RandomCoordinates]
		}
		DeckArrFinal.push(DeckArr[RandomDeck]);
		LocationsArr.splice(RandomCoordinates, 1);
		DeckArr.splice(RandomDeck, 1);

	}
	return DeckArrFinal;
}

if (window.location.toString().indexOf('game.html') > 0)
	{
		window.onload = function(){
			function ShowCards(){
				for (var y = 0; y < 18; y++) {
					var IdString = String(DeckArrFinal[y].location);
					document.getElementById(IdString).style.background = ("url(cards/" + DeckArrFinal[y].id + ".png)")
				}
			}

			ShowCards();

			setTimeout( function () { 
				for (var y = 0; y < 18; y++) {
					var IdString = String(DeckArrFinal[y].location);
					document.getElementById(IdString).style.background = ("url(assets/back.jpg)")
				}
			}, 5000);
		}		
	}


function openCard(id){
	var opened = [];
	opened = document.getElementsByClassName("opened");
	if (opened.length >= 2) {
		animationInProgress = true;
		setTimeout( function(){
			animationInProgress = false;
			opened.length = 0;
		},500)
	}
	if (animationInProgress) {
		return false;
	}
	for (var i = 0; i < 18; i++) {
		if (DeckArrFinal[i].location == id) {
			document.getElementById(id).style.background = ("url(cards/" + DeckArrFinal[i].id + ".png)")
			document.getElementById(id).className = "opened"
		}
	}
	if (opened.length == 2) {
		var match = []
		for (var i = 0; i < 2; i++) {
			for (var y = 0; y < 18; y++) {
				if (DeckArrFinal[y].location == opened[i].id) {
					match.push(DeckArrFinal[y].id)	
				}
					
			}
		}
		if (match[0] == match[1]) {
			setTimeout( function () {
				document.getElementById(opened[0].id).style.display = ("none")
				document.getElementById(opened[1].id).style.display = ("none")
				document.getElementById(opened[1].id).classList.remove("opened")
				document.getElementById(opened[0].id).classList.remove("opened")
			}, 500)	
			countClosed = countClosed - 2;
			countOpened = countOpened + 2;
			score = score + countClosed * 42;
			document.getElementById("score").innerHTML = score;
			document.getElementById("finalscore").innerHTML = score;
			counts ++;

		} else{
			setTimeout( function () {
				document.getElementById(opened[0].id).style.background = ("url(assets/back.jpg)")
				document.getElementById(opened[1].id).style.background = ("url(assets/back.jpg)")
				document.getElementById(opened[1].id).classList.remove("opened")
				document.getElementById(opened[0].id).classList.remove("opened")
			}, 500)	
			score = score - countOpened * 42;
			if (score < 0 ) {
				score = 0;
			}
			document.getElementById("score").innerHTML = score;
			document.getElementById("finalscore").innerHTML = score;
		}

	}
	if (counts == 9) {
		setTimeout( function () {
			document.getElementById("hidden").style.display = ("block")
		},1000)
		
	}
}	

var DeckArr = DeckArrFunc();
var LocationsArr = LocationsCalculate();
var DeckArrFinal = DeckArrFinalFunc();
var ImagesArr = [];
var score = 0;
var countOpened = 0;
var countClosed = 18;
var counts = 0;
var openedCards = 0;
var animationInProgress = false;



'use strict';

var sum = 0;

$(document).ready(init);

function init(){
	$('.num').click(clickNum);
	$('body').ready(randomNum);
	$('#submit').click(submitAnswer);
	$('#roll').click(rollRefresh);
	$('#newGame').click(resetGame);
}

function randomNum(){
	var randNum = Math.floor(Math.random() * 9) + 1;
	console.log('randNum: ', randNum);
	var $oranges = [];
	for(var i = 0; i < randNum; i++){
		var $newCup = $('<div>').addClass('orange');
		$oranges.push($newCup);
	}
	$('#randomNums').append($oranges);
}

function clickNum(){
	var $this = $(this);
	var num = $(this).text();
	var wasSelected = $this.hasClass('selected');
	$this.removeClass('selected');
	if(!wasSelected){
		$this.addClass('selected');
	}
}

function submitAnswer(){
	var orangeLength = $('.orange').length;
	$('.selected').each(function(index, element){
		sum = 0;
		sum = sum + parseInt(element.innerHTML);
	})
	
	if(orangeLength === sum) {
		$('#messages').empty();
		$('#messages').text('Wow, you are good at counting!');
		$('.selected').each(function(index, element){
			element.classList.add('disabled');
			element.classList.remove('selected');
		})
		$('.disabled').off();
		$('#randomNums').empty();
		randomNum();
		var disabledNums = $('.disabled').length;
		if(disabledNums === 9){
			$('#messages').empty();
			$('#messages').text('Winner winner, chicken dinner!').addClass('winner');
		}
	} else {
		$('#messages').empty();
		$('#messages').text('Incorrect, try counting again!');
	}
}

function rollRefresh(){
	var turns = $('#rollChances').text();
	$('#randomNums').empty();
	randomNum();
	turns = turns - 1;
	$('#rollChances').text(turns);
	if (turns <= 0) {
		$('#roll').addClass('disabled');
		$('#roll').off();
	}
}

function resetGame(){
	$('#randomNums').empty();
	randomNum();
	$('.num').off();
	$('.num').click(clickNum);
	$('.num').removeClass('disabled selected');
	$('#messages').empty().removeClass('winner');
	$('#rollChances').empty().text(50);
}
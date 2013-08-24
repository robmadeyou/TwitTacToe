var Twit = require("twit");


//Read the readme on what to put here, under the section
//Registering Twitter
var t = new Twit({
    consumer_key: '...'
  , consumer_secret: '...'
  , access_token: '...'
  , access_token_secret: '...'
});

var peopleEverConnected = {id: 0, name: "", timesPlayed : 0};
var listOfPeopleEverConnected = [];
var usersPlayingInfo = {id : 0, boardID : 0, xOrO : 0, lastTweetID: 0};
var connectionList = [];
var numOfBoards = 0;
var boardList = [];
var boardArranged = {xy: "_", x2y : "_", x3y : "_",
			xy2 : "_", x2y2 :"_", x3y2 : "_",
			xy3 : "  ", x2y3 : "  ", x3y3 : "  "};
var newBoard = boardArranged.xy + "|" + boardArranged.x2y + "|_\n_|_|_\n" + "  " + "|" + "  " + "|";



var stream = t.stream('statuses/filter', { track: '@Tictactoe_bot'})

stream.on('tweet', function (tweet) {
	var isNew = false;
	for(var i = 0; i < listOfPeopleEverConnected.lenght; i++){
		if(listOfPeopleEverConnected[i].id == tweet.user.id){
			listOfPeopleEverConnected[i].timesPlayed++;
			isNew = false;
			break;
		}
	}
	if(isNew){
		listOfPeopleEverConnected.push({id: tweet.user.id, name: tweet.user.screen_name, timesPlayed : 0});
	}
	
	if(connectionList.length <= 0){
		connectionList.push({id:tweet.user.id, boardID: numOfBoards, xOrO: "X", lastTweetID: tweet.id_str});
		t.post("statuses/update", {status: "@" + tweet.user.screen_name + " , let's play!\n" + newBoard, in_reply_to_status_id: tweet.id_str}, function(err, reply){ console.log(err)});
		console.log("User " + connectionList[0].id + " started a new game!");
		boardList.push({xy: "_", x2y : "_", x3y : "_",
				xy2 : "_", x2y2 :"_", x3y2 : "_",
				xy3 : "  ", x2y3 : "  ", x3y3 : "  "});
		numOfBoards++;

	}else{

		for(var i = 0; i < connectionList.length; i++){
			if(connectionList[i].id == tweet.user.id){
				console.log("User " + tweet.user.id + " continued playing the game :)");
				connectionList[i].lastTweetID = tweet.id_str;
				game(tweet, i);
				return;
			}
		}
		
		console.log("User " + tweet.user.id + " started a new game!");
		boardList.push({xy: "_", x2y : "_", x3y : "_",
				xy2 : "_", x2y2 :"_", x3y2 : "_",
				xy3 : "  ", x2y3 : "  ", x3y3 : "  "});
		connectionList.push({id:tweet.user.id, boardID: numOfBoards, xOrO: "X", lastTweetID: tweet.id_str});
		numOfBoards++;
		t.post("statuses/update", {  status: "@" + tweet.user.screen_name + ", let's play!\n" + newBoard, in_reply_to_status_id: connectionList[i].lastTweetID}, function(err, reply){});
	}
});

function game(a, id){
	var canSend = false;
	//c = coordinates, just so you know
	var c = a.text.replace("@" + a.in_reply_to_screen_name, "");
	var c = c.replace(" ", "");
	if(c == 11 || c == 12 || c == 13 || c == 21 || c == 22 || c == 23 || c == 31 || c == 32 || c == 33){
		if(c == 11){
			if(boardList[connectionList[id].boardID].xy == "_"){
				boardList[connectionList[id].boardID].xy = connectionList[id].xOrO;
				canSend =  true;
			}	
		}else if(c == 12){
			if(boardList[connectionList[id].boardID].xy2 == "_"){
				boardList[connectionList[id].boardID].xy2 = connectionList[id].xOrO;
				canSend = true;
			}
		}else if(c == 13){
			if(boardList[connectionList[id].boardID].xy3 == "  "){
				boardList[connectionList[id].boardID].xy3 = connectionList[id].xOrO;
				canSend = true;
			}
		}else if(c == 21){
			if(boardList[connectionList[id].boardID].x2y == "_"){
				boardList[connectionList[id].boardID].x2y = connectionList[id].xOrO;
				canSend = true;
			}
		}else if(c == 22){
			if(boardList[connectionList[id].boardID].x2y2 == "_"){
				boardList[connectionList[id].boardID].x2y2 = connectionList[id].xOrO;
				canSend = true;
			}
		}else if(c == 23){
			if(boardList[connectionList[id].boardID].x2y3 == "  "){
				boardList[connectionList[id].boardID].x2y3 = connectionList[id].xOrO;
				canSend = true;
			}
		}else if(c == 31){
			if(boardList[connectionList[id].boardID].x3y == "_"){
				boardList[connectionList[id].boardID].x3y = connectionList[id].xOrO;
				canSend = true;
			}
		}else if(c == 32){
			if(boardList[connectionList[id].boardID].x3y2 == "_"){
				boardList[connectionList[id].boardID].x3y2 = connectionList[id].xOrO;
				canSend = true;
			}
		}else if(c == 33){
			if(boardList[connectionList[id].boardID].x3y3 == "  "){
				boardList[connectionList[id].boardID].x3y3 = connectionList[id].xOrO;
				canSend = true;
			}
		}
	}else{
		t.post("statuses/update", {  status: "Sorry @" + a.user.screen_name + ", you've entered wrong coordinates, please try again", in_reply_to_status_id: connectionList[id].lastTweetID}, function(err, reply){});
	}
	if(canSend){
		takeTurn(a,id);
	}
	
}
function takeTurn(a,id){
	var hasPlaced = false;
	var letter;
	var noMoves;
	if(connectionList[id].xOrO == "X"){
		letter = "O";
	}else{
		letter = "X";
	}
	while(!hasPlaced){
		var ran = Math.floor((Math.random()*9) + 1);
		if(ran == 1){
			if(boardList[connectionList[id].boardID].xy == "_"){
				boardList[connectionList[id].boardID].xy = letter;
				hasPlaced = true;
			}			
		}else if(ran == 2){
			if(boardList[connectionList[id].boardID].xy2 == "_"){
				boardList[connectionList[id].boardID].xy2 = letter;
				hasPlaced = true;
			}
		}else if(ran == 3){
			if(boardList[connectionList[id].boardID].xy3 == "  "){
				boardList[connectionList[id].boardID].xy3 = letter;
				hasPlaced = true;
			}
		}else if(ran == 4){
			if(boardList[connectionList[id].boardID].x2y == "_"){
				boardList[connectionList[id].boardID].x2y = letter;
				hasPlaced = true;
			}
		}else if(ran == 5){
			if(boardList[connectionList[id].boardID].x2y2 == "_"){
				boardList[connectionList[id].boardID].x2y2 = letter;
				hasPlaced = true;
			}
		}else if(ran == 6){
			if(boardList[connectionList[id].boardID].x2y3 == "  "){
				boardList[connectionList[id].boardID].x2y3 = letter;
				hasPlaced = true;
			}
		}else if(ran == 7){
			if(boardList[connectionList[id].boardID].x3y == "_"){
				boardList[connectionList[id].boardID].x3y = letter;
				hasPlaced = true;
			}
		}else if(ran == 8){
			if(boardList[connectionList[id].boardID].x3y2 == "_"){
				boardList[connectionList[id].boardID].x3y2 = letter;
				hasPlaced = true;
			}
		}else if(ran == 9){
			if(boardList[connectionList[id].boardID].x3y3 == "  "){
				boardList[connectionList[id].boardID].x3y3 = letter;
				hasPlaced = true;
			}
		}else{
			noMoves = true;
		}
	}
	checkMap(a,id);
	
}

function checkMap(a, id, noMoves){
	var won = false;
	var player = "X";
	//b is for board
	var b = boardList[connectionList[id].boardID];
	for(var i = 0; i < 2; i++){
		var letter;
		if(i == 0){
			letter = "X";
		}else{
			letter = "O";
		}
		if(b.xy == letter && b.x2y == letter && b.x3y == letter){
			won = true;
			player = letter;
		}else if(b.xy2 == letter && b.x2y2 == letter && b.x3y2 == letter){
			won = true;
			player = letter;
		}else if(b.xy3 == letter && b.x2y3 == letter && b.x3y3 == letter){
			won = true;
			player = letter;
		}else if(b.xy == letter && b.xy2 == letter && b.xy3 == letter){
			won = true;
			player = letter;
		}else if(b.x2y == letter && b.x2y2 == letter && b.x2y3 == letter){
			won = true;
			player = letter;
		}else if(b.x3y == letter && b.x3y2 == letter && b.x3y3 == letter){
			won = true;
			player = letter;
		}else if(b.xy == letter && b.x2y2 == letter && b.x3y3 == letter){
			won = true;
			player = letter;
		}else if(b.x3y == letter && b.x2y2 == letter && b.xy3 == letter){
			won = true;
			player = letter;
		}
	}
	if(noMoves){
		won = true;
		player = "";
	}
	sendBoard(a,id,won,player);
}

function sendBoard(a, id, won, player){
	console.log("Sent!");
	var b = boardList[connectionList[id].boardID];
	var boardString = b.xy + "|" + b.x2y + "|" + b.x3y + "\n" + b.xy2 + "|" + b.x2y2 + "|" + b.x3y2 + "\n" + b.xy3 + "|" + b.x2y3 + "|" + b.x3y3;
	if(!won){
		t.post("statuses/update", { status: "@" + a.user.screen_name + "\n" + boardString, in_reply_to_status_id: connectionList[id].lastTweetID}, function(err, reply){});
	}else{
		if(player == "X"){
			t.post("statuses/update", { status: "@" + a.user.screen_name + "\n" + boardString + " Well done! You won!", in_reply_to_status_id: connectionList[id].lastTweetID}, function(err, reply){});
		}else if(player == "O"){
			t.post("statuses/update", { status: "@" + a.user.screen_name + "\n" + boardString + " Ahh, tough loss, better luck next time!", in_reply_to_status_id: connectionList[id].lastTweetID}, function(err, reply){});
		}else{
			t.post("statuses/update", { status: "@" + a.user.screen_name + "\n" + boardString + " It was a draw! Well played!", in_reply_to_status_id: connectionList[id].lastTweetID}, function(err, reply){});
		}
		connectionList.pop(id);
		console.log("Cleared both lists :)" );
	}
}

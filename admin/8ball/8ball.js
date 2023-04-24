$(document).ready(function(){
  
    var magic8Ball = {};
    magic8Ball.listofanswers = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes, definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."];
   

    function spin() {
      var img = $("#8ball");
      img.style.transform = "rotate(120deg)";
      img.style.transition = "transform 2s ease-in-out";
    }


    magic8Ball.getAnswer = function(question)
    {
    $("#answer").hide();
    $("#8ball").attr("src", "ball.png");
    
    //var randomAnswerIndex = Math.floor(Math.random() * this.listofanswers.length);
  
    // Set up the slot machine effect
    var answerText = "";
    var counter = 0;
    var interval = setInterval(function() {
      // Generate a new random answer every few iterations
      if (counter % 5 == 0) {
        var randomAnswerIndex = Math.floor(Math.random() * magic8Ball.listofanswers.length);
        answerText = magic8Ball.listofanswers[randomAnswerIndex];
    }
      
      // Set the answer text to a random answer
      //answerText = magic8Ball.listofanswers[randomAnswerIndex];
      
      // Update the answer element with the new text
      $("#answer").text(answerText);
      
      // Increment the counter
      counter++;
      if (counter >= 50) {
        clearInterval(interval);
        $("#8ball").attr("src", "ball.png");
        $("#answer").fadeIn(300);
      }
    }, 100);
      //console.log(question);
      //console.log(answer);
    };


    var onClick = function(event) {
        var question = $("#questionBox").val().trim();
        if (question === "") {
          alert("Please enter a question.");
        } else {

          $("#answer").hide();
          $("#8ball").attr("src", "ball.png");
          magic8Ball.getAnswer(question);
        }
      };

    $("#questionButton").click( onClick );
  });

var number_words = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes, definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."];
var height_slot_number = '100';

function go(tens, units){
	addSlots($("#slots_units .number-wrapper"));
	addSlots($("#slots_units .number-wrapper"));
	moveSlots($("#slots_units .number-wrapper"), number_words[units]);
	addSlots($("#slots_tens .number-wrapper"));
	addSlots($("#slots_tens .number-wrapper"));
	moveSlots($("#slots_tens .number-wrapper"), number_words[tens]);
}

$(document).ready(function(){
	addSlots($("#slots_units .number-wrapper"));
	addSlots($("#slots_tens .number-wrapper"));
	$('#arm').click(function(e) {
		var arm = $(this).addClass('clicked');
		delay = setTimeout(function() { arm.removeClass('clicked'); }, 500);
		e.preventDefault();
		go(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
	});
});

function addSlots(jqo){
	for(var i = 0; i < 10; i++){
		jqo.append("<div class='slot'>"+ number_words[i] +"</div>");
	}
}

function moveSlots(jqo, word){
	var time	= 6500;
	var number	= number_words.indexOf(word);
	time		+= Math.round(Math.random()*1000);
	jqo.stop(true,true);

	var num_slot    = Math.round((jqo.find('.slot').length)/20);
	var margin_top  = ((num_slot -1) * (height_slot_number * 10)) + (number * height_slot_number);

	jqo.animate(
		{"margin-top":"-"+ margin_top +"px"},
		{'duration' : time, 'easing' : "easeOutElastic"}
	);
}
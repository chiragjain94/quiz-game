
var $questionTag = $("#question");
var $mainQuestion = $("#mainQuestion");
var $resetButton = $("#reset-button");
var $submitButton = $("#submit-button");
var $startButton = $("#start-button");
var $pagination = $("#pagination");

var currentQuestion = 0;
var correctAnswers = 0;
var userAnswers = [];

var questionList = [
    {
        question: "What is the color of water?",
        options: [
            "White",
            "Green",
            "Colourless",
            "Blue"
        ],
        answer: "2"
    },
    {
        question: "India is a ?",
        options: [
            "City",
            "State",
            "Village",
            "Country"
        ],
        answer: "3"
    },
    {
        question: "What is 24+3",
        options: [
            "27",
            "26",
            "25",
            "28"
        ],
        answer: "0"
    },
    {
        question: "What is 12*4",
        options: [
            "36",
            "24",
            "48",
            "28"
        ],
        answer: "2"
    },
    {
        question: "BW stands for",
        options: [
            "BombayWorks",
	    "Black and White",
            "BombayWala",
            "Business Week"
        ],
        answer: "1"
    }
];

$mainQuestion.hide();
$resetButton.hide();


$startButton.click(function (event) {
    event.preventDefault();

    loadAllQuestion();
    bindClick();
    loadQuestion(currentQuestion);
    loadPageScroll();
    $(this).hide();
    $submitButton.hide();

});

function storeUserAnswer(currentQuestion) {
    if ($("input[name='option" + (currentQuestion + 1) + "']:checked").val()) {
        userAnswers[currentQuestion] = $("input[name='option" + (currentQuestion + 1) + "']:checked").val();

        var answerCount = userAnswers.filter(a=>a !== 'undefined').length;
        var widthOfProgressBar = (answerCount / questionList.length) * 100 + "%";
        $("#progress-bar").css("width", widthOfProgressBar);
        $("#progress-bar").html(answerCount + "/" + questionList.length + " questions answered");
loadQuestion(currentQuestion+1);
        if (answerCount === 5) {
            $submitButton.show();
        }
    };
};

function bindClick() {
    $('input[type="radio"]').click(function () {
        if ($(this).is(':checked')) {
            storeUserAnswer(currentQuestion);
        }
    });
}

function loadAllQuestion() {
    for (var i = 0; i < questionList.length; i++) {
        var $options = "";
        for (var j in questionList[i].options) {
            if (questionList[i].options.hasOwnProperty(j)) {
                $options += ("<label><input type='radio' name='option" + (i + 1) + "' value=" + j + " id='option" + j + "'>&nbsp"
                    + questionList[i].options[j] + "</label><br>");
            }
        }
        var $question = $("<div id='question" + (i) + "' class='lead'><p>" + (i + 1) + "." + questionList[i].question + "</p>" + $options + "</div>");
        $question.appendTo("#form");
    }
    $mainQuestion.show();
};

function loadQuestion(questionToLoad) {
    currentQuestion = questionToLoad;

    if (currentQuestion >= questionList.length || currentQuestion < 0) return;

    if (currentQuestion === 0) {
        $("#previous ").addClass("disabled");
    } else $("#previous ").removeClass("disabled");


    if (currentQuestion >= questionList.length - 1) {
        $("#next ").addClass("disabled");
    } else $("#next ").removeClass("disabled");

    $(".page-item").removeClass("active");
    $("#pageNumber" + (questionToLoad + 1)).addClass("active");

    $("#form").children().hide();
    $("#question" + questionToLoad + "").show();
}

function showResult() {
    for (var i = 0; i < questionList.length; i++) {
        if (userAnswers[i] === questionList[i].answer) {
            correctAnswers++;
        };
    };

    var $result = $("<p class='alert alert-dismissable alert-success'>You have scored " +
        correctAnswers + " out of " + questionList.length + "</p>");
    $result.appendTo($("#result"));

    $resetButton.show();
    $mainQuestion.hide();
    $startButton.hide();

}

function loadPageScroll() {
    for (var i = 0; i < questionList.length; i++) {
        var questionNumber = i + 1;
        var $pageNumber = $("<li class= 'page-item' id='pageNumber" + questionNumber + "'><a href='#' onclick='loadQuestion(" + i + ")'>"
                          + questionNumber + "</a></li>");
        $pageNumber.appendTo("#pagination");
    }

    var $nextPageButton =
        $("<li class='page-item' id='next'><a href='#' onclick='loadQuestion(currentQuestion+1)'>Next</a></li>");
    $nextPageButton.appendTo("#pagination");
    $("#pageNumber1").addClass("active");
}

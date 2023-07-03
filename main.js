$(document).ready(() => {
    console.log("STARTED");

    let wordsArray;
    let guessArray;



    $(".error-div").hide();
    $(".game-over-div").hide();
    $(".win-div").hide();

    let milliseconds = 0;
    let timer = 0;

    function startGame() {
        let currentRow = 0;
        let currentWord = "";
        startTimer();

        let answer = wordsArray[Math.floor(Math.random() * wordsArray.length)];
        console.log(answer);
        $(".game-cell").removeClass("letter-in-word").removeClass("letter-in-same");
        $(".key-letter").removeClass("green").removeClass("yellow").removeClass("grey");
        $(".game-cell").empty();

        answer = answer.toUpperCase();

        let stop = false;

        $(document).keypress((event) => {
            if (stop) return;
            let keycode = (event.keyCode ? event.keyCode : event.which);

            let keyPressed = String.fromCharCode(event.which);


            let emptyCells = $('.game-row').eq(currentRow).find('.game-cell:empty');

            if (/[a-zA-Z]/.test(keyPressed)) {
                if (emptyCells.length > 0) {
                    emptyCells.first().text(keyPressed.toUpperCase());


                    currentWord = currentWord.concat(keyPressed).toUpperCase();

                }
            }

            if (keycode == '13' && emptyCells.length == 0) {

                if (currentWord.toUpperCase() === answer.toUpperCase()) {
                    clearInterval(timer);
                    setTimeout(() => {
                        win();
                        stop = true;
                    }, 500)
                }

                if (guessArray.includes(currentWord.toLowerCase())) {
                    $(".error-div").hide();
                    console.log('The word is present in the text file.');


                    let answerLetterCounts = {};

                    for (let i = 0; i < answer.length; i++) {
                        let letter = answer.charAt(i);
                        if (answerLetterCounts[letter]) {
                            answerLetterCounts[letter]++;
                        } else {
                            answerLetterCounts[letter] = 1;
                        }
                    }



                    for (let i = 0; i < answer.length; i++) {
                        let letter = currentWord.charAt(i);

                        if (letter == answer.charAt(i)) {
                            $('.game-row').eq(currentRow).find('.game-cell').eq(i).addClass("letter-in-same");
                            answerLetterCounts[letter]--;

                            $('.key-letter').each(function () {
                                let buttonLetter = $(this).text().trim();

                                if (buttonLetter === letter) {
                                    $(this).addClass('green');
                                }
                            });
                        }

                    }
                    for (let i = 0; i < answer.length; i++) {

                        let letter = currentWord.charAt(i);

                        if (answerLetterCounts[letter] && answerLetterCounts[letter] > 0) {
                            $('.game-row').eq(currentRow).find('.game-cell').eq(i).addClass("letter-in-word");
                            answerLetterCounts[letter]--;
                            $('.key-letter').each(function () {
                                let buttonLetter = $(this).text().trim();

                                if (buttonLetter === letter) {
                                    $(this).addClass('yellow');
                                }
                            });
                        } else {
                            $('.key-letter').each(function () {
                                let buttonLetter = $(this).text().trim();

                                if (buttonLetter === letter) {
                                    $(this).addClass('grey');
                                }
                            });
                        }

                    }



                    currentRow++;
                    if (currentRow == 6) {
                        gameOver(answer);
                        stop = true;

                    }
                    currentWord = "";

                } else {
                    console.log("invalid word");
                    $(".error-div").show();
                    $(".error-msg").text(currentWord + " is an invalid word");
                }
            }
        });

        $('.key-letter').click(function () {
            if (stop) return;
            let keyPressed = $(this).text();

            let emptyCells = $('.game-row').eq(currentRow).find('.game-cell:empty');

            if (/[a-zA-Z]/.test(keyPressed) && $(this).hasClass('key-enter') == false) {
                if (emptyCells.length > 0) {
                    emptyCells.first().text(keyPressed.toUpperCase());
                    currentWord = currentWord.concat(keyPressed).toUpperCase();

                }
            }


            if ($(this).hasClass('key-enter') && emptyCells.length == 0) {

                if (currentWord.toUpperCase() === answer.toUpperCase()) {
                    clearInterval(timer);
                    setTimeout(() => {
                        win();
                        stop = true;
                    }, 500)
                }
                if (guessArray.includes(currentWord.toLowerCase())) {
                    $(".error-div").hide();
                    console.log('The word is present in the text file.');

                    let answerLetterCounts = {};
                    for (let i = 0; i < answer.length; i++) {
                        let letter = answer.charAt(i);
                        if (answerLetterCounts[letter]) {
                            answerLetterCounts[letter]++;
                        } else {
                            answerLetterCounts[letter] = 1;
                        }
                    }

                    for (let i = 0; i < answer.length; i++) {
                        let letter = currentWord.charAt(i);
                        if (letter == answer.charAt(i)) {
                            $('.game-row').eq(currentRow).find('.game-cell').eq(i).addClass("letter-in-same");
                            answerLetterCounts[letter]--;
                            $('.key-letter').each(function () {
                                let buttonLetter = $(this).text().trim();

                                if (buttonLetter === letter) {
                                    $(this).addClass('green');
                                }
                            });
                        }
                    }

                    for (let i = 0; i < answer.length; i++) {
                        let letter = currentWord.charAt(i);
                        if (answerLetterCounts[letter] && answerLetterCounts[letter] > 0) {
                            $('.game-row').eq(currentRow).find('.game-cell').eq(i).addClass("letter-in-word");
                            answerLetterCounts[letter]--;
                            $('.key-letter').each(function () {
                                let buttonLetter = $(this).text().trim();

                                if (buttonLetter === letter) {
                                    $(this).addClass('yellow');
                                }
                            });
                        } else {
                            $('.key-letter').each(function () {
                                let buttonLetter = $(this).text().trim();

                                if (buttonLetter === letter) {
                                    $(this).addClass('grey');
                                }
                            });
                        }

                    }

                    currentRow++;
                    if (currentRow == 6) {
                        gameOver(answer);
                        stop = true;
                    }
                    currentWord = "";
                } else {
                    console.log("invalid word");
                    $(".error-div").show();
                    $(".error-msg").text(currentWord + " is an invalid word");
                }

            }
        });


        $(document).keyup((event) => {
            if (stop) return;
            if (event.which === 8) {
                event.preventDefault();

                let lastCell = $('.game-row').eq(currentRow).find('.game-cell:not(:empty)').last();

                currentWord = currentWord.slice(0, -1);

                lastCell.text('');
            }
        });

        $('.key-backspace').click((event) => {
            if (stop) return;
            event.preventDefault();

            let lastCell = $('.game-row').eq(currentRow).find('.game-cell:not(:empty)').last();

            currentWord = currentWord.slice(0, -1);

            lastCell.text('');
        })
    }


    function gameOver(answer) {
        clearInterval(timer);
        $(".game-over-div").show();
        $(".word-msg").text("THE WORD WAS " + answer);
    }

    function win() {

        $(".win-div").show();
    }


    function startTimer() {
        timer = setInterval(updateTimer, 10);
    }

    function updateTimer() {
        milliseconds += 10;
        let minutes = Math.floor((milliseconds / 1000 / 60) % 60);
        let seconds = Math.floor((milliseconds / 1000) % 60);
        let remainingMilliseconds = milliseconds % 1000;

        let formattedTime =
            pad(minutes) + ":" + pad(seconds) + ":" + padMilliseconds(remainingMilliseconds);

        $("#timer").text(formattedTime);
    }
    function pad(value) {
        return value < 10 ? "0" + value : value;
    }
    function padMilliseconds(value) {
        if (value < 10) {
            return "0" + value;
        } else {
            return value.toString().slice(0, 2);
        }
    }





    $(".new-game").click(function () {
        startGame();
        milliseconds = 0;
        $(".game-over-div").hide();
        $(".win-div").hide();
    });



    $.get('https://gist.githubusercontent.com/cfreshman/a7b776506c73284511034e63af1017ee/raw/60531ab531c4db602dacaa4f6c0ebf2590b123da/wordle-nyt-answers-alphabetical.txt', (data1) => {

        $.get('https://gist.githubusercontent.com/cfreshman/d97dbe7004522f7bc52ed2a6e22e2c04/raw/633058e11743065ad2822e1d2e6505682a01a9e6/wordle-nyt-words-14855.txt', (data2) => {
            wordsArray = data1.split(/\s+/);
            guessArray = data2.split(/\s+/);
            startGame();
        })

    });

})
$('button').on('click', function() {

    var giphy = $(this).data('giphy');

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC";;

    $.ajax({
            url: queryURL,
            method: 'GET'
        })
        //done function
        .done(function(response) {

            //console logs results remove when done testing
            console.log(response)

            //turns response.data into a variable 
            var results = response.data

            //loops though images
            for (var i = 0; i < results.length; i++) {

                //creates Div
                var giphyDiv = $('<div class="giphyDiv text-center">');

                //pulls ratings
                var p = $('<p>').text('Rating: ' + results[i].rating);

                //creates images
                var giphyImage = $('<img>');
                //test images in console
                //console.log(giphyImage);

                giphyImage.attr('src', results[i].images.fixed_height.url);
                giphyImage.attr('class', 'giphyClass');
                giphyImage.attr('data-animate', results[i].images.fixed_height.url);
                giphyImage.attr('data-still', results[i].images.fixed_height_still.url);

                //appends rating and image
                giphyDiv.append(p);
                giphyDiv.append(giphyImage);

                //prepends to class specified in html
                $('.gifsAppearHere').prepend(giphyDiv);



                //end of for loop
            }
            //event listener when image is clicked on
            $('.giphyClass').on('click', function() {

                var state = $('.giphyClass').attr('data-state');

                //insert logic for pausing gif
                if (state == 'animate') {

                    $(this).attr('src', $(this).attr('data-still'));
                    $(this).attr('data-state', 'still');

                } else {

                    $(this).attr('src', $(this).attr('data-animate'));
                    $(this).attr('data-state', 'animate');
                }
                //end of pausing function
            });
            
            // This function handles events where one button is clicked
            $('#addGiphy').on('click', function() {

                //grab the input from the textbox
                var newGiphy = $('#giphy-input').val().trim();

                results.push(newGiphy);

            });
            
            //end of done function
        });

    //end of button function
});
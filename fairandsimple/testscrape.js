var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var url = 'http://fairandsimple.com/shop/direct/accessories?page=3';
request(url, function(error, response, html){

  // First we'll check to make sure no errors occurred when making the request
  if(!error){

      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

      var $ = cheerio.load(html);

      // Finally, we'll define the variables we're going to capture

      var imageURL, productURL, productName, pageTitle, productPrice, productDescription;
      var json = { imageURL : "", productURL : "", productName : "", pageTitle : "", productPrice : "", productDescription : ""};

      // We'll use the unique header class as a starting point.

      $('.product-box').filter(function(){

        // Let's store the data we filter into a variable so we can easily see what's going on.

        var data = $(this);

        // In examining the DOM we notice that the title rests within the first child element of the header tag.
        // Utilizing jQuery we can easily navigate and get the text by writing the following code:

        imageURL = data.children().first().next().attr('src');
        productURL = data.children().last().attr('href');
        productPrice = data.children().last().text();
        productName = data.children().first().next().next().text();

        // Once we have our title, we'll store it to the our json object.

        json.imageURL = imageURL;
        json.productURL = productURL;
        json.productPrice = productPrice;
        json.productName = productName;

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

            console.log('File successfully written! - Check your project directory for the output.json file');

        })
        })
  }
})

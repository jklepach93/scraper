
$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});

$(document).on("click", "p", function() {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .done(function(data) {
      console.log(data);
      $("#notes").append("<h2>");
      $("#notes").append("<input id='titleinput' name='title' placeholder='Your Name'>");
      $("#notes").append("<textarea id='bodyinput' name='body' placeholder='Comments Here'></textarea>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      $("#notes").append("<br>");
      $("#notes").append("<h2>Comments:</h2>");
      if (data.note) {
        var notes = data.note; 
        notes.forEach(function(notes){
          
          $("#notes").append("<h3>" + notes.title + "</h3>");
          $("#notes").append("<p>" + notes.body + "</p>");
          $("#notes").append("<form action='/notes/" + notes._id + "' method='get'><button type='submit' class='btn btn-primary'>Delete!</button></form");
        })
      }

    });
});

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    
    .done(function(data) {
      
      console.log(data);
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});










var fieldLinks;
$(document).ready(function() {
 let index = 0;
 $('.headerText').text(header);
 $('headerText').css({'color':headerColor});
 $('background').css({'background-image':background});

 // url value
 let url = window.location.href;
 if (url.indexOf('?') > 0) {
  let params = new URLSearchParams(url.substring(1));
  index = parseInt(params.get('qno'));
  console.log("url variable available....");
 } else {
  console.log("url variable not available...");
 }


 var input = {
  "localization": {},
  "options": {
   "associationMode": "oneToOne", // oneToOne,manyToMany
   "lineStyle": "square-ends",
   // "buttonErase":"Erase Links",
  },
  "Lists": [{
    "name": "Columns in files",
    "list": data[index].listA,
   },
   {
    "name": "Available Fields",
    "list": data[index].listB,
   }
  ],

  "existingLinks": []
 };
 // }

 fieldLinks = $("#bonds").fieldsLinker("init", input);

 // show the correct answer
 let showSolution = data[index].answer;

 $('#solution').click(function() {
  input.existingLinks = showSolution;
  fieldLinks = $("#bonds").fieldsLinker("init", input);
  $('#select1').css({
   'opacity': 0
  });
  $('#select2').css({
   'opacity': 0
  });

 });

 let liId;

 // check function
 $("#submit").on("click", function() {
  $('.signImg').remove() // remove the right wrong icon
  // get user match option value
  var results = fieldLinks.fieldsLinker("getLinks");
  let userTo = results.links;

  // check user did right or wrong
  $.each(userTo, function(i) {
   $.each(showSolution, function(j) {
    if (userTo[i].from == showSolution[j].from) {
     if (userTo[i].to == showSolution[j].to) {
      liId = $(`#bonds .fieldsLinker .FL-right li[data-name='${userTo[i].to}']`);
      $(liId[0]).css({
       'padding-left': '35px'
      });
      $(liId[0]).prepend(`<img src='img/right.png' class='signImg right' />`);
     } else {
      liId = $(`#bonds .fieldsLinker .FL-right li[data-name='${userTo[i].to}']`);
      $(liId[0]).css({
       'padding-left': '35px'
      });
      $(liId[0]).prepend(`<img src='img/wrong.png' class='signImg wrong' />`);
     }
    }
   });
  })
  // check user did right or wrong end here
  // $("#output").html("output => " + JSON.stringify(results));
 });
 // end check function

 $('.unlink').hide();
 $('#select1').css({
  'opacity': 0
 });
 $('#select2').css({
  'opacity': 0
 });


 $('#next').click(function() {

  index++;
  let url2 = window.location.pathname;
  var newurl = url2 + `?data=all&qno=${index}`;
  window.location.href = newurl;

 });


 $('#prev').click(function() {

  index--;
  let url2 = window.location.pathname;
  var newurl = url2 + `?data=all&qno=${index}`;
  window.location.href = newurl;

 });

 if (index > 0) {
  $('#prev').fadeIn();
  $('#next').fadeIn();
  } else {
  $('#prev').hide();
  }

 if (index == data.length - 1) {
  $('#next').hide();
 }



}); // document ready function end here...
var fieldLinks;
    $( document ).ready(function() {
      //var existingLinks = [{"from":"firstName","to":"first_name"}] ;
      // var input;
      // var existingLinks;
      // function getLinks(){
      var input = {
          "localization":{
        },
          "options":{
          "associationMode":"oneToOne", // oneToOne,manyToMany
          "lineStyle":"square-ends",
          // "buttonErase":"Erase Links",
        },
          "Lists":[
            {
              "name":"Columns in files",
              "list" : [
                "first Name",
                "lastName",
                "phone",
                "email",
              ]
            },
            {
              "name":"Available Fields",
              "list" : [
                "kumar gouraw",
                "pgouraw@gmail.com",
                "pankaj",
                78787 
              ],
              // "mandatories" :[
              //   "last_name",
              //   "email_adress"
              // ]
            }
            ],

          "existingLinks" : []
      };
      // }
      
        fieldLinks=$("#bonds").fieldsLinker("init",input);

        // show the correct answer
        let showSolution= [
               {"from":"first Name","to":"pankaj"},
               {"from":"lastName","to":"kumar gouraw"},
               {"from":"phone","to":78787},
               {"from":"email","to":"pgouraw@gmail.com"}
          ];

        $('#solution').click(function(){
           input.existingLinks = showSolution;
           fieldLinks=$("#bonds").fieldsLinker("init",input);
        });
       
      let liId;
      
      // check function
      $("#submit").on("click",function(){
        $('.signImg').remove() // remove the right wrong icon
        // get user match option value
        var results = fieldLinks.fieldsLinker("getLinks");
        let userTo = results.links;
 
        // check user did right or wrong
        $.each(userTo, function(i){
            $.each(showSolution,function(j){
                 if(userTo[i].from == showSolution[j].from)  {
                  console.log(userTo[i].from,  showSolution[j].from)
                      if(userTo[i].to == showSolution[j].to){
                        console.log(userTo[i].to,  showSolution[j].to)
                         liId = $(`#bonds .fieldsLinker .FL-right li[data-name='${userTo[i].to}']`);
                         $(liId[0]).css({'padding-left':'35px'});
                         $(liId[0]).prepend(`<img src='img/right.png' class='signImg right' />`);
                         console.log(liId[0]);
                      }else{
                         liId = $(`#bonds .fieldsLinker .FL-right li[data-name='${userTo[i].to}']`);
                         $(liId[0]).css({'padding-left':'35px'});
                         $(liId[0]).prepend(`<img src='img/wrong.png' class='signImg wrong' />`);
                      }
                 }
            });
        })
        // check user did right or wrong end here
        // $("#output").html("output => " + JSON.stringify(results));
      });
      // end check function

           
    });  // document ready function end here...
 

# over.js

Elegant function overloading in JavaScript

## Usage

    var obj = {

      say: Over(
        function(msg$string){
          console.info(msg$string);
        },
        function(msg$string, times$number){
          for (var i = 0; i < times$number; i++) this.say(msg$string);
        }
      )

    };


# over.js

Elegant function overloading in JavaScript.

## Example

Just wrap your functions with the `Over()` method, and use special argument names to denote types:

    var obj = {

      /**
       * Says something in the console.
       *
       * say(msg) - Says something once.
       * say(msg, times) - Says something many times.
       */
      say: Over(
        function(msg$string){
          console.info(msg$string);
        },
        function(msg$string, times$number){
          for (var i = 0; i < times$number; i++) this.say(msg$string);
        }
      )

    };

### Argument names

    [name]${test}

The argument name contains any name (optional), followed by a `$` literal, followed by the type of test that will take place when checking the signature of the function.

Built in tests:

  * `$string` - Checks whether the argument is a string or not.
  * `$number` - Checks whether the argument is a number or not.
  * `$object` - Checks whether the argument is an object or not (not an array).
  * `$array` - Checks whether the argument is an array or not.
  * `$bool` | `$boolean` - Checks whether the argument is a boolean or not (i.e. `true` or `false`).
  * `$function` - Checks whether the argument is a function or not.
  * `$nothing` - Checks whether the argument is `null` or `undefined`.
  * `$null` - Checks whether the argument is `null` or not.
  * `$undefined` - Checks whether the argument is `undefined` or not.

#### The special `$etc` kind

If you use `anything$etc`, it will allow any kind of argument (or no argument at all), and any arguments following it.

### Adding your own

You can add your own tests by simply adding a function to the `Over.is` object.  For example, to add support for checking if an argument is a positive number, you could do:

    Over.is.positiveNumber = function(v){ return Over.is.number(v) && v > 0; };

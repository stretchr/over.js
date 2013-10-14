describe("Over should work", function(){

  it("should call the appropriate method", function(){

    var calls = {};
    var lastThis = null;
    var obj = {};
    obj.f = Over(

      function($string, $number){
        calls["one"] = calls["one"] || [];
        calls["one"].push(arguments);
        lastThis = this;
        return "one";
      },
      function($string){
        calls["two"] = calls["two"] || [];
        calls["two"].push(arguments);
        lastThis = this;
        return "two";
      },
      function($object, $array){
        calls["three"] = calls["three"] || [];
        calls["three"].push(arguments);
        lastThis = this;
        return "three";
      },
      function($etc){
        calls["four"] = calls["four"] || [];
        calls["four"].push(arguments);
        lastThis = this;
        return "four";
      }

    );

    expect(obj.f("Mat", 30)).toEqual("one");
    expect(calls["one"][0][0]).toEqual("Mat");
    expect(calls["one"][0][1]).toEqual(30);
    expect(lastThis).toEqual(obj);

    expect(obj.f("Ryan")).toEqual("two");
    expect(calls["two"][0][0]).toEqual("Ryan");
    expect(lastThis).toEqual(obj);

    var anObj = {}, anArr = [];
    expect(obj.f(anObj, anArr)).toEqual("three");
    expect(calls["three"][0][0]).toEqual(anObj);
    expect(calls["three"][0][1]).toEqual(anArr);
    expect(lastThis).toEqual(obj);

    expect(obj.f("Anything else", 1, 2, 3)).toEqual("four");
    expect(calls["four"][0][0][0]).toEqual("Anything else");
    expect(calls["four"][0][0][1]).toEqual(1);
    expect(calls["four"][0][0][2]).toEqual(2);
    expect(calls["four"][0][0][3]).toEqual(3);
    expect(lastThis).toEqual(obj);

  });

});

describe("Over.makeMap", function(){

  it("should make a map from the specified funcs", function(){

    var f1 = function($string,$number,$array){};
    var f2 = function($string,$number,$object){};
    var f3 = function($string,$number){};
    var mapping = Over.map(f1,f2,f3);

    if (expect(mapping.length).toEqual(3)) {

      expect(mapping[0].sig[0]).toEqual(Over.is.string);
      expect(mapping[0].sig[1]).toEqual(Over.is.number);
      expect(mapping[0].sig[2]).toEqual(Over.is.array);
      expect(mapping[0].func).toEqual(f1);

      expect(mapping[1].sig[0]).toEqual(Over.is.string);
      expect(mapping[1].sig[1]).toEqual(Over.is.number);
      expect(mapping[1].sig[2]).toEqual(Over.is.object);
      expect(mapping[1].func).toEqual(f2);

      expect(mapping[1].sig[0]).toEqual(Over.is.string);
      expect(mapping[1].sig[1]).toEqual(Over.is.number);
      expect(mapping[1].func).toEqual(f3);

    }

  });

});

describe("Over.argnames", function(){

  it("should break arguments out from a function", function(){

    var args = Over.argnames(function(name$string, age$number, something$object){});

    expect(args[0]).toEqual("name$string");
    expect(args[1]).toEqual("age$number");
    expect(args[2]).toEqual("something$object");

  });

  it("should trim the names", function(){

    var args = Over.argnames(function(  name$string,    age$number,   something$object   ){});

    expect(args[0]).toEqual("name$string");
    expect(args[1]).toEqual("age$number");
    expect(args[2]).toEqual("something$object");


  });

});

describe("Over.is.*", function(){

  it("should work with is.string", function(){

    expect(Over.is.string("yes")).toEqual(true);
    expect(Over.is.string(false)).toEqual(false);
    expect(Over.is.string()).toEqual(false);
    expect(Over.is.string(1)).toEqual(false);
    expect(Over.is.string({})).toEqual(false);
    expect(Over.is.string([])).toEqual(false);
    expect(Over.is.string(null)).toEqual(false);
    expect(Over.is.string(undefined)).toEqual(false);
    expect(Over.is.string(function(){})).toEqual(false);

  });

  it("should work with is.nothing", function(){

    expect(Over.is.nothing("yes")).toEqual(false);
    expect(Over.is.nothing(false)).toEqual(false);
    expect(Over.is.nothing()).toEqual(true);
    expect(Over.is.nothing(1)).toEqual(false);
    expect(Over.is.nothing({})).toEqual(false);
    expect(Over.is.nothing([])).toEqual(false);
    expect(Over.is.nothing(null)).toEqual(true);
    expect(Over.is.nothing(undefined)).toEqual(true);
    expect(Over.is.nothing(function(){})).toEqual(false);

  });

  it("should work with is.boolean", function(){

    expect(Over.is.boolean("yes")).toEqual(false);
    expect(Over.is.boolean(true)).toEqual(true);
    expect(Over.is.boolean(false)).toEqual(true);
    expect(Over.is.boolean()).toEqual(false);
    expect(Over.is.boolean(1)).toEqual(false);
    expect(Over.is.boolean({})).toEqual(false);
    expect(Over.is.boolean([])).toEqual(false);
    expect(Over.is.boolean(null)).toEqual(false);
    expect(Over.is.boolean(undefined)).toEqual(false);
    expect(Over.is.boolean(function(){})).toEqual(false);

  });

  it("should work with is.bool", function(){

    expect(Over.is.bool("yes")).toEqual(false);
    expect(Over.is.bool(true)).toEqual(true);
    expect(Over.is.bool(false)).toEqual(true);
    expect(Over.is.bool()).toEqual(false);
    expect(Over.is.bool(1)).toEqual(false);
    expect(Over.is.bool({})).toEqual(false);
    expect(Over.is.bool([])).toEqual(false);
    expect(Over.is.bool(null)).toEqual(false);
    expect(Over.is.bool(undefined)).toEqual(false);
    expect(Over.is.bool(function(){})).toEqual(false);

  });

  it("should work with is.function", function(){

    expect(Over.is.function("yes")).toEqual(false);
    expect(Over.is.function(false)).toEqual(false);
    expect(Over.is.function()).toEqual(false);
    expect(Over.is.function(1)).toEqual(false);
    expect(Over.is.function({})).toEqual(false);
    expect(Over.is.function([])).toEqual(false);
    expect(Over.is.function(null)).toEqual(false);
    expect(Over.is.function(undefined)).toEqual(false);
    expect(Over.is.function(function(){})).toEqual(true);

  });

  it("should work with is.number", function(){

    expect(Over.is.number("yes")).toEqual(false);
    expect(Over.is.number(false)).toEqual(false);
    expect(Over.is.number()).toEqual(false);
    expect(Over.is.number(1)).toEqual(true);
    expect(Over.is.number({})).toEqual(false);
    expect(Over.is.number([])).toEqual(false);
    expect(Over.is.number(null)).toEqual(false);
    expect(Over.is.number(undefined)).toEqual(false);
    expect(Over.is.number(function(){})).toEqual(false);

  });

  it("should work with is.object", function(){

    expect(Over.is.object("yes")).toEqual(false);
    expect(Over.is.object(false)).toEqual(false);
    expect(Over.is.object()).toEqual(false);
    expect(Over.is.object(1)).toEqual(false);
    expect(Over.is.object({})).toEqual(true);
    expect(Over.is.object([])).toEqual(false);
    expect(Over.is.object(null)).toEqual(false);
    expect(Over.is.object(undefined)).toEqual(false);
    expect(Over.is.object(function(){})).toEqual(false);

  });

  it("should work with is.array", function(){

    expect(Over.is.array("yes")).toEqual(false);
    expect(Over.is.array(false)).toEqual(false);
    expect(Over.is.array()).toEqual(false);
    expect(Over.is.array(1)).toEqual(false);
    expect(Over.is.array({})).toEqual(false);
    expect(Over.is.array([])).toEqual(true);
    expect(Over.is.array(null)).toEqual(false);
    expect(Over.is.array(undefined)).toEqual(false);
    expect(Over.is.array(function(){})).toEqual(false);

  });

  it("should work with is.null", function(){

    expect(Over.is["null"]("yes")).toEqual(false);
    expect(Over.is["null"](false)).toEqual(false);
    expect(Over.is["null"]()).toEqual(false);
    expect(Over.is["null"](1)).toEqual(false);
    expect(Over.is["null"]({})).toEqual(false);
    expect(Over.is["null"]([])).toEqual(false);
    expect(Over.is["null"](null)).toEqual(true);
    expect(Over.is["null"](undefined)).toEqual(false);
    expect(Over.is["null"](function(){})).toEqual(false);

  });

  it("should work with is.undefined", function(){

    expect(Over.is["undefined"]("yes")).toEqual(false);
    expect(Over.is["undefined"](false)).toEqual(false);
    expect(Over.is["undefined"]()).toEqual(true);
    expect(Over.is["undefined"](1)).toEqual(false);
    expect(Over.is["undefined"]({})).toEqual(false);
    expect(Over.is["undefined"]([])).toEqual(false);
    expect(Over.is["undefined"](null)).toEqual(false);
    expect(Over.is["undefined"](undefined)).toEqual(true);
    expect(Over.is["undefined"](function(){})).toEqual(false);

  });

  it("should work with etc", function(){

    expect(Over.is.etc("yes")).toEqual(Over.etc);
    expect(Over.is.etc(false)).toEqual(Over.etc);
    expect(Over.is.etc()).toEqual(Over.etc);
    expect(Over.is.etc(1)).toEqual(Over.etc);
    expect(Over.is.etc({})).toEqual(Over.etc);
    expect(Over.is.etc([])).toEqual(Over.etc);
    expect(Over.is.etc(null)).toEqual(Over.etc);
    expect(Over.is.etc(undefined)).toEqual(Over.etc);
    expect(Over.is.etc(function(){})).toEqual(Over.etc);

  });

});

describe("Over.signature", function(){

  it("should get an array of check functions from argument names", function(){

    var sig = Over.signature(function(name$string, age$number, something$object){})
    expect(sig[0]).toEqual(Over.is.string);
    expect(sig[1]).toEqual(Over.is.number);
    expect(sig[2]).toEqual(Over.is.object);

  });

});

describe("Over.test", function(){

  it("should know when they match", function(){

    var sig = Over.signature(function(name$string, age$number, something$object){})

    var arguments = ["str", 0, {}];
    expect(Over.test(sig, arguments)).toEqual(true);

    var arguments = ["str", 0];
    expect(Over.test(sig, arguments)).toEqual(false);

    var arguments = ["str"];
    expect(Over.test(sig, arguments)).toEqual(false);

    var arguments = [];
    expect(Over.test(sig, arguments)).toEqual(false);

  });

  it("should cope when there are more arguments than signature items", function(){

    var sig = Over.signature(function(name$string, age$number, something$object){})

    var arguments = ["str", 0, {}, "extra"];
    expect(Over.test(sig, arguments)).toEqual(false);

  });

  it("should be strict when there's no $etc", function(){

    var sig = Over.signature(function($string){})

    var arguments = ["str", 1];
    expect(Over.test(sig, arguments)).toEqual(false);

    var arguments = ["str"];
    expect(Over.test(sig, arguments)).toEqual(true);

  });

  it("should deal with the $etc shortcut", function(){

    var sig = Over.signature(function(name$string, $etc){});

    var arguments = ["str", 0, {}, "extra"];
    expect(Over.test(sig, arguments)).toEqual(true);

    var arguments = ["str", "extra"];
    expect(Over.test(sig, arguments)).toEqual(true);

    var arguments = ["str"];
    expect(Over.test(sig, arguments)).toEqual(true);

    var arguments = [0];
    expect(Over.test(sig, arguments)).toEqual(false);

  });

  it("should group all remaining arguments into an $etc array - https://github.com/stretchr/over.js/issues/1", function(){

    var calls = [];
    var sig = Over(function(name$string, $etc){
      calls.push(arguments);
    });

    sig("name", 1, 2, 3, "four");

    expect(calls.length).toEqual(1)
    expect(calls[0].length).toEqual(2)
    expect(calls[0][1].length).toEqual(4)
    expect(calls[0][1][0]).toEqual(1);
    expect(calls[0][1][1]).toEqual(2);
    expect(calls[0][1][2]).toEqual(3);
    expect(calls[0][1][3]).toEqual("four");

  });

  it("should send in an empty array if there are no additional arguments - https://github.com/stretchr/over.js/issues/1", function(){

    var calls = [];
    var sig = Over(function(name$string, $etc){
      calls.push(arguments);
    });

    sig("name");

    expect(calls.length).toEqual(1)
    expect(calls[0].length).toEqual(2)
    expect(calls[0][1].length).toEqual(0)

  });

});

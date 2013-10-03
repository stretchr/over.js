describe("Over should work", function(){

  it("should call the appropriate method", function(){

    var calls = {};
    var f = Over(

      function($string, $number){
        calls["one"] = calls["one"] || [];
        calls["one"].push(arguments);
        return "one";
      },
      function($string){
        calls["two"] = calls["two"] || [];
        calls["two"].push(arguments);
        return "two";
      },
      function($object, $array){
        calls["three"] = calls["three"] || [];
        calls["three"].push(arguments);
        return "three";
      },
      function($etc){
        calls["four"] = calls["four"] || [];
        calls["four"].push(arguments);
        return "four";
      }

    );

    expect(f("Mat", 30)).toEqual("one");
    expect(calls["one"][0][0]).toEqual("Mat");
    expect(calls["one"][0][1]).toEqual(30);

    expect(f("Ryan")).toEqual("two");
    expect(calls["two"][0][0]).toEqual("Ryan");

    var obj = {}, arr = [];
    expect(f(obj, arr)).toEqual("three");
    expect(calls["three"][0][0]).toEqual(obj);
    expect(calls["three"][0][1]).toEqual(arr);

    expect(f("Anything else", 1, 2, 3)).toEqual("four");
    expect(calls["four"][0][0]).toEqual("Anything else");
    expect(calls["four"][0][1]).toEqual(1);
    expect(calls["four"][0][2]).toEqual(2);
    expect(calls["four"][0][3]).toEqual(3);

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

  });

  it("should work with is.number", function(){

    expect(Over.is.number("yes")).toEqual(false);
    expect(Over.is.number(false)).toEqual(false);
    expect(Over.is.number()).toEqual(false);
    expect(Over.is.number(1)).toEqual(true);
    expect(Over.is.number({})).toEqual(false);
    expect(Over.is.string([])).toEqual(false);

  });

  it("should work with is.object", function(){

    expect(Over.is.object("yes")).toEqual(false);
    expect(Over.is.object(false)).toEqual(false);
    expect(Over.is.object()).toEqual(false);
    expect(Over.is.object(1)).toEqual(false);
    expect(Over.is.object({})).toEqual(true);
    expect(Over.is.object([])).toEqual(false);

  });

  it("should work with is.array", function(){

    expect(Over.is.array("yes")).toEqual(false);
    expect(Over.is.array(false)).toEqual(false);
    expect(Over.is.array()).toEqual(false);
    expect(Over.is.array(1)).toEqual(false);
    expect(Over.is.array({})).toEqual(false);
    expect(Over.is.array([])).toEqual(true);

  });

  it("should work with etc", function(){
    expect(Over.is.etc("yes")).toEqual(Over.etc);
    expect(Over.is.etc(false)).toEqual(Over.etc);
    expect(Over.is.etc()).toEqual(Over.etc);
    expect(Over.is.etc(1)).toEqual(Over.etc);
    expect(Over.is.etc({})).toEqual(Over.etc);
    expect(Over.is.etc([])).toEqual(Over.etc);
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

});

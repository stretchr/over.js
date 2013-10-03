describe("Over.argnames", function(){

  it("should break arguments out from a function", function(){

    var args = Over.argnames(function(name$string, age$number, something$object){});

    expect(args[0]).toEqual("name$string");
    expect(args[1]).toEqual("age$number");
    expect(args[2]).toEqual("something$object");

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

  it("should deal with the $etc shortcut", function(){

    var sig = Over.signature(function(name$string, $etc){})

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

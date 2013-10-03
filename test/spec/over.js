describe("Over.argnames", function(){

  it("should break arguments out from a function", function(){

    var args = Over.argnames(function(name$string, age$number, something$object){});

    expect(args[0]).toEqual("name$string");
    expect(args[1]).toEqual("age$number");
    expect(args[2]).toEqual("something$object");

  });

});

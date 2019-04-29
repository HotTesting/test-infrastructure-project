const { TODO } = require("../pageObjects/todo");
const todo = new TODO();
const { should } = require("chai");
should();

describe("Clear", function() {
    it("should remove one item", function() {
        todo.open();
        todo.create("test1");
        todo.items.should.not.be.empty;
        todo.items[0].delete();
        todo.items.should.be.empty;
    });
});

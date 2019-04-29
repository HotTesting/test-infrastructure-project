const { TODO } = require("../pageObjects/todo");
const todo = new TODO();
const { should } = require("chai");
should();

describe("Create", function() {
    it("should create one item", function() {
        todo.open();
        todo.create("test1");
        todo.items.should.not.be.empty;
        todo.filterByCompleted();
        todo.items.should.be.empty;
        todo.filterByActive();
        todo.items.should.not.be.empty;
    });

    it("should increase items left number", function() {
        todo.open();
        todo.itemsLeft().should.be.empty
        todo.create("test1");
        todo.itemsLeft().should.equal('1')
        todo.create("test1");
        todo.itemsLeft().should.equal('2')
    });
});

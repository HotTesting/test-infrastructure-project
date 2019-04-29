const { TODO } = require("../pageObjects/todo");
const todo = new TODO();
const { should } = require("chai");
should();

describe("Complete", function() {
    it("should complete one item", function() {
        todo.open();
        todo.create("test1");
        todo.items.should.not.be.empty;
        todo.items[0].complete();
        todo.items.should.not.be.empty;
        todo.items[0].isCompleted().should.be.true
        todo.filterByCompleted()
        todo.items.should.not.be.empty;
        todo.items[0].isCompleted().should.be.true
        todo.filterByActive()
        todo.items.should.be.empty;
    });
});

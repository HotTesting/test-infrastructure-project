const { TODO } = require("../pageObjects/todo");
const todo = new TODO();
const { should } = require("chai");
should();

describe("Clear all", function() {
    it("should remove all completed items", function() {
        todo.open();
        todo.create("test1");
        todo.create("test2");
        todo.create("test2");

        todo.setAllItemsAsCompleted();
        todo.clearCompleted();

        todo.items.should.be.empty
    });

    it("should not remove active item", function() {
        todo.open();
        todo.create("test1");
        todo.create("test2");
        todo.create("test3");

        todo.setAllItemsAsCompleted();
        todo.create("test4");
        todo.clearCompleted();

        todo.items.should.have.length(1)
        todo.items[0].text().should.include('test4')
    });
});

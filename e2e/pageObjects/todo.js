class TODO {
    get items() {
        return $$(".main .todo-list .todo").map(itm => new Item(itm));
    }

    open() {
        browser.url(global.SUT_URL);
        browser.pause(1000)
        //let source = browser.getPageSource()
        //console.log(source)
    }

    /**
     * Select "ALL" as filter - which shows all todo items
     */
    disableFilters() {
        $('footer .filters a[href="#/all"]').click();
        browser.pause(100);
    }

    filterByActive() {
        $('footer .filters a[href="#/active"]').click();
        browser.pause(100);
    }

    filterByCompleted() {
        $('footer .filters a[href="#/completed"]').click();
        browser.pause(100);
    }

    itemsLeft() {
        return $("footer .todo-count strong").getText();
    }

    create(name) {
        $("header input.new-todo").click();
        $("header input.new-todo").setValue(name);
        $("header input.new-todo").keys(["Enter"]);
        browser.pause(100);
    }

    setAllItemsAsCompleted() {
        $('.main label[for="toggle-all"]').click();
        browser.pause(100);
    }

    clearCompleted() {
        $("footer button.clear-completed").click();
        browser.pause(100);
    }
}

class Item {
    constructor(container) {
        this.container = container;
    }

    isCompleted() {
        const classes = this.container.getAttribute("class");
        const splitted = classes.split(" "); // splitting by classes
        return splitted.includes("completed");
    }

    text() {
        return this.container.$("label").getText();
    }

    complete() {
        this.container.moveTo();
        this.container.$('[type="checkbox"].toggle').click();
    }

    delete() {
        // js click
        browser.execute(
            elem => elem.click(),
            this.container.$("button.destroy")
        );
    }

    edit(newValue) {
        this.container.$("label").doubleClick();
        this.container.$('input[type="text"].edit').setValue(newValue);
    }
}

module.exports.TODO = TODO;
module.exports.Item = Item;

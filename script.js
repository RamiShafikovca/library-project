const myLibrary = [];
const books = document.getElementById("books");
const newBook = document.getElementById("newbook");
const formCont = document.getElementById("formcont");
const bookForm = document.getElementById("bookform");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return title + " by " + author + ", " + pages + " pages, " + (read ? "read" : "not read yet");
    };
}

function addBookToLibrary() {
    const title = prompt("What is the title?");
    const author = prompt("Who is the author?");
    const pages = prompt("How many pages?");
    const read = prompt("Have you read it? (true/false)");
    myLibrary.push(new Book(title, author, pages, read));
}

function displayLibrary() {
    books.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const bookElem = document.createElement("div");
        const bookEntry = document.createElement("p");
        const removeBtn = document.createElement("button");
        const readBtn = document.createElement("button");

        bookEntry.style.display = "inline";
        bookEntry.innerHTML = myLibrary[i].info();
        bookEntry.setAttribute("data-num", i);

        removeBtn.innerHTML = "Remove";   
        removeBtn.addEventListener("click", () => {
            myLibrary.splice(removeBtn.parentElement.getAttribute("data-num"), 1);
            displayLibrary();
        });
        readBtn.innerHTML = "Toggle Read";
        readBtn.addEventListener("click", () => {
            myLibrary[readBtn.parentElement.getAttribute("data-num")].read = !myLibrary[readBtn.parentElement.getAttribute("data-num")].read;
            displayLibrary();
        });

        bookElem.appendChild(bookEntry);
        bookElem.appendChild(readBtn);
        bookElem.appendChild(removeBtn);
        books.appendChild(bookElem);
    }
}

newBook.addEventListener("click", () => {
    formCont.style.display = "flex";
});

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = event.target.elements;
    myLibrary.push(new Book(fields.title.value, fields.author.value, fields.pages.value, fields.read.value.toLowerCase() == "true" ? true : false));
    bookForm.reset();
    formCont.style.display = "none";
    displayLibrary();
});


myLibrary[0] = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
myLibrary[1] = new Book("1984", "George Orwell", 328, true);
displayLibrary();
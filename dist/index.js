"use strict";
var Role;
(function (Role) {
    Role[Role["LIBRARIAN"] = 0] = "LIBRARIAN";
    Role[Role["MEMBER"] = 1] = "MEMBER";
})(Role || (Role = {}));
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class Member extends User {
    constructor(name, age) {
        super(name, age);
    }
    getRole() {
        return Role.MEMBER;
    }
}
class Librarian extends User {
    constructor(name, age) {
        super(name, age);
    }
    getRole() {
        return Role.LIBRARIAN;
    }
}
class Book {
    constructor(title, author, publishedDate) {
        this.title = title;
        this.author = author;
        this.publishedDate = publishedDate;
    }
}
class Library {
    constructor() {
        this.books = [];
        this.rentedBooks = new Map();
    }
    getBooks() {
        // 깊은 복사를 하여 외부에서 books를 수정하는 것을 방지합니다.
        return JSON.parse(JSON.stringify(this.books));
    }
    addBook(user, book) {
        if (user.getRole() !== Role.LIBRARIAN) {
            console.log("사서만 도서를 추가할 수 있습니다.");
            return;
        }
        this.books.push(book);
    }
    removeBook(user, book) {
        if (user.getRole() !== Role.LIBRARIAN) {
            console.log("사서만 도서를 삭제할 수 있습니다.");
            return;
        }
        const index = this.books.indexOf(book);
        if (index !== -1) {
            this.books.splice(index, 1);
        }
    }
    rentBook(user, book) {
        if (user.getRole() !== Role.MEMBER) {
            console.log("유저만 도서를 대여할 수 있습니다.");
            return;
        }
        if (this.rentedBooks.has(user.name)) {
            console.log(`${user.name}님은 이미 다른 책을 대여중이라 빌릴 수 없습니다.`);
        }
        else {
            this.rentedBooks.set(user.name, book);
            console.log(`${user.name}님이 [${book.title}] 책을 빌렸습니다.`);
        }
    }
    returnBook(user, book) {
        if (user.getRole() !== Role.MEMBER) {
            console.log("유저만 도서를 반납할 수 있습니다.");
            return;
        }
        if (this.rentedBooks.get(user.name) === book) {
            this.rentedBooks.delete(user.name);
            console.log(`${user.name}님이 [${book.title}] 책을 반납했어요!`);
        }
        else {
            console.log(`${user.name}님은 [${book.title}] 책을 빌린적이 없어요!`);
        }
    }
}
function main() {
    const myLibrary = new Library();
    const librarian = new Librarian("르탄이", 30);
    const member1 = new Member("예비개발자", 30);
    const member2 = new Member("독서광", 28);
    const book = new Book("TypeScript 문법 종합반", "강창민", new Date());
    const book2 = new Book("금쪽이 훈육하기", "오은영", new Date());
    const book3 = new Book("요식업은 이렇게!", "백종원", new Date());
    myLibrary.addBook(librarian, book);
    myLibrary.addBook(librarian, book2);
    myLibrary.addBook(librarian, book3);
    const books = myLibrary.getBooks();
    console.log("대여할 수 있는 도서 목록:", books);
    myLibrary.rentBook(member1, book);
    myLibrary.rentBook(member2, book2);
    myLibrary.returnBook(member1, book);
    myLibrary.returnBook(member2, book2);
}
main();

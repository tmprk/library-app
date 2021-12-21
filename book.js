export default class Book {
    constructor(url, isbn, title, pages, read=false) {
        this.url = url
        this.isbn = isbn
        this.title = title
        this.pages = pages
        this.read = read
    }
}
export class PaginatedResponse<T> {
    public docs!: T[];
    public total!: number;
    public limit!: number;
    public page!: number;
    public pages!: number;

    constructor(docs: T[], total: number, limit: number, page: number, pages: number) {
        this.docs = docs;
        this.total = total;
        this.limit = limit;
        this.page = page;
        this.pages = pages;
    }
}

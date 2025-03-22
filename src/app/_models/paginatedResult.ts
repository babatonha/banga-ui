export class PaginatedResult<T> {
    public pageNumber: number;
    public pageSize: number;
    public totalCount: number;
    public result: T[];

    constructor(
        pageNumber: number = 1,
        pageSize: number = 10,
        totalCount: number = 0,
        result: T[] = []
    ) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
        this.result = result;
    }
}
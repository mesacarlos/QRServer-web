export interface Pagination<T> {
	items: T[];
	totalItems?: number;
	totalPages: number;
}
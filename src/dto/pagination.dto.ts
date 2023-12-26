export interface PaginationDto<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

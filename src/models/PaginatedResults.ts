export interface PageInfo {
  page: number;
  count: number;
  totalCount: number;
  next?: number;
  prev?: number;
}

export class PaginatedResults<T> {
  results!: T[];
  pageToken?: string;
  pageInfo?: PageInfo;
}

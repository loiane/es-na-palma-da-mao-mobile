export interface SearchResult {
    totalHits: number;
    hist: Hit[];
}

export interface Hit {
    date: string;
    editionUrl: string;
    pageNumber: number;
    pageUrl: string;
    highlights: string[];
}
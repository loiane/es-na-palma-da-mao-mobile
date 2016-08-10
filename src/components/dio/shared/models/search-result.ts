import { Hit } from './hit';

export interface SearchResult {
    totalHits: number;
    hist: Hit[];
}
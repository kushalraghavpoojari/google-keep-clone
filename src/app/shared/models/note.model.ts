import { Label } from './label.model';

export interface Note {
    id: String,
    title: String,
    description: String,
    created_at: Date,
    modified_at: Date,
    labels: Label[],
    pinned: Boolean
}

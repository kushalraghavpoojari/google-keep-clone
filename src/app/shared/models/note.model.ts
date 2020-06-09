import { Label } from './label.model';

export interface NoteInterface {
    id?: String,
    title: String,
    description: String,
    created_at: Date,
    modified_at?: Date,
    labels: Label[],
    pinned: Boolean
}

export class Note {
    pinned: Boolean = false;
    created_at: Date = new Date();
    labels: Label[] = [];
    constructor(public title: String, public description: String) {
    }
}

import { Label } from './label.model';
import * as moment from 'moment/moment';

export interface NoteInterface {
    id?: String,
    title: String,
    description: String,
    created_at: String,
    modified_at?: String,
    labels: Label[],
    pinned: Boolean
}

export class Note {
    pinned: Boolean = false;
    created_at: String = moment().format('MMMM Do YYYY, h:mm:ss a');
    labels: Label[] = [];
    constructor(public title: String, public description: String) {
    }
}

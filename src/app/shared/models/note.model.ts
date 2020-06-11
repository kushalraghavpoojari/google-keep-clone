import { Label, LabelInterface } from './label.model';
import * as moment from 'moment/moment';

export interface NoteInterface {
    id?: string,
    title: string,
    description: string,
    created_at: string,
    modified_at?: string,
    labels: LabelInterface[],
    pinned: Boolean
}

export class Note {
    pinned: Boolean = false;
    created_at: string = moment().format('MMMM Do YYYY, h:mm:ss a');
    labels: LabelInterface[] = [];
    constructor(public title: string, public description: string) {
    }
}

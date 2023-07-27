

import { getUpdates,updateNotes } from './notes';
import moment from 'moment/moment';

const pageID = location.hash.substring(1);
const note = getUpdates(pageID);
const updateTitleEle = document.querySelector('#note-title');
updateTitleEle.value = note.title;
const updateBodyEle = document.querySelector('#note-body');
updateBodyEle.value = note.body;

    updateTitleEle.addEventListener('change',(e)=>{
        note.title = e.target.value;
    })
    updateBodyEle.addEventListener('change',(e)=>{
        note.body = e.target.value;
    })

    document.querySelector('#save-note').addEventListener('click',(e)=>{
        note.updatedAt = moment().valueOf();
        updateNotes(note);
    
    })
    
    document.querySelector('#discard-changes').addEventListener('click',(e)=>{
        location.assign('index.html');
    })
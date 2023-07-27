import {v4} from 'uuid';
import moment from 'moment';

let notes = [];


const loadNotes = ()=>{
    const notesJSON = localStorage.getItem('notes');
    if(notesJSON){
        return JSON.parse(notesJSON);
    }else{
        return [];
    }

}
notes = loadNotes();

const getNotes = () => notes;
const saveNotes = ()=>{
    localStorage.setItem('notes', JSON.stringify(notes));
}

const createNotes = ()=>{
    const id = v4();
    const timestamp =  moment().valueOf();
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes();

    return id;
 }
 const removeNotes = (id) =>{
    const index = notes.findIndex((note)=>note.id === id);
    notes.splice(index,1);
    saveNotes();
}

const getUpdates = (id)=> {
    return notes.find((note)=>note.id === id);

};

const updateNotes = (note)=>{
    saveNotes();
    location.assign('index.html');
}


const searchNotes = (searchText)=>{
    return notes.filter((note)=> note.title.toLowerCase().includes(searchText) || note.body.toLowerCase().includes(searchText));
}

const sortNotes = (sortBy)=>{
    if(sortBy === 'recently updated'){
        notes.sort((a,b)=>{
            if(a.updatedAt > b.updatedAt){
                return -1;
            }
        })
    }
    else if(sortBy === 'recently created'){
        notes.sort((a,b)=>{
            if(a.createdAt > b.createdAt){
                return -1;
            }
        })

    }
    else{
        notes.sort((a,b)=>{
            if(a.title < b.title){
                return -1;
            }
        })

    }
    return notes;
}

notes = loadNotes();
export {getNotes,createNotes,removeNotes,sortNotes,updateNotes,getUpdates,searchNotes};

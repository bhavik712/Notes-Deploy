import { getNotes,createNotes,removeNotes,sortNotes,updateNotes,setNotes,searchNotes} from "./notes";
import moment from "moment/moment";
let notes = (getNotes());

const showNotes = (notes) =>{
    document.querySelector('#render-notes').innerHTML = '';
    notes.forEach((note)=>{
        const divEle = document.createElement('div');
        document.querySelector('#render-notes').appendChild(divEle);

        const titleEle = document.createElement('h2');
        titleEle.textContent = note.title;
        divEle.appendChild(titleEle);

        const bodyEle = document.createElement('h3');
        bodyEle.textContent = note.body;
        divEle.appendChild(bodyEle);

        const lastEditedEle = document.createElement('h4');
        lastEditedEle.textContent = moment(note.updatedAt).fromNow();
        divEle.appendChild(lastEditedEle);

        const updateNoteButton = document.createElement('button');
        updateNoteButton.textContent = 'Update';
        titleEle.appendChild(updateNoteButton);        

        const deleteNoteButton = document.createElement('button');
        deleteNoteButton.textContent = 'Delete';
        titleEle.appendChild(deleteNoteButton);

        updateNoteButton.addEventListener('click',(e)=>{
            location.assign(`edit.html#${note.id}`)
            showNotes(notes);
        })

        deleteNoteButton.addEventListener('click', (e)=>{
            removeNotes(note.id);
            showNotes(notes);
        });
    })
}

document.querySelector('#create-note').addEventListener('click',(e)=>{
    const createdNoteID = createNotes();
    location.assign(`edit.html#${createdNoteID}`);
    showNotes(notes);
})

document.querySelector('#search-note').addEventListener('input', (e)=>{
    const searchResultNotes = searchNotes(e.target.value);
    if(searchResultNotes.length){
        showNotes(searchResultNotes);
    }else{
        document.querySelector('#render-notes').innerHTML = '';
        const resultEle = document.createElement('h2');
        resultEle.textContent = 'Sorry No Note found';
        document.querySelector('#render-notes').appendChild(resultEle);

    }
});

document.querySelector('#sort-note').addEventListener('click', (e)=>{
    const sortedNotes = sortNotes(e.target.value);
    showNotes(sortedNotes);
});


showNotes(notes);


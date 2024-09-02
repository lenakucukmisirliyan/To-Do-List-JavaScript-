const alertDOM = document.querySelector('.toast-body');

const inputElement = document.querySelector("#task");
const listDOM = document.querySelector('#list');

document.addEventListener('DOMContentLoaded', function() {
    const existingItems = document.querySelectorAll('#list li');
    existingItems.forEach(item => {
        addToggleAndDeleteEvents(item);
    });
});

const submitButton = document.querySelector("#liveToastBtn");
submitButton.addEventListener('click', function() {
    const inputText = inputElement.value.trim();
    
    if (inputText === "") {
        alertDOM.innerHTML = "Listeye boş ekleme yapamazsınız!";
        showToast('error');
    } else {
        addItem(inputText);
        inputElement.value = "";
        alertDOM.innerHTML = "Listeye eklendi.";
        showToast('success');
    }
});

const addItem = (inputText) => {
    if (inputText) {
        let liDOM = document.createElement('li');
        liDOM.innerHTML = `${inputText} <button class="btn btn-danger btn-sm float-right delete-btn">x</button>`;
        liDOM.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        liDOM.style.padding = "12px 8px 12px 40px";
        liDOM.style.margin = "0";
        liDOM.style.backgroundColor = "#eee";
        listDOM.append(liDOM);
        
        addToggleAndDeleteEvents(liDOM);
    }
}

const addToggleAndDeleteEvents = (liDOM) => {
    const deleteButton = liDOM.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
        liDOM.remove();
    });

    liDOM.addEventListener('click', function() {
        liDOM.classList.toggle('completed');
        liDOM.style.backgroundColor = liDOM.classList.contains('completed') ? '#007bff' : '#eee';
    });
}


const showToast = (type) => {
    const toast = document.querySelector(`.toast.${type}`);
    $(toast).toast('show');
}

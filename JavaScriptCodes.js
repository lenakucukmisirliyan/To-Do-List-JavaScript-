// Toast mesajı gösterimi için kullanılacak DOM elementi
const alertDOM = document.querySelector('.toast-body');

// Input alanını ve listeyi seçiyoruz
const inputElement = document.querySelector("#task");
const listDOM = document.querySelector('#list');

// Sayfa yüklendiğinde mevcut liste öğelerine tıklama olaylarını ekleyelim
document.addEventListener('DOMContentLoaded', function() {
    const existingItems = document.querySelectorAll('#list li');
    existingItems.forEach(item => {
        addToggleAndDeleteEvents(item);
    });
});

// "Ekle" butonuna tıklanma olayını dinliyoruz
const submitButton = document.querySelector("#liveToastBtn");
submitButton.addEventListener('click', function() {
    const inputText = inputElement.value.trim(); // Girişten boşlukları kaldırıyoruz
    
    if (inputText === "") {
        // Eğer input alanı boşsa hata mesajını göster
        alertDOM.innerHTML = "Listeye boş ekleme yapamazsınız!";
        showToast('error');  // Hata toast mesajını göster
    } else {
        // Eğer input doluysa öğeyi listeye ekle
        addItem(inputText);
        inputElement.value = "";  // Input alanını temizle
        alertDOM.innerHTML = "Listeye eklendi."; // Başarı mesajını göster
        showToast('success');  // Başarı toast mesajını göster
    }
});

// Listeye öğe ekleyen fonksiyon
const addItem = (inputText) => {
    if (inputText) {
        let liDOM = document.createElement('li');
        liDOM.innerHTML = `${inputText} <button class="btn btn-danger btn-sm float-right delete-btn">x</button>`;
        liDOM.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        liDOM.style.padding = "12px 8px 12px 40px";  // Aynı padding değerini uygulama
        liDOM.style.margin = "0";  // Aynı margin değerini uygulama
        liDOM.style.backgroundColor = "#eee";  // Yeni öğeler için arka plan rengini belirle
        listDOM.append(liDOM);
        
        // Yeni eklenen öğeye tıklama ve silme olaylarını ekle
        addToggleAndDeleteEvents(liDOM);
    }
}

// Öğeye tıklama ve silme olaylarını ekleyen fonksiyon
const addToggleAndDeleteEvents = (liDOM) => {
    // Silme butonuna tıklama olayını dinliyoruz
    const deleteButton = liDOM.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
        liDOM.remove();  // Liste öğesini kaldır
    });

    // Liste öğesine tıklama olayını dinliyoruz
    liDOM.addEventListener('click', function() {
        liDOM.classList.toggle('completed'); // Üstü çizili hale getir ve maviye boyar
        liDOM.style.backgroundColor = liDOM.classList.contains('completed') ? '#007bff' : '#eee';
    });
}


// Toast mesajını gösteren fonksiyon
const showToast = (type) => {
    const toast = document.querySelector(`.toast.${type}`);
    $(toast).toast('show');
}

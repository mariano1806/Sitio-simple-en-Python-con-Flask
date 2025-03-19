const textInput = document.getElementById('textInput');
const inputContainer = document.getElementById('inputContainer');
const colorButton = document.getElementById('colorButton');
const submitButton = document.getElementById('submitButton');
const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal-content');
const modalText = document.getElementById('modalText');
const closeModal = document.getElementById('closeModal');

let colorScheme = 0;
const colorSchemes = [
    { bg: "white", text: "black" },
    { bg: "black", text: "white" },
    { bg: "lightblue", text: "red" }
];

textInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        showModal();
    }
});

colorButton.addEventListener('click', function() {
    colorScheme = (colorScheme + 1) % 3;
    updateColors();
});

submitButton.addEventListener('click', async function() {
    try {
        const response = await fetch('/api/echo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: textInput.value })
        });
        
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        
        showModal();
    } catch (error) {
        console.error('Error al enviar datos:', error);
        alert('Error al comunicarse con el servidor');
    }
});

closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

function showModal() {
    modalText.textContent = textInput.value || 'No has ingresado ningún texto';
    modal.style.display = 'block';

    updateColors();
}

function updateColors() {
    const scheme = colorSchemes[colorScheme];

    inputContainer.style.backgroundColor = scheme.bg;
    textInput.style.backgroundColor = scheme.bg;
    textInput.style.color = scheme.text;
    
    modalContent.style.backgroundColor = scheme.bg;
    modalContent.style.color = scheme.text;
    modalText.style.backgroundColor = scheme.bg;
    modalText.style.color = scheme.text;
    
    modalText.style.borderColor = scheme.text === "white" ? "#555" : "#ddd";
}
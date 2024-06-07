const catawsElement = document.querySelector('.png-cataws');
const crowElement = document.querySelector('.png-crow');

let catawsPosition = 200; // Posición inicial de Cataws
let autoPosition = 20;
let direction = 1;
let isJumping = false;
let jumpStrength = 20; // Fuerza de salto de Cataws
let jumpHeight = 100; // Altura máxima del salto de Cataws

function moveCatawsLeft() {
    catawsPosition = Math.max(0, catawsPosition - 10);
    catawsElement.style.left = catawsPosition + 'px';
}

function moveCatawsRight() {
    catawsPosition = Math.min(window.innerWidth - catawsElement.offsetWidth, catawsPosition + 10);
    catawsElement.style.left = catawsPosition + 'px';
}

function jumpCataws() {
    if (!isJumping) {
        isJumping = true;
        let jumpInterval = setInterval(() => {
            if (jumpHeight <= 0) {
                clearInterval(jumpInterval);
                isJumping = false;
                return; // Sale de la función si el salto ha terminado
            }
            catawsPosition += jumpStrength; // Aumenta la posición vertical de Cataws
            catawsElement.style.bottom = jumpHeight + 'px';
            jumpHeight -= jumpStrength;
        }, 25); // Intervalo de salto de Cataws
    }
}

let crowPosition = window.innerWidth - crowElement.offsetWidth; // Posición inicial de Crow
let crowDirection = -1; // Inicialmente, Crow se moverá hacia la izquierda

function moveCrow() {
    const leftBound = 0; // Límite izquierdo del movimiento de Crow
    const proximityThreshold = 50; // Umbral de proximidad entre Crow y Cataws

    // Calcula la distancia entre Crow y Cataws
    const distance = Math.abs(crowPosition - catawsPosition);

    // Mueve a Crow según la dirección actual
    crowPosition += crowDirection * 3; // Cambia la velocidad según necesites
    crowElement.style.left = crowPosition + 'px';

    // Si Crow está cerca de Cataws, cambia su imagen
    if (distance <= proximityThreshold) {
        crowElement.src = 'crowPATALTA.png';
        console.log("Imagen de Crow cambiada a 'crowPATALTA.png'");
        
        // Después de 1 segundo, restaurar la imagen original de Crow
        setTimeout(() => {
            crowElement.src = 'crow.png';
            console.log("Imagen de Crow restaurada a 'crow.png'");
        }, 1000); // 1000 milisegundos = 1 segundo
    }

    // Si Crow alcanza el límite izquierdo, cambia de dirección
    if (crowPosition <= leftBound) {
        crowDirection = 1; // Cambia la dirección a la derecha
    }

    // Si Crow alcanza el límite derecho, cambia de dirección
    const rightBound = window.innerWidth - crowElement.offsetWidth;
    if (crowPosition >= rightBound) {
        crowDirection = -1; // Cambia la dirección a la izquierda
    }

    setTimeout(moveCrow, 25); // Mueve Crow cada 25 milisegundos
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveCatawsLeft();
    } else if (event.key === 'ArrowRight') {
        moveCatawsRight();
    } else if (event.key === 'ArrowUp') {
        jumpCataws();
    } else if (event.key === 'a') {
        console.log("Tecla 'a' presionada"); // Mensaje de consola para depuración
        // Cambiar la imagen de Cataws a 'catawsGOLPE.png'
        catawsElement.src = 'catawsGOLPE.png';
        console.log("Imagen de Cataws cambiada a 'catawsGOLPE.png'"); // Mensaje de consola para depuración

        // Después de 1 segundo, restaurar la imagen original de Cataws
        setTimeout(() => {
            catawsElement.src = 'cataws.png';
            console.log("Imagen de Cataws restaurada a 'cataws.png'"); // Mensaje de consola para depuración
        }, 1000); // 1000 milisegundos = 1 segundo
    }
});

// Llama a la función para mover automáticamente a Crow
moveCrow();

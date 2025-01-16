function getRandomHexColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const draggable = document.getElementById('draggable');
    const container1 = document.getElementById('container1');
    const container2 = document.getElementById('container2');

    draggable.style.background = getRandomHexColor()

    let isDragging = false;
    let offsetX, offsetY;

    // Сохраняем начальные координаты
    const startPosition = {
        x: draggable.getBoundingClientRect().left,
        y: draggable.getBoundingClientRect().top
    };

    // Функция для начала перетаскивания
    function startDragging(e) {
        isDragging = true;
        draggable.style.cursor = 'grabbing';
        
        // Определяем координаты касания или мыши
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        offsetX = clientX - draggable.getBoundingClientRect().left;
        offsetY = clientY - draggable.getBoundingClientRect().top;
    }

    // Функция для перемещения элемента
    function dragElement(e) {
        if (isDragging) {
            draggable.style.position = 'absolute';

            // Определяем координаты касания или мыши
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            draggable.style.left = `${clientX - offsetX}px`;
            draggable.style.top = `${clientY - offsetY}px`;
        }
    }

    // Функция для завершения перетаскивания
    function stopDragging() {
        if (isDragging) {
            const rectDraggable = draggable.getBoundingClientRect();
            const rectContainer1 = container1.getBoundingClientRect();
            const rectContainer2 = container2.getBoundingClientRect();

            // Проверка, попадает ли блок в контейнер номер 1
            if (
                rectDraggable.x >= rectContainer1.x &&
                rectDraggable.x + rectDraggable.width <= rectContainer1.x + rectContainer1.width &&
                rectDraggable.y >= rectContainer1.y &&
                rectDraggable.y + rectDraggable.height <= rectContainer1.y + rectContainer1.height
            ) {
                if (container1.children.length < 9) {
                    const newBlock = draggable.cloneNode(true); // Клонируем с содержимым
                    newBlock.style.position = 'static';
                    container1.appendChild(newBlock);
                } else {
                    alert('Контейнер номер 1 переполнен');
                }
            }

            // Проверка, попадает ли блок в контейнер номер 2
            if (
                rectDraggable.x >= rectContainer2.x &&
                rectDraggable.x + rectDraggable.width <= rectContainer2.x + rectContainer2.width &&
                rectDraggable.y >= rectContainer2.y &&
                rectDraggable.y + rectDraggable.height <= rectContainer2.y + rectContainer2.height
            ) {
                if (container2.children.length < 9) {
                    const newBlock = draggable.cloneNode(true); // Клонируем с содержимым  
                    newBlock.style.position = 'absolute';
                    newBlock.style.left = `${rectDraggable.left - rectContainer2.left}px`; // Устанавливаем позицию относительно контейнера 
                    newBlock.style.top = `${rectDraggable.top - rectContainer2.top}px`; // Устанавливаем позицию относительно контейнера 
                    container2.appendChild(newBlock);
                } else {                    alert('Контейнер номер 2 переполнен');
                }
            }

            // Сброс флага перетаскивания  
            isDragging = false;
            draggable.style.cursor = 'grab';
            draggable.style.backgroundColor = getRandomHexColor();
            // Возврат на исходное место 
            draggable.style.position = 'absolute';
            draggable.style.left = `${startPosition.x}px`;
            draggable.style.top = `${startPosition.y}px`;
        }
    }

    // Обработка событий мыши
    draggable.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', dragElement);
    document.addEventListener('mouseup', stopDragging);

    // Обработка событий касания для сенсорных устройств
    draggable.addEventListener('touchstart', startDragging);
    document.addEventListener('touchmove', dragElement);
    document.addEventListener('touchend', stopDragging);

    ///////////////////// РИСОВАЛОЧКА /////////////////////

    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    
    // Устанавливаем размер канваса
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 3;
    
    // Переменные для рисования
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    // Функция для получения координат
    function getCoordinates(e) {
        if (e.touches) {
            // Если это событие касания, берем координаты первого касания
            return {
                x: e.touches[0].clientX - canvas.getBoundingClientRect().left,
                y: e.touches[0].clientY - canvas.getBoundingClientRect().top
            };
        } else {
            // Если это событие мыши, берем координаты мыши
            return {
                x: e.offsetX,
                y: e.offsetY
            };
        }
    }
    
    // Функция начала рисования
    function startDrawing(e) {
        isDrawing = true;
        const { x, y } = getCoordinates(e);
        [lastX, lastY] = [x, y]; // Сохраняем начальные координаты
    }
    
    // Функция рисования
    function draw(e) {
        if (!isDrawing) return; // Если не рисуем, ничего не делаем
    
        const { x, y } = getCoordinates(e);
    
        ctx.strokeStyle = currentColor; // Установка цвета линии
        ctx.lineWidth = 2; // Толщина линии
        ctx.lineJoin = 'round'; // Скругление углов
        ctx.lineCap = 'round'; // Скругление концов
    
        ctx.beginPath(); // Начинаем новый путь
        ctx.moveTo(lastX, lastY); // Перемещаемся к последней позиции
        ctx.lineTo(x, y); // Рисуем линию до новой позиции
        ctx.stroke(); // Применяем рисование
    
        [lastX, lastY] = [x, y]; // Обновляем последние координаты
    }

    document.querySelectorAll('.color-button').forEach(button => {
        button.addEventListener('click', () => {
            currentColor = button.dataset.color; // Устанавливаем текущий цвет по атрибуту data-color
        });
    });
    
    // Функция окончания рисования
    function stopDrawing() {
        isDrawing = false;
    }
    
    // Слушаем события мыши
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Слушаем события касания
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Предотвращаем прокрутку страницы при касании
        startDrawing(e);
    });
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Предотвращаем прокрутку страницы при касании
        draw(e);
    });
    canvas.addEventListener('touchend', stopDrawing);
    
    // Адаптация под изменение размера окна
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth / 2;
        canvas.height = window.innerHeight / 3;
    });
    

});

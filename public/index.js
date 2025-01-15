document.addEventListener('DOMContentLoaded', () => {
    function getRandomHexColor() {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return `#${randomColor.padStart(6, '0')}`;
    }

    const draggable = document.getElementById('draggable');
    const container1 = document.getElementById('container1');
    const container2 = document.getElementById('container2');

    let isDragging = false;
    let offsetX, offsetY;

    // Сохраняем начальные координаты
    const startPosition = {
        x: draggable.getBoundingClientRect().left,
        y: draggable.getBoundingClientRect().top
    };

    draggable.addEventListener('mousedown', (e) => {
        isDragging = true;
        draggable.style.cursor = 'grabbing';
        offsetX = e.clientX - draggable.getBoundingClientRect().left;
        offsetY = e.clientY - draggable.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            draggable.style.position = 'absolute';
            draggable.style.left = `${e.clientX - offsetX}px`;
            draggable.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
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
                    newBlock.style.backgroundColor = getRandomHexColor();
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
                    newBlock.style.backgroundColor = getRandomHexColor();
                    newBlock.style.position = 'absolute';
                    newBlock.style.left = `${rectDraggable.left - rectContainer2.left}px`; // Устанавливаем позицию относительно контейнера
                    newBlock.style.top = `${rectDraggable.top - rectContainer2.top}px`; // Устанавливаем позицию относительно контейнера
                    container2.appendChild(newBlock);
                } else {
                    alert('Контейнер номер 2 переполнен');
                }
            }

            // Сброс флага перетаскивания 
            isDragging = false;
            draggable.style.cursor = 'grab';
            // Возврат на исходное место
            draggable.style.position = 'absolute';
            draggable.style.left = `${startPosition.x}px`;
            draggable.style.top = `${startPosition.y}px`;
        }
    });
});

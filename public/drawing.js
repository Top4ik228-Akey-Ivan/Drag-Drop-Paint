const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear')

// Устанавливаем размер канваса
canvas.width = window.innerWidth / 2; // Оставляем место для панелей цветов и фигур
canvas.height = window.innerHeight / 3;

// Переменные для рисования
let isDrawing = false;
let startX = 0;
let startY = 0;
let curX;
let curY;
let currentColor = 'black'; // Начальный цвет линии
let currentShape = 'line'; // Начальная фигура 
const shapes = []; // Массив для хранения фигур

// Функция для получения координат
function getCoordinates(e) {
    if (e.touches) {
        return {
            x: e.touches[0].clientX - canvas.getBoundingClientRect().left,
            y: e.touches[0].clientY - canvas.getBoundingClientRect().top
        };
    } else {
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
    [startX, startY] = [x, y]; // Сохраняем начальные координаты
}

// Функция рисования
function draw(e) {
    if (!isDrawing) return;

    const { x, y } = getCoordinates(e);
    [curX, curY] = [x, y]

    if (currentShape === 'line') {
        drawLine(x, y)
    } else {
        drawShape(startX, startY, x, y);
    }
}

function drawLine(x, y) {
    ctx.strokeStyle = currentColor; // Установка цвета линии
    ctx.lineWidth = 2; // Установка толщины линии
    ctx.lineJoin = 'round'; // Закругление углов
    ctx.lineCap = 'round'; // Закругление концов

    ctx.beginPath();
    ctx.moveTo(startX, startY); // Перемещаемся к последней позиции
    ctx.lineTo(x, y); // Рисуем линию до текущей позиции
    ctx.stroke(); // Отображаем линию

    [startX, startY] = [x, y]; // Обновляем последнюю позицию
}

// Функция рисования выбранной фигуры
function drawShape(x1, y1, x2, y2) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    redrawShapes()

    ctx.fillStyle = currentColor; // Установка цвета фигуры
    ctx.strokeStyle = currentColor;

    const width = x2 - x1;
    const height = y2 - y1;

    switch (currentShape) {
        case 'rectangle':
            ctx.fillRect(x1, y1, width, height);
            break;
        case 'square':
            const size = Math.min(width, height);
            ctx.fillRect(x1, y1, size, size);
            break;
        case 'circle':
            const radius = Math.sqrt(width * width + height * height) / 2;
            ctx.beginPath();
            ctx.arc(x1 + radius, y1 + radius, radius, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 'triangle':
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y1);
            ctx.lineTo((x1 + x2) / 2, y2);
            ctx.closePath();
            ctx.fill();
            break;
    }
}

// Функция перерисовки всех фигур
function redrawShapes() {
    shapes.forEach(({ shape, startX, startY, endX, endY, color }) => {
        ctx.fillStyle = color; // Установка цвета фигуры
        ctx.strokeStyle = color; // Установка цвета линии

        switch (shape) {
            case 'rectangle':
                const width = endX - startX;
                const height = endY - startY;
                ctx.fillRect(startX, startY, width, height);
                break;
            case 'square':
                const size = Math.min(endX - startX, endY - startY);
                ctx.fillRect(startX, startY, size, size);
                break;
            case 'circle':
                const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2) / 2;
                ctx.beginPath();
                ctx.arc(startX + radius, startY + radius, radius, 0, Math.PI * 2);
                ctx.fill();
                break;
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, startY);
                ctx.lineTo((startX + endX) / 2, endY);
                ctx.closePath();
                ctx.fill();
                break;
            case 'line':
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
                break;
        }
    });
}
// Функция окончания рисования
function stopDrawing(e) {
    if (!isDrawing) return;
    isDrawing = false;

    if (currentShape !== 'line') {
        shapes.push({ shape: currentShape, startX, startY, endX: curX, endY: curY, color: currentColor });
    }
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentShape = 'line'
}

// Обработчик выбора цвета
document.querySelectorAll('.color-button').forEach(button => {
    button.addEventListener('click', () => {
        currentColor = button.dataset.color; // Устанавливаем текущий цвет по атрибуту data-color
    });
});

// Обработчик выбора формы
document.querySelectorAll('.shape-button').forEach(button => {
    button.addEventListener('click', () => {
        currentShape = button.dataset.shape; // Устанавливаем текущую форму по атрибуту data-shape
    });
});

// Слушаем события мыши
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Слушаем события касания
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startDrawing(e);
});
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    draw(e);
});
canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    stopDrawing(e)
})

clearButton.addEventListener('click', clear)

// Адаптация под изменение размера окна
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth / 2; // Обновляем ширину канваса при изменении размера окна
    canvas.height = window.innerHeight / 3;
});
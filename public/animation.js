function createSnowFlake() { 
    const snowFlake = document.createElement('div'); 
    snowFlake.className = 'snowFlake'; 
    snowFlake.textContent = '❄'; 

    // Устанавливаем случайное положение по X
    snowFlake.style.left = Math.random() * 100 - 5 + 'vw'; // Случайное положение по X

    // Устанавливаем случайное положение по Y (в пределах видимости)
    snowFlake.style.top = Math.random() * -50 + 'px'; // Начинаем выше видимой области

    // Устанавливаем продолжительность анимации и размер снежинки
    snowFlake.style.animationDuration = Math.random() * 5 + 10 + 's'; // Случайная продолжительность анимации
    snowFlake.style.fontSize = Math.random() * 10 + 10 + 'px'; // Случайный размер снежинки

    document.querySelector('.snowFlakes').appendChild(snowFlake); 

    // Удаляем снежинку через определенное время
    setTimeout(() => snowFlake.remove(), 10000); // Удаляем снежинку через 10 секунд

} 
setInterval(createSnowFlake, 300);


function createSnowFlake() { 
    const snowFlake = document.createElement('div'); 
    snowFlake.className = 'snowFlake'; 
    snowFlake.textContent = '❄'; 

    // Устанавливаем случайное положение по X и Y
    snowFlake.style.left = Math.random() * 100 - 5 + 'vw'; // Случайное положение по X
    snowFlake.style.top = 0; // Случайное положение по Y

    // Устанавливаем продолжительность анимации и размер снежинки
    snowFlake.style.animationDuration = Math.random() * 3 + 7 + 's'; 
    snowFlake.style.fontSize = Math.random() * 10 + 10 + 'px'; 

    document.querySelector('.snowFlakes').appendChild(snowFlake); 

    // Удаляем снежинку через 10 секунд
    setTimeout(() => snowFlake.remove(), 10000); 
} 

setInterval(createSnowFlake, 300);

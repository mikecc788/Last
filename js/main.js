// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 随机调整英雄区域的高度
function setRandomHeroHeight() {
    const hero = document.querySelector('.hero');
    const minHeight = 100; // 最小高度为视口高度的 100%
    const maxHeight = 150; // 最大高度为视口高度的 150%
    const randomHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    hero.style.height = `${randomHeight}vh`;
}

// 页面加载时设置随机高度
window.addEventListener('load', setRandomHeroHeight);

// 每次调整窗口大小时重新设置随机高度
window.addEventListener('resize', setRandomHeroHeight);

// 更新轮播功能
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-container');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;

    function showSlide(index) {
        carousel.style.transform = `translateX(-${index * 50}%)`; // 改为50%
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % (items.length - 1); // 减1，因为我们一次显示两张图片
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + (items.length - 1)) % (items.length - 1); // 同样减1
        showSlide(currentIndex);
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // 自动轮播
    setInterval(nextSlide, 5000); // 每5秒切换一次
});

// 添加产品滑动功能
document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('.product-container');
    const products = document.querySelectorAll('.product-item');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    let currentIndex = 0;

    function showProducts(index) {
        productContainer.style.transform = `translateX(-${index * 33.33}%)`;
    }

    function nextProduct() {
        currentIndex = (currentIndex + 1) % (products.length - 2); // -2 因为我们一次显示3张图片
        showProducts(currentIndex);
    }

    function prevProduct() {
        currentIndex = (currentIndex - 1 + products.length - 2) % (products.length - 2);
        showProducts(currentIndex);
    }

    nextButton.addEventListener('click', nextProduct);
    prevButton.addEventListener('click', prevProduct);

    // 防止点击链接时触发滑动
    productContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('product-link')) {
            e.stopPropagation();
        }
    });
});

// Add more JavaScript functionality as needed
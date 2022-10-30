const tabs = (headerSelector, tabsSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector),
        tabs = document.querySelectorAll(tabsSelector),
        content = document.querySelectorAll(contentSelector);

    function hideTabContent() {
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
        
        content.forEach((item) => {
            item.style.display = 'none';
        });
    }

    function showTabContent(i = 0) {
        content[i].style.display = 'block';
        tabs[i].classList.add(activeClass);
    }
    hideTabContent();
    showTabContent();

    header.addEventListener('click', (e) => {
        const target = e.target;
        
        if (target && (target.classList.contains(tabsSelector.replace(/\./, '')) ||
            target.parentNode.classList.contains(tabsSelector.replace(/\./, '')))) {
                tabs.forEach((item, i) => {
                    if (target === item || target.parentNode === item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
    });
};

export default tabs;
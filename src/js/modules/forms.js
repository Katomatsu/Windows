import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');
        
    const message = {
        loading: './assets/img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.spinner').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach((item) => {
            item.value = '' ;
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let spinner = document.createElement('img');
            spinner.src = message.loading;
            spinner.classList.add('spinner');
            item.appendChild(spinner);
            
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                    state[key] = '';
                }

            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                    
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                    
                })
                .finally(() => {
                    clearInputs();
                    spinner.remove();
                    setTimeout(() => {
                       statusMessage.remove();
                    }, 2000);
                });
        });
    });
};

export default forms;
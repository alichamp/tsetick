const regExp = /^\d+$/;
const containsOnlyDigits = (str) => {
    return regExp.test(str);
};
console.log(containsOnlyDigits("12345"));
console.log(containsOnlyDigits("12a45"));


const logEverySecond = () => {
    setInterval(() => {
        console.log("Прошла секунда");
    }, 1000);
};
logEverySecond();


const count = () => {
    let i = 1;
    const interval = setInterval(() => {
        console.log(i);
        if (i === 10) {
            clearInterval(interval);
        }
        i++;
    }, 1000);
};
count();


const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

let timeLeft = 10;
let timerInterval = null;

startBtn.addEventListener('click', () => {
    if (timerInterval !== null || timeLeft <= 0) return;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }, 1000);
});

stopBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 10;
    timerDisplay.textContent = timeLeft;
});


const box = document.getElementById('box');
box.addEventListener('click', () => {
    box.classList.toggle('active');
});


const xhr = new XMLHttpRequest();
xhr.open('GET', 'test.json');
xhr.onload = () => {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
    }
};
xhr.send();


const loginInput = document.getElementById('loginInput');
const checkBtn = document.getElementById('checkBtn');
const userCard = document.getElementById('userCard');
const message = document.getElementById('message');

checkBtn.addEventListener('click', async () => {
    const loginValue = loginInput.value.trim();
    userCard.innerHTML = '';
    message.textContent = '';

    try {
        const response = await fetch('users.json');
        if (!response.ok) {
            throw new Error('Ошибка загрузки');
        }
        const users = await response.json();
        const foundUser = users.find(u => u.login === loginValue);

        if (foundUser) {
            userCard.innerHTML = `
                <img src="${foundUser.image}" alt="avatar" width="100">
                <h3>Логин: ${foundUser.login}</h3>
                <p>Роль: ${foundUser.role}</p>
                <p>Email: ${foundUser.email}</p>
            `;
        } else {
            message.textContent = 'Пользователь не найден';
        }
    } catch (error) {
        message.textContent = 'Не удалось выполнить запрос к серверу';
    }
});


const getUser = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, name: 'Ivan' });
        }, 1000);
    });
};

const getPosts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['Post 1', 'Post 2']);
        }, 2000);
    });
};

const getComments = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['Comment 1', 'Comment 2']);
        }, 3000);
    });
};

Promise.all([getUser(), getPosts(), getComments()])
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.error(error);
    });


const getUserData = async (id) => {
    try {
        const response = await fetch(`https://typicode.com{id}`);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error.message);
    } finally {
        console.log("Запрос завершён");
    }
};
getUserData(1);


const sendPhoto = async () => {
    const photoData = {
        albumId: 1,
        title: "accusamus beatae ad facilis cum similique qui sunt",
        url: "https://picsum.photos",
        thumbnailUrl: "https://picsum.photos"
    };

    try {
        const response = await fetch('https://typicode.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(photoData)
        });

        if (!response.ok) {
            throw new Error(`Ошибка при отправке: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Произошла ошибка:', error.message);
    }
};
sendPhoto();

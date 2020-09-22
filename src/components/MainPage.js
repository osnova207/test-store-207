import React, {Component} from "react";

class MainPage extends Component {

    render() {
        return (
            <div className='MainPage-wrapper page-wrapper'>
                <div className='MainPage page'>
                    <div className='Welcome'>
                        <h2>Добро пожаловать!</h2>
                        <p>Представляю Вашему вниманию мой учебный проект административного интерфейса для магазина абстрактных товаров.</p>
                        <p>Целью этого проекта является обкатывание полученных знаний.</p>
                        <p>В этом проекте используется следующий стек технологий: React javascript, React Redux, React Router, SCSS.</p>
                        <p>Для доступа ко всем возможностям проекта необходимо авторизоваться. Используй логин: <span>Admin</span>, пароль: <span>12345</span>. Логин чувстителен к регистру!</p>
                    </div>
                </div>
             </div>
        )
    }
}

export default MainPage;
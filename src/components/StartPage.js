import React from "react";
import {Link} from "react-router-dom";

const StartPage = () => (
    <div className='Start-page'>
        <div className='Welcome'>
            <h1 className="text-center">Добро пожаловать в Store 207!</h1>
            <p className="text-center">Представляю Вашему вниманию мой учебный проект административного интерфейса для магазина абстрактных товаров.</p>
            <p className="text-center">Целью этого проекта является применение полученных знаний и навыков.</p>
            <p className="text-center">
                Для доступа ко всем возможностям проекта необходимо&nbsp;
                <Link to="/login" className="Start-page__auth">авторизоваться</Link>
                .
            </p>
            <p>В проекте реализован следующий функционал:</p>
            <ul className="Start-page__opportunities-list">
                <li>Добавление/изменение/удаление сущностей</li>
                <li>Добавление сущностям свойств</li>
                <li>Сортировка списка</li>
                <li>Поиск по списку</li>
                <li>Пагинация списка</li>
                <li>Все страницы, кроме главной, доступны только авторизованному пользователю</li>
                <li>Нельзя добавить существующее свойство</li>
                <li>Нотификация выполненных действий</li>
            </ul>
            <p>В этом проекте используется следующий стек технологий:</p>
            <ul className="Start-page__tech-list">
                <li>React javascript</li>
                <li>React-redux</li>
                <li>Firebase</li>
                <li>Reselect</li>
                <li>React-router-dom</li>
                <li>Formik</li>
                <li>Yup</li>
                <li>Moment JS</li>
                <li>React-bootstrap</li>
                <li>Prop-types</li>
                <li>Classnames</li>
                <li>React outside click handler</li>
                <li>React-tostify</li>
                <li>Material design icons</li>
                <li>SCSS</li>
            </ul>
        </div>
    </div>
);

export default StartPage;
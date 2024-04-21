[![Статус тестов](../../actions/workflows/tests.yml/badge.svg)](../../actions/workflows/tests.yml)

# Учебный проект - Место на React

## Описание проекта

Это веб-приложение предназначенное для добавления/удаления фотографий, 
с возможностью просмотра и постановки лайков фотографиям других пользователей, 
выполненное в рамках учебной проектной работы в Яндекс.Практикум.

## Функционал

- Авторизация и аутентификация пользователей.
- Редактирование профиля(изменение информации о себе и аватар)
- Добавление / удаление карточек
- Постановка и удаление лайков фотографиям других пользователей.
- Все роуты, кроме аутентификации и авторизации, защищены авторизацией.
- Настроено логгирование (запросы и ответы записываются в `request.log`, ошибки записываются в `error.log`).
- Данные, которые приходят в теле и параметрах запроса, валидируются.
- Ошибки обрабатываются централизованным обработчиком.
- Для ошибок API созданы классы, расширяющие конструктор `Error`.
- Реализовано бережное хранение пароля (пароль хранится в виде хеша, API не возвращает хеш пароля клиенту)
  
## Технологии:

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)&nbsp;
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)&nbsp;
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)&nbsp;
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)&nbsp;
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)&nbsp;
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)&nbsp;
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)&nbsp;
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)&nbsp;


## Ссылки на проект

IP 158.160.114.129

Frontend https://jane-mesto.nomoredomainsmonster.ru/

Backend https://api.jane-mesto.nomoredomainsmonster.ru/

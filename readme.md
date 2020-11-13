Gallery of heroes

Link на готовый проект:
https://1985makarovdenis1985.github.io/JSN_Task_IndexedDB/dist/

Link на готовый репозиторий:
https://github.com/1985MakarovDenis1985/JSN_Task_IndexedDB


Проект «Collection of Heroes »
В связи с тем, что знаний в области Back-End не было, проект пришлось в итоге  переделать на indexedDb. Использовались: HTML5, SASS, REACT, REDAX, INDEXEDDB

Краткое описание:
	Локальная галлерея героев.
	Добавляет, читает и скачивает изображения.
	Реализован глобальный поиск по коллекции а так же полное ее удаление.
	Реализовано чтение всей информации изображения перед ее добавлением в базу 
	Так же было добавленно: (имя файла, тип данных, вес в b, истинный размер, дата и время создания и добавления изображения в коллекцию, формат, количество изображений в базе, описание) /закоментировано в коде/, а также чтение данных любого изображения с данными в  коллекции.
	Реализована легкая валидация на уже имеющееся изображение в коллекции.

Проблемы возникшие при исполнении:
<h5>В связи с тем, что Blob (хранение изображений) очень плохо поддерживается в Chrome бывает потеря ссылки. 
Работа в Safari и Firefox поддерживается хорошо без потери ссылки.
</h5>
Папка с карточками героев для теста находится в репозитории под названием «imagesForTest»
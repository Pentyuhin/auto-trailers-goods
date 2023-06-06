
const center = [55.0732213438483, 38.79757414620127];

function init() {
    let map = new ymaps.Map('map__yandex', {
        center: center,
        zoom: 17,
        // controls: ['routePanelControl'],
    });

    let placemark = new ymaps.Placemark(center, {
        // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
        balloonContentHeader: "АвтоТрейлер",
        balloonContentBody: "Прицепы на все случии жизни!",
        balloonContentFooter: "+79771016953",
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'https://cdn-icons-png.flaticon.com/512/7258/7258534.png',
        // Размеры метки.
        iconImageSize: [40, 40],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-15, -35]
    });

    // let control = map.controls.get('routePanelControl');
    // let = myPlace = 'Коломна';

    // control.routePanel.state.set({
    //     // Тип маршрутизации.
    //     type: 'masstransit',
    //     // Выключим возможность задавать пункт отправления в поле ввода.
    //     fromEnabled: true,
    //     // Адрес или координаты пункта отправления.
    //     // from: 'Москва, Льва Толстого 16',
    //     // Включим возможность задавать пункт назначения в поле ввода.
    //     toEnabled: false,
    //     // Адрес или координаты пункта назначения.
    //     to: `${myPlace}, проезд Станкостроителей 5а`
    // });

    // Зададим опции панели для построения машрутов.
    // control.routePanel.options.set({
    //     // Запрещаем показ кнопки, позволяющей менять местами начальную и конечную точки маршрута.
    //     allowSwitch: false,
    //     // Включим определение адреса по координатам клика.
    //     // Адрес будет автоматически подставляться в поле ввода на панели, а также в подпись метки маршрута.
    //     reverseGeocoding: true,
    //     // Зададим виды маршрутизации, которые будут доступны пользователям для выбора.
    //     types: { masstransit: true, pedestrian: true, taxi: true }
    // });

    map.geoObjects.add(placemark);
}


ymaps.ready(init);
const elements = [$('#question'), $('#first'), $('#second'), $('#third')];
const yandex_base = 'https://yandex.ru/search/?'
const ws = new ReconnectingWebSocket(
                `ws://localhost:8779`, null,
                {debug: true, reconnectInterval: 500, timeoutInterval: 2000}
            );

ws.addEventListener('open', function(event) {
    console.log('Established WS connection', ws);
    $('#connection-status').addClass('connected');
});

ws.addEventListener('close', function(event) {
    console.log('Closed WS connection');
    $('#connection-status').removeClass('connected');
});

ws.addEventListener('message', function(event) {
    let data = JSON.parse(event.data);
    for (var i = Math.min(data.length, 4) - 1; i >= 0; i--) {
        elements[i].attr('src', yandex_base + $.param({text: data[i]}));
    }
});

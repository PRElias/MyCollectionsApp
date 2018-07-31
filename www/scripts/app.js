$("#butMenu").click(function () {
    $("#sidebar").toggleClass("slidein");
});

var app = {
    isLoading: true,
    visibleCards: {},
    games: [],
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main')
};

app.getGames = function (force) {
    app.spinner.setAttribute('hidden', false);

    var url = 'http://mycollectionsapi.paulorobertoelias.com.br/api/Games';
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                app.games = request.response;
                localStorage.setItem("games", app.games);
            }
        }
    };
    request.open('GET', url, false);
    request.send();

    app.renderizeGames();
    app.spinner.setAttribute('hidden', true);

};

app.renderizeGames = function () {
    var items = [];
    var games = JSON.parse(app.games);
    for (var index in games) {
        var game = games[index];

        items.push(
            "<div class='row' id='" + game.gameID + "'>" +
            //"<p>" + game.name + "</p > " +
            "<img class='col cover' src='" + game.cover + "' alt='logo' data-toggle='modal' data-target='#myModal" + game.gameID + "' /img>" +
            "</div><div id='myModal" + game.gameID + "' class='modal fade' role='dialog'>" +
            "<div class='modal-dialog mymodal'>" +
            "<div class='modal-content mymodal-content'>" +
            "<div class='modal-header'>" +
            "<h6 class='modal-title'>" + game.name + "</h6>" +
            "</div><div class='modal-body'>" +
            "<p><small>Informações sobre o jogo</small></p>" +
            //"<button type='button' class='close' data-dismiss='modal'>Fechar</button>" +
            "</div></div></div></div>"
        );
    }

    var wrapper = document.createElement('div');
    wrapper.innerHTML = items.join("");

    var main = document.getElementById("main_div");
    main.appendChild(wrapper);
};

app.getGames(false);

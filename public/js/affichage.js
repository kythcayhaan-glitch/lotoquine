function syncAffichage() {
    fetch('/api/numeros')
        .then(function (r) { return r.json(); })
        .then(function (data) {
            document.querySelectorAll('.case').forEach(function (btn) {
                var n = parseInt(btn.dataset.numero);
                if (data.sortis.includes(n)) {
                    btn.classList.add('sorti');
                } else {
                    btn.classList.remove('sorti');
                }
            });

            var dernier = document.getElementById('dernier-numero');
            dernier.textContent = data.dernier !== null ? data.dernier : '-';

            document.getElementById('compteur').textContent = data.compte + ' / 90';
        });
}

syncAffichage();
setInterval(syncAffichage, 1000);

document.getElementById('btn-fullscreen').addEventListener('click', function () {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

document.addEventListener('fullscreenchange', function () {
    var btn = document.getElementById('btn-fullscreen');
    btn.textContent = document.fullscreenElement ? '✕ Quitter' : '⛶ Plein écran';
});

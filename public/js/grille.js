document.querySelectorAll('.case').forEach(function (btn) {
    btn.addEventListener('click', function () {
        var n = btn.dataset.numero;
        fetch('/numero/' + n, { method: 'POST' })
            .then(function (r) { return r.json(); })
            .then(function (data) {
                if (data.action === 'sorti') {
                    btn.classList.add('sorti');
                } else {
                    btn.classList.remove('sorti');
                }
                syncDepuisApi();
            });
    });
});

document.getElementById('reset').addEventListener('click', function () {
    fetch('/reset', { method: 'POST' })
        .then(function () { syncDepuisApi(); });
});

function syncDepuisApi() {
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
            document.getElementById('compteur').textContent = data.compte + ' / 90';
        });
}

syncDepuisApi();

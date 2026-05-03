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
            });
    });
});

document.getElementById('reset').addEventListener('click', function () {
    fetch('/reset', { method: 'POST' })
        .then(function () {
            document.querySelectorAll('.case.sorti').forEach(function (btn) {
                btn.classList.remove('sorti');
            });
        });
});

function syncDepuisApi() {
    fetch('/api/numeros')
        .then(function (r) { return r.json(); })
        .then(function (sortis) {
            document.querySelectorAll('.case').forEach(function (btn) {
                var n = parseInt(btn.dataset.numero);
                if (sortis.includes(n)) {
                    btn.classList.add('sorti');
                } else {
                    btn.classList.remove('sorti');
                }
            });
        });
}

syncDepuisApi();

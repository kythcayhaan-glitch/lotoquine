function syncAffichage() {
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

syncAffichage();
setInterval(syncAffichage, 1000);

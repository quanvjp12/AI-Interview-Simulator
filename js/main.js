const API_URL = 'http://localhost:3000';

(function prewarmBackend() {
    fetch(`${API_URL}/api/health`, { method: 'GET' })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            console.log('Backend status:', data.message || 'Ready');
        })
        .catch(function(err) {
            console.log('Pre-warming backend in progress...');
        });
})();


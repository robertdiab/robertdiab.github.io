(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var list = document.getElementById('com-list');
    if (!list) return;

    var entries = Array.from(list.querySelectorAll('.pub-entry'));
    if (!entries.length) return;

    var origOrder = entries.slice();

    document.querySelectorAll('.pub-filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.pub-filter-btn').forEach(function (b) {
          b.classList.remove('active');
        });
        this.classList.add('active');

        var filter = this.getAttribute('data-filter');
        if (filter === 'date') {
          showDate(list);
        } else {
          showGrouped(list, filter);
        }
      });
    });

    function showDate(list) {
      list.querySelectorAll('.pub-group-heading').forEach(function (h) { h.remove(); });
      origOrder.forEach(function (entry) { list.appendChild(entry); });
    }

    function showGrouped(list, attr) {
      var topicOrder = ['artificial intelligence', 'AI in legal practice', 'social media', 'privacy', 'democracy'];
      var kindOrder  = ['opinion', 'book review'];
      var order = attr === 'topic' ? topicOrder : kindOrder;

      var groups = {};
      origOrder.forEach(function (entry) {
        var val = entry.getAttribute('data-' + attr);
        if (!groups[val]) groups[val] = [];
        groups[val].push(entry);
      });

      while (list.firstChild) list.removeChild(list.firstChild);

      order.forEach(function (key) {
        if (!groups[key]) return;
        var kindLabels = { 'book review': 'Book reviews' };
        var h = document.createElement('h4');
        h.className = 'pub-group-heading';
        h.textContent = (kindLabels[key] || key.charAt(0).toUpperCase() + key.slice(1)) + ':';
        list.appendChild(h);
        groups[key].forEach(function (entry) { list.appendChild(entry); });
      });
    }
  });
})();

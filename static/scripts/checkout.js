(function() {
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = 'http://localhost:3000/static/favicon.ico';
  document.getElementsByTagName('head')[0].appendChild(link);
})();

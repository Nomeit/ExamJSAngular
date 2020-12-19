function getTemplate(html) {
  return `<!DOCTYPE html>
<html>
<head>
  <link href="/css/style.css" rel="stylesheet">
  <script src="/js/api.js"></script>
  <title>Сервер на Node js</title>
  <meta charset="UTF-8">
</head>
<body>
  <header>
    <ul>
      <li>
        <a href="/" >Головна</a>
        <a href="/stations" >Станції</a>
        <a href="/rout" >Маршрути</a>
      </li>
    </ul>
  </header>

  ${html}
</body>
</html>`
}

module.exports = {
  getTemplate
}
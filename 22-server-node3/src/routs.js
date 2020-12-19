
function getRoutsHtml(routArr, store) {

  if (routArr[1] && routArr[2]) {

    const rout = store.routs[routArr[2]];
    let stationList = "";
    rout.waybill.forEach(([stationId, time]) => {
      stationList += `
        <li> ${store.stations[stationId] && store.stations[stationId].name
          ? store.stations[stationId].name
          : ''
        } </li>
      `;
    });

    stationList = `
      <ul>
        ${stationList}
      </ul>
    `
    return `
      <a href="/rout">назад</a>
      <br>
      Маршрут з ідентифікатором ${routArr[2]} ${store.routs[routArr[2]].name}
        ${stationList}
      `;
  }
  let s = `
    <div>
      <input id="addRoutNumber" placeholder="Номер" type="text" value="">
      <input id="addRoutName" placeholder="Назва маршруту" type="text" value="">
      <button onclick="createRout();">ок</button>
    </div>
    <script src="/js/rout.js"></script>
  `;
  Object.keys(store.routs).forEach(routsId => {
  	s +=`
      <li id="rout-${routsId}">
        <a href="rout/${routsId}">${store.routs[routsId].name}</a>
        <button onclick="deleteRout(${routsId});">X</button>
      </li>`;
  });

  return `
  <ul id="rout-list">
  	${s}
  </ul>`;
}

module.exports = {
  getRoutsHtml
}
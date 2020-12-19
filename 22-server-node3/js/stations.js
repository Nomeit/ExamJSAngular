async function createStation() {

  const addStationEl = document.querySelector("#addStation");
  const name = addStationEl.value;

  try {

    if (!name) {
      throw new Error('Введіть коректні дані.');
    }

    const res = await api("station", "POST", {name});

    if (res.status) {
      const input = document.querySelector("input");
      input.value = "";
      const ul = document.querySelector("#stations");
      const li = document.createElement("li");
      li.id = `station-${res.data.id}`;
      li.innerHTML = `<a href="stations/${res.data.id}">${name}</a>
        <button onclick="deleteStantion(${res.data.id});">X</button>`;
      ul.appendChild(li);
      return res.data;
    }

    throw new Error(res.error);

  } catch (e) {
    console.log(e);
    alert(e.message);
  }
}

async function deleteStation(id) {

  // TODO десь взяти id

  try {

    if (!id) {
      throw new Error('Не вибрано що слід видалити.');
    }

    const res = await api("station", "DELETE", {id});
    const ul = document.querySelector("#stations");
    const li = document.querySelector(`#station-${res.data.id}`);
    console.log(li, `#station-${res.data.id}`);
    ul.removeChild(li);
    if (res.status) {
      return res.data;
    }

    throw new Error(res.error);

  } catch (e) {
    console.log(e);
    alert(e.message);
  }
}

async function editStation(id) {

  // TODO десь взяти id
  const inputElement = document.querySelector("#editStation");
  const name = inputElement.value;

  try {

    if (!id) {
      throw new Error('Немає ідентифікатора.');
    }

    if (!name) {
      throw new Error('Немає імені.');
    }

    const res = await api("station", "PUT", {id, name});

    if (res.status) {
      alert("Зміни збережено!");
      return res.data;
    }

    throw new Error(res.error);

  } catch (e) {
    console.log(e);
    alert(e.message);
  }
}

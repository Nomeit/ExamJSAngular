async function createRout() {

  const addRoutNameEl = document.querySelector("#addRoutName");
  const addRoutNumberEl = document.querySelector("#addRoutNumber");
  const name = addRoutNameEl.value;
  const number = addRoutNumberEl.value;

  try {

    if (!name) {
      throw new Error('Введіть коректні дані.');
    }

    const res = await api("rout", "POST", {name, number});
    const input = document.querySelector("input");
    input.value = "";
    const ul = document.querySelector("#rout-list");
    const li = document.createElement("li");
    li.id = `station-${res.data.id}`;
    li.innerHTML = `<a href="rout/${res.data.id}">${name}</a>
      <button onclick="deleteRout(${res.data.id});">X</button>`;
    ul.appendChild(li);

    if (res.status) {
      return res.data;
    }

    throw new Error(res.error);

  } catch (e) {
    console.log(e);
    alert(e.message);
  }
}

async function deleteRout(id) {

  // TODO десь взяти id

  try {

    if (!id) {
      throw new Error('Не вибрано що слід видалити.');
    }

    const res = await api("rout", "DELETE", {id});
    const ul = document.querySelector("#rout-list");
    const li = document.querySelector(`#rout-${res.data.id}`);

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

async function editRout(id) {

  // TODO десь взяти id
  const inputElement = document.querySelector("#editRout");
  const name = inputElement.value;

  try {

    if (!id) {
      throw new Error('Немає ідентифікатора.');
    }

    if (!name) {
      throw new Error('Немає імені.');
    }

    const res = await api("rout", "PUT", {id, name});

    if (res.status) {
      alert("");
      return res.data;
    }

    throw new Error(res.error);

  } catch (e) {
    console.log(e);
    alert(e.message);
  }
}

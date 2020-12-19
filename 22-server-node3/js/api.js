async function api(url, method, data) {

  try {
    const response = await fetch(`/api/${url}`, {
      method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    const resultData = await response.json(); // parse
    return {
      status: true,
      data: resultData,
    }
  } catch (e) {
    return {
      status: false,
      error: e.message,
    }
  }
}
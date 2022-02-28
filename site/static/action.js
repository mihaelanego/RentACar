function doAction(url, method, redirect) {
  fetch(url, { method }).then(() => {
    if (redirect) {
      window.location.href = redirect;
    }
  });
}

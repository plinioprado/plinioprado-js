
window.addEventListener("click", (e) => {
  if (e.target.nodeName == 'A') {
      let realLink = e.target.href;
      pgName = getPgName(realLink);
      if (pgName !== undefined) {
        e.preventDefault();
      } else {
        pgName = 'home';
      }
      loadPage(pgName);
  }
});

window.onload = (e) => {
  let realLink = window.location.href;
  pgName = getPgName(realLink);
  if (pgName === undefined) pgName = 'home';
  loadPage(pgName);
}

loadPage = (pgName) => {
  let url = window.location.origin + '/content/' + pgName + '.html';
  let link = window.location.origin;
  console.log('url ' + url);
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.text();
    })
    .then ((text) => {
      document.getElementById("content").innerHTML = text || '';
      if (pgName !== 'home') link = link + '/#/' + pgName;
      updateActiveLink(pgName);
      history.pushState(0, 0, link);
    })
    .catch((error) => console.log('error=', error))
}

function getPgName (realLink) {
  let pageStart = realLink.indexOf('/#/');
  if ( pageStart != -1) {
    let pageName = realLink.substring(pageStart + 3, realLink.lenght);
    return pageName;
  } else{
    return undefined;
  }
}

function updateActiveLink (pgName) {
  const items = document.getElementsByClassName('nav-link');
  Object.keys(items).forEach(key => {
    const link = items[key].href;
    const start = link.indexOf('/#/') + 3;
    if (link.substring(start, link.lenght) === pgName) {
      items[key].classList.add('active');
    } else {
      items[key].classList.remove('active');
    }
  });

}
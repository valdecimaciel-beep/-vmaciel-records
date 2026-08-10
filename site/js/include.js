const BASE = "/-vmaciel-records/site";
fetch(`${BASE}/partials/header.html`)
  .then(r => r.text())
  .then(h => { document.getElementById("header").innerHTML = h; });
fetch(`${BASE}/partials/footer.html`)
  .then(r => r.text())
  .then(f => { document.getElementById("footer").innerHTML = f; });

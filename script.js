var res = fetch("https://restcountries.com/v3.1/all")
res.then((data) => {
  return data.json()

}).then((data1) => foo(data1)).catch((error) => console.log(error));


var container = document.createElement("div");
container.className = "container";

var row = document.createElement("div");
row.className = "row";

function foo(data1) {

  for (var i = 0; i < data1.length; i++) {
    var x = data1[i];
    var col = document.createElement("div");
    col.className = "col-lg-4";
    col.innerHTML = `<div class="card text-white bg-dark mb-3" style="width:auto; height:350px ">
    <div class="card-header">${x.name.common}</div>
    <div class="card-body">
    
          <img src="${x.flags.png}">
          <p>Capital: ${x.capital}</p>
          <p>Region: ${x.region}</p>
          <p>Country-Code: ${x.cca3}</p>
          </div>
          </div>
        </div>
      </div>`;
    row.append(col);
  }
  container.append(row);
  document.body.append(container);
  console.log(data1)

}

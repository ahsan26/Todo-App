(() => {
	todos = [],
		done = [];
	if (localStorage.getItem("uncomplete")) {
		todos = localStorage.getItem("uncomplete").split(",");
		contentAdder("uncomplete", todos, "You have nothing to-do!");
	} else {
		todos = [];
		contentAdder("uncomplete", todos, "You have nothing to-do!");
	}
	if (localStorage.getItem("complete")) {
		done = localStorage.getItem("complete").split(",");
		contentAdder("complete", done, "You have yet to complete any tasks")
	} else {
		done = [];
		contentAdder("complete", done, "You have yet to complete any tasks")
	}
})();
var saveToLocal = (key, array) => {
	localStorage.setItem(key, array);
}

function contentAdder(eid, array, eText) {
	if (array.length) {
		if (eid == "uncomplete") {
			document.querySelector(`#${eid}`).innerHTML = "<table class='table' id='" + eid + "_table'></table>"
			array.forEach(function (element, index) {
				document.querySelector("#" + eid + `_table`).innerHTML += `<tr><td class='col-md-10'>` + element + `</td><td class='col-md-1' onclick='removeItem(todos,` + index + `,"uncomplete")'><span class='glyphicon glyphicon-trash'></span></td><td class='col-md-1' id='` + eid + `_status_` + index + `' onclick='positionSHifter(todos,done,` + index + `)'><span class='glyphicon glyphicon-ok-circle'></span></td></tr>`;
			});
		} else {
			document.querySelector(`#${eid}`).innerHTML = `<table class='table' id='` + eid + `_table'></table>`
			array.forEach(function (element, index) {
				document.querySelector(`#` + eid + `_table`).innerHTML += `<tr><td class='col-md-10'>` + element + `</td><td class='col-md-1' onclick='removeItem(done,` + index + `,"complete")'><span class='glyphicon glyphicon-trash'></span></td><td class='col-md-1' id='` + eid + `_stauts_` + index + `' onclick='positionSHifter(done,todos,` + index + `)'><span class='glyphicon glyphicon-ok-circle'></span></td></tr>`;
			});
		}
	} else {
		document.querySelector(`#${eid}`).innerHTML = `<p>` + eText + `</p>`
	}
}
var removeItem = (array, index, key) => {
	array.splice(index, 1);
	saveToLocal(key, array);
	contentAdder("uncomplete", todos, "You have nothing to-do!");
	contentAdder("complete", done, "You have yet to complete any tasks");
}
var addItem = () => {
	if (document.querySelector("#item").value) {
		todos.push(document.querySelector("#item").value);
		saveToLocal("uncomplete", todos);
		contentAdder("uncomplete", todos, "You have nothing to-do!");
		document.querySelector("#item").form.reset();
	}
}
var positionSHifter = (arr1un, arr2do, index) => {
	arr2do.push(arr1un.splice(index, 1));
	saveToLocal("uncomplete", todos);
	saveToLocal("complete", done);
	contentAdder("uncomplete", todos, "You have nothing to-do!");
	contentAdder("complete", done, "You have yet to complete any tasks");
}
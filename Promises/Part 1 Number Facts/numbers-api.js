const url = "http://numbersapi.com";
const fav_num = 3;

const res = axios.get(`${url}/${fav_num}?json`).then(data => {
	console.log(data)
});

const fav_nums = [3, 7, 21];
const new_res = axios.get(`${url}/${fav_nums}?json`).then(data => {
  console.log(data);
});

const area = document.querySelector(".data");

Promise.all(
  Array.from({ length: 4 }, () => {
    return axios.get(`${url}/${fav_num}?json`);
  })
).then(facts => {
  for (var i = 0; i < facts.length; i++) {
  	const list_facts = document.createElement("p");
  	list_facts.textContent = facts[i].data.text;
  	area.append(list_facts);
  }
});


const mainurl = "https://codeforces.com/api/contest.list?";
const contesturl = "https://codeforces.com/contest/";
const maincontainer = document.querySelector("#main");
const up = document.querySelector("#u");

function makecontest(data, i) {
  const dmain = document.createElement('div');
  const d1 = document.createElement('div');
  const d2 = document.createElement('div');
  const d3 = document.createElement('div');
  const d4 = document.createElement('div');
  const d5 = document.createElement('div');
  

  dmain.classList = "contests";
  d1.classList = "content";
  d2.classList = "content";
  d3.classList = "content";
  d4.classList = "content";
  d5.classList = "content";

  const u = contesturl + data[i].id;
  d1.innerHTML = "Name: " + `<a href="${u}" target="_blank">${data[i].name}</a>`;

  d2.innerHTML = "Type: " + data[i].type;

  let tmp = data[i].durationSeconds;
  let hr = Math.floor(tmp / 3600);
  let mn = Math.floor((tmp - (hr) * 3600) / 60);
  let day = Math.floor(hr / 24);
  hr -= day * 24;
  d3.innerHTML = "Duration: ";
  if (day)
    d3.innerHTML += day + "day ";
  d3.innerHTML += hr + "hr " + mn + "min ";


  tmp = data[i].startTimeSeconds;
  tmp = new Date(tmp * 1000);
  tmp = tmp.toString();
  tmp = tmp.substr(0, 25);
  d4.innerHTML = "Start Time: " + tmp;


  var countDownDate = 1000*(data[i].startTimeSeconds);
  // console.log(countDownDate);
  // Update the count down every 1 second
  var x = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();
    // console.log(now);
    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    d5.innerHTML = "Before Start: ";
    if(days>0)
      d5.innerHTML+=days+"d ";
    d5.innerHTML+= hours + "h "+ minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      d5.style.display = 'none';
    }
  }, 1000);

  dmain.appendChild(d1);
  dmain.appendChild(d2);
  dmain.appendChild(d3);
  dmain.appendChild(d4);
  dmain.appendChild(d5);
  maincontainer.appendChild(dmain);
}
function displaycontest(data) {
  data = data.result;
  const len = data.length;
  console.log(len);
  console.log(data);
  let f1 = 0, f2 = 0;
  for (let i = 0; i < len; i++) {
    
    while (data[i].phase == "BEFORE") {
      f1 = 1;
      
      i++;
    }
    if (data[i].phase == "FINISHED" && f2 == 0) {
      let ind = i;
      if (f1 == 1) {
        up.style.display = "block";
        i--;
        while (i >= 0) {
          makecontest(data, i);
          i--;
        }
        i = ind;
      }
      const dd = document.createElement('div');
      dd.classList = "title";
      dd.innerHTML = "Past Contests";
      maincontainer.appendChild(dd);
      f2 = 1;
    }
    makecontest(data, i);
  }
}

function searchcontests() {
  fetch(mainurl)
    .then(res => res.json())
    .then(displaycontest);
}

searchcontests();
const tog = document.getElementById('toggle-bar');
const navlinks = document.getElementById('nav-links');

tog.addEventListener('click', () => {
  navlinks.classList.toggle('active');
});

let currentdate = new Date();
console.log(currentdate.getHours);





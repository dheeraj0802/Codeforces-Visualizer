const buttonelement = document.querySelector('#search');
const inputelement = document.querySelector('#inputvalue');
const mainurl = 'https://codeforces.com/api/user.rating?handle=';

const info1 = document.querySelector('#info1');
const info2 = document.querySelector('#info2');
const main = document.querySelector('#main');
const unsol = document.querySelector('#ques');
const unsolmain = document.querySelector('#ques-cont');
const g1 = document.querySelector('#graph');
const chart=document.querySelector('#myChart');
let protypes = {};
let solved = 0;
let unsolved = 0;
function searchinfo(value) {
    const url = 'https://codeforces.com/api/user.info?handles=' + value;
    fetch(url)
        .then(res => res.json())
        .then(renderinfo);
}

function renderinfo(data) {
    let ans = data.result;
    console.log(data);
    ans = ans[0];
    console.log(ans);


    const dd1 = document.createElement('div');
    dd1.classList = 'title';
    dd1.innerHTML = 'Profile';
    info1.appendChild(dd1);

    const dd2 = document.createElement('hr');
    info1.appendChild(dd2);

    const d1 = document.createElement('div');
    d1.classList = 'details';
    d1.innerHTML = 'Handle: ' + ans.handle;
    info1.appendChild(d1);

    const d2 = document.createElement('div');
    d2.classList = 'details';
    d2.innerHTML = 'Name: ';
    const t1 = ans.firstName;
    const t2 = ans.lastName;

    d2.innerHTML += t1;
    if (t2 != undefined)
        d2.innerHTML += ' ' + t2;
    info1.appendChild(d2);

    const d3 = document.createElement('div');
    d3.classList = 'details';
    d3.innerHTML = 'Rating: ' + ans.rating;
    info1.appendChild(d3);

    const d4 = document.createElement('div');
    d4.classList = 'details';
    d4.innerHTML = 'Max Rating: ' + ans.maxRating;
    info1.appendChild(d4);

    const d5 = document.createElement('div');
    d5.classList = 'details';
    d5.innerHTML = 'Position: ' + ans.rank;
    info1.appendChild(d5);

    const d6 = document.createElement('div');
    d6.classList = 'details';
    d6.innerHTML = 'Max Position: ' + ans.maxRank;
    info1.appendChild(d6);

    const d7 = document.createElement('div');
    d7.classList = 'details';
    d7.innerHTML = 'Total Friends: ' + ans.friendOfCount;
    info1.appendChild(d7);
}


function searchdetails2(value) {
    const url = 'https://codeforces.com/api/user.rating?handle=' + value;
    fetch(url)
        .then(res => res.json())
        .then(renderdetails2);
}

function renderdetails2(data) {
    
    const dd1 = document.createElement('div');
    dd1.classList = 'title';
    dd1.innerHTML = 'Contest Details';
    info2.appendChild(dd1);

    const dd2 = document.createElement('hr');
    info2.appendChild(dd2);

    data = data.result;
    let up = 0, down = 0;
    let worst = -1, best = 1000000000;
    for (let i = 0; i < data.length; i++) {
        let t = data[i].rank;
        if (t > worst)
            worst = t;
        if (t < best)
            best = t;
        let tp = data[i].newRating - data[i].oldRating;
        if (tp > up)
            up = tp;
        if (tp < down)
            down = tp;
    }
    if (worst == -1)
        worst = undefined;
    if (best == 1000000000)
        best = undefined;
    const d3 = document.createElement('div');
    d3.classList = 'details';
    d3.innerHTML = 'Best Rank: ' + best;
    info2.appendChild(d3);

    const d4 = document.createElement('div');
    d4.classList = 'details';
    d4.innerHTML = 'Worst Rank: ' + worst;
    info2.appendChild(d4);

    const d5 = document.createElement('div');
    d5.classList = 'details';
    d5.innerHTML = 'No. Of Contests: ' + data.length;
    info2.appendChild(d5);

    const d6 = document.createElement('div');
    d6.classList = 'details';
    d6.innerHTML = 'Max Up: ' + up;
    info2.appendChild(d6);

    const d7 = document.createElement('div');
    d7.classList = 'details';
    d7.innerHTML = 'Max Down: ' + down;
    info2.appendChild(d7);

    main.style.display = 'block';
}


function searchstatus(value) {
    const url = 'https://codeforces.com/api/user.status?handle=' + value;
    fetch(url)
        .then(res => res.json())
        .then(renderdetails3);
}

function renderdetails3(data) {
    let arr = {};
    data = data.result;
    let len = data.length;


    for (let i = 0; i < len; i++) {
        let id = "" + data[i].contestId + "-" + data[i].problem.index;
        let verdict = data[i].verdict;
        
        if (verdict == "OK") {
            if (arr[`${id}`] == undefined || arr[`${id}`] == "0") {
                solved++;
                arr[`${id}`] = "1";
                
            }
        }
        else if (arr[`${id}`] == undefined) {
            arr[`${id}`] = "0";
            
        }
    }

    for (var prop in arr) {
        let idd = "", no = "", f = 0;
        console.log(prop)
        for (let i = 0; i < prop.length; i++) {
            if (f == 1)
                no += prop[i];
            if (prop[i] == '-')
                f = 1;
            if (f == 0)
                idd += prop[i];
        }
        if (arr[prop] == "0") {
            let tmpurl = 'https://codeforces.com/contest/' + idd + '/problem/' + no;
            unsol.innerHTML += `<div><a href=${tmpurl} target='_blank'>${prop}</a>&nbsp&nbsp&nbsp</div>`
            unsolved++;
        }
        else {
            no = no[0];
            if (protypes[`${no}`] == undefined)
                protypes[`${no}`] = 1;
            else
                protypes[`${no}`] += 1;
        }
    }
    console.log(protypes);
    unsolmain.style.display = 'block';
    const d1 = document.createElement('div');
    d1.classList = 'details';
    d1.innerHTML = 'Solved Problems ' + solved;
    info2.appendChild(d1);

    const d2 = document.createElement('div');
    d2.classList = 'details';
    d2.innerHTML = 'Unsolved Problems: ' + unsolved;
    info2.appendChild(d2);
    makegraph();
    g1.style.display = 'block';

}

buttonelement.onclick = function (event) {
    event.preventDefault();
    main.style.display = 'none';
    const value = inputelement.value;
    info1.innerHTML = "";
    info2.innerHTML = "";
    unsol.innerHTML="";
    g1.innerHTML="";
    protypes = {};
    solved = 0;
    unsolved = 0;
    if (value != "") {
        searchdetails2(value);
        searchstatus(value);
        searchinfo(value);
    }
    inputelement.value = "";
}


const tog = document.getElementById('toggle-bar');
const navlinks = document.getElementById('nav-links');

tog.addEventListener('click', () => {
    navlinks.classList.toggle('active');
})




function makegraph(){
    // graph part
    g1.innerHTML=`<canvas id="myChart"></canvas>`;
    Chart.defaults.global.defaultFontFamily='"Itim", cursive';
    Chart.defaults.global.defaultFontSize=18;
    Chart.defaults.global.defaultFontColor='white';
    
    datax = ['1', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'K', 'N'];
    datay = [];
    for (let i = 0; i < datax.length; i++) {
        if (protypes[`${datax[i]}`] == undefined)
            datay[i] = 0;
        else
            datay[i] = protypes[`${datax[i]}`];
    }
    console.log(datay);
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: datax,
            datasets: [{
                data: datay,
                backgroundColor: 'rgb(0, 89, 255)',
                borderColor: 'black',
                borderWidth: 1.5,
                hoverBorderWidth:2,
                hoverbackgroundColor:'rgb(0,150,300)'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend:{
                display:false
            },
            title:{
                display:true,
                text:'Number of solved problems',
                fontColor:'rgb(0, 89, 255)'
            }
        }
    });
 
}

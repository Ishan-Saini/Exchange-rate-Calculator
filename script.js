const elements = {
  container: document.querySelector('.app-container'),
  currency1: document.querySelector('.list1'),
  currency2: document.querySelector('.list2'),
  input1: document.querySelector('.num-input1'),
  input2: document.querySelector('.num-input2'),
  curText1: document.getElementById('curOne'),
  curText2: document.getElementById('curSecond'),
  rateText: document.getElementById('curRate'),
  swapBtn: document.querySelector('.btn-swap'),
};

let cur1 = elements.currency1.value;
let cur2 = elements.currency2.value;

const fetchData = async (query1, query2) => {
  const key = 'df55cefd08b202925af8d0c8';
  const apiData = await fetch(
    `https://v6.exchangerate-api.com/v6/${key}/latest/${query1}`
  );
  const apiJSON = await apiData.json();
  return apiJSON.conversion_rates[query2];
};

elements.container.addEventListener('change', (e) => {
  if (e.target.classList.contains('list1')) {
    cur1 = e.target.value;
    fetchData(cur1, cur2).then((el) => {
      displayRate(cur1, cur2);
      showRate(el);
    });
  }

  if (e.target.classList.contains('list2')) {
    cur2 = e.target.value;
    fetchData(cur1, cur2).then((el) => {
      displayRate(cur1, cur2);
      showRate(el);
    });
  }

  if (e.target.classList.contains('num-input1')) {
    fetchData(cur1, cur2).then((el) => {
      displayRate(cur1, cur2);
      showRate(el);
    });
  }
});

elements.swapBtn.addEventListener('click', () => {
  cur1 = elements.currency2.value;
  cur2 = elements.currency1.value;
  elements.currency2.value = elements.currency1.value;
  elements.currency1.value = cur1;
  fetchData(cur1, cur2).then((el) => {
    displayRate(cur1, cur2);
    showRate(el);
  });
});

const showRate = (el2) => {
  elements.rateText.textContent = el2;
  if (elements.input1.value >= 0) {
    const val = elements.input1.value * el2;
    elements.input2.value = Math.round(val * 100) / 100;
  }
};

const displayRate = (e1, e2) => {
  elements.curText1.textContent = e1;
  elements.curText2.textContent = e2;
};

fetchData(cur1, cur2).then((el) => {
  displayRate(cur1, cur2);
  showRate(el);
});

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
};
const account5 = {
  owner: 'Kartik B H',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 5555,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
};
const accounts = [account1, account2, account3, account4, account5];
accounts.forEach(function (account) {
  account.movements = account.movements.map((Element, index) => {
    return [
      Element,
      `${Element > 0 ? 'credit' : 'debit'}`,
      '',
      getFormatDate(account.movementsDates[index]),
    ];
  });
});
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//////////////////////////////////////////////////////////////////////////////////////////////////
labelDate.textContent = new Date().toLocaleString()
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(([Element, movementType, person, date], index) => {
    const movementEntry = `
    <div class="movements__row">
      <div class="movement_no">${index + 1}</div>
      <div class="movements__type movements__type--${movementType}">${movementType.toUpperCase()}</div>
      ${person ? `<div class="person">${person}</div>` : ''}
      <div class='movements__date'>${date}</div>
      <div class="movements__value">${Element.toFixed(2)}₹</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', movementEntry);
  });
};

accounts.forEach(account => {
  account.userName = account.owner
    .toLowerCase()
    .split(' ')
    .map(Element => Element[0])
    .join('');
});

const calcPrintBalance = function (acc) {
  const balance = acc.movements
    .map(Element => Element[0])
    .reduce(function (bal, movement) {
      return (bal += movement);
    });
  acc.balance = balance;
  labelBalance.textContent = balance.toFixed(2) + ' ₹';
};

const calcDisplaySummary = function (acc) {
  labelSumIn.textContent =
    acc.movements
      .map(Element => Element[0])
      .filter(Element => Element > 0)
      .reduce((acc, cur) => acc + cur)
      .toFixed(2) + ' ₹';
  labelSumOut.textContent =
    Math.abs(
      acc.movements
        .map(Element => Element[0])
        .filter(Element => Element < 0)
        .join(' ')
        ?.split(' ')
        .reduce((acc, cur) => Number(acc) + Number(cur))
    ).toFixed(2) + ' ₹';
  labelSumInterest.textContent =
    acc.movements
      .map(Element => Element[0])
      .filter(Element => Element > 0)
      .map(Element => (Element * acc.interestRate) / 100)
      .filter((int, i, arr) => int >= 1)
      .reduce((acc, int) => acc + int, 0)
      .toFixed(2) + ' ₹';
};
const displayUserOptions = function (user) {
  const users = accounts
    .filter(Element => Element.owner !== user.owner)
    .map(Element => `<option>${Element.owner}</option>`)
    .join(' ');
  inputTransferTo.innerHTML = '<Option selected>Select user</Option>' + users;
};
function getFormatDate(timeObj) {
  if (arguments.length === 0) {
    const dateNow = new Date();
    return `${dateNow.getDate()}/${dateNow.getMonth() + 1
      }/${dateNow.getFullYear()}`;
  }
  const dateNow = new Date(timeObj);
  return `${dateNow.getDate()}/${dateNow.getMonth() + 1
    }/${dateNow.getFullYear()}`;
}

let currentAccount;
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  currentAccount = accounts.find(
    account =>
      account.userName === inputLoginUsername.value &&
      account.pin === Number(inputLoginPin.value)
  );
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
  if (currentAccount) {
    containerApp.style.visibility = 'visible';
    labelWelcome.textContent = 'Hello ' + currentAccount.owner.split(' ')[0];
    clearInterval(id);
    startLogOutTimer();
    displayUserOptions(currentAccount);
    displayMovements(currentAccount.movements);
    calcPrintBalance(currentAccount);
    calcDisplaySummary(currentAccount);
  }
});
btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const transferTo = inputTransferTo.value;
  const amount = Number(inputTransferAmount.value);
  if (amount < currentAccount.balance && amount > 0) {
    const receiver = accounts.find(Element => Element.owner === transferTo);
    if (receiver) {
      receiver.movements.push([
        amount,
        'credit',
        'from ' +
        currentAccount.owner
          .split(' ')
          .map(Element => Element[0].toUpperCase())
          .join(''),
        getFormatDate(),
      ]);
      currentAccount.movements.push([
        -amount,
        'debit',
        'to ' +
        receiver.owner
          .split(' ')
          .map(Element => Element[0].toUpperCase())
          .join(''),
        getFormatDate(),
      ]);
      clearInterval(id);
      startLogOutTimer();
      displayUserOptions(currentAccount);
      displayMovements(currentAccount.movements);
      calcPrintBalance(currentAccount);
      calcDisplaySummary(currentAccount);
    }
  }
  else
    alert(`Invalid!`)
  inputTransferAmount.value = ''
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements
      .filter(Element => Element[1] !== 'loan')
      .map(Element => Element[0])
      .some(movement => movement >= amount * 0.1)
  ) {
    currentAccount.movements.push([amount, 'credit', 'loan', getFormatDate()]);
    setTimeout(function () {
      displayMovements(currentAccount.movements);
      calcPrintBalance(currentAccount);
      calcDisplaySummary(currentAccount);
      clearInterval(id);
      startLogOutTimer();
    }, 1000);
  }
});

btnClose.addEventListener('click', function (event) {
  event.preventDefault();
  if (Number(inputClosePin.value) === currentAccount.pin) {
    const accIndex = accounts.findIndex(
      Element => Element.pin === currentAccount.pin
    );
    accounts.splice(accIndex, 1);
    containerApp.style.visibility = 'hidden';
  }
});
let sortedState = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  if (sortedState) {
    displayMovements(currentAccount.movements);
    sortedState = false;
  } else {
    displayMovements(
      currentAccount.movements.slice().sort((a, b) => a[0] - b[0])
    );
    sortedState = true;
  }
});
let id;
const startLogOutTimer = function () {
  let fiveMin = 60000 * 5;
  setTimeout(function () {
    clearInterval(id);
    containerApp.style.visibility = 'hidden';
  }, fiveMin + 1000);
  id = setInterval(function () {
    fiveMin = fiveMin - 1000;
    const now = new Date(fiveMin);
    labelTimer.textContent = `${`${now.getMinutes() - 30}`.padStart(
      2,
      '0'
    )}:${`${now.getSeconds()}`.padStart(2, '0')}`;
  }, 1000);
};

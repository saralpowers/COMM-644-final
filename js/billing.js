// id handler
const $ = (id) => {
    return document.getElementById(id);
  };
  
  const processEntries = () => {
    // define generic variables and regular expressions
    let required = 'This field is required!';
    let invalid = 'Invalid entry!';
    let namereg = /^[a-z\s]*$/gi;  
    let statereg = /^[A-Z]{2}$/gi;
    let zipreg = /^\d{5}$/;
    let cvcreg = /^\d{3}$/;
    let cardnumreg = /^[\d\s-]+$/;
  
    // collect vaules from form elements
    let fullName = $('fullname').value;
    let address = $('address').value;
    let city = $('city').value;
    let state = $('state').value;
    let zip = $('zip').value;
    let cvccode = $('cvccode').value;
    let cardnum = $('cardnum').value;
    let month = parseInt($('monthId').value);
    let year = parseInt($('yearId').value);
    let thisYear = new Date().getFullYear();
    let thisMonth = new Date().getMonth() + 1;
    
    //console.log(year === thisYear && month < thisMonth);

    // check for empty or invalid values
    if (fullName === '') {
      $('namevalid').innerHTML = required;
      $('fullname').className = "error";
    } else if (namereg.test(fullName) === false) {
      $('namevalid').innerHTML = invalid;
      $('fullname').className = "error";
    } else {
      $('namevalid').innerHTML = "";
      $('fullname').className = "";
    };
  
    if (address === '') {
      $('addressvalid').innerHTML = required;
      $('address').className = "error";
    } else {
      $('addressvalid').innerHTML = "";
      $('address').className = "";
    };
  
    if (city === '') {
      $('cityvalid').innerHTML = required;
      $('city').className = "error";
    } else {
      $('cityvalid').innerHTML = "";
      $('city').className = "";
    };
  
    if (state === '') {
      $('statevalid').innerHTML = required;
      $('state').className = "error";
    } else if (statereg.test(state) === false) {
      $('statevalid').innerHTML = invalid;
      $('state').className = "error";
    } else {
      $('statevalid').innerHTML = "";
      $('state').className = "";
    };
  
    if (zip === '') {
      $('zipvalid').innerHTML = required;
      $('zip').className = "error";
    } else if (zipreg.test(zip) === false) {
      $('zipvalid').innerHTML = invalid;
      $('zip').className = "error";
    } else {
      $('zipvalid').innerHTML = "";
      $('zip').className = "";
    };




    if (cardnum === '') {
      $('cardnumvalid').innerHTML = required;
      $('cardnum').className = "error";
    } else if (cardnumreg.test(cardnum) === false) {
      $('cardnumvalid').innerHTML = invalid;
      $('cardnum').className = "error";
    } else {
      $('cardnumvalid').innerHTML = (`${cardType(cardnum)}`);
      $('cardnum').className = "";
    };








    if (cvccode === '') {
      $('cvcvalid').innerHTML = required;
      $('cvccode').className = "error";
    } else if (cvcreg.test(cvccode) === false) {
      $('cvcvalid').innerHTML = invalid;
      $('cvccode').className = "error";
    } else {
      $('cvcvalid').innerHTML = "";
      $('cvccode').className = "";
    };

    if (year === thisYear && month < thisMonth) {
      $('datevalid').innerHTML = "Invalid expiration date";
      $('yearId').className = "error";
      $('monthId').className = "error";
    } else {
      $('datevalid').innerHTML = "";
      $('yearId').className = "";
      $('monthId').className = "";
    };

  };
  
  window.addEventListener('load', () => {  
    expiration();
    $('billingform').addEventListener('submit', (e) => {
      e.preventDefault();
      processEntries();
    })
  });

  function autoFill() {
    if ($('same').checked) {
      //console.log('check again')
      $("fullname").value = window.opener.document.getElementById("fullname").value;
      $("address").value = window.opener.document.getElementById("address").value;
      $("optnum").value = window.opener.document.getElementById("optnum").value;
      $("city").value = window.opener.document.getElementById("city").value;
      $("state").value = window.opener.document.getElementById("state").value;
      $("zip").value = window.opener.document.getElementById("zip").value;
    } else {
      $("fullname").value = "";
      $("address").value = "";
      $("optnum").value = "";
      $("city").value = "";
      $("state").value = "";
      $("zip").value = "";
    }
};

function cardType(cardnum) {
    cardnum = cardnum.replace(/\D/g, "");
    if (cardnum.charAt(0) === "4" && (cardnum.length === 13 || cardnum.length === 16)) {
        if (luhn(cardnum) === true) {
            message = "This is a Visa card.";
        } else {
            message = "This is not a valid card.";
        };
    } else if (cardnum.charAt(0) === "5" && cardnum.length === 16) {
        if (cardnum.charAt(1) === "1" || cardnum.charAt(1) === "2" || cardnum.charAt(1) === "3" || cardnum.charAt(1) === "4" || cardnum.charAt(1) === "5") {
            if (luhn(cardnum) === true) {
                message = "This is a MasterCard.";
            } else {
                message = "This is not a valid card.";
            };
        } else {
            message = "This is not a valid card.";
        };
    } else if (cardnum.charAt(0) === "3" && cardnum.charAt(1) === "7" && cardnum.length === 15) {
        if (luhn(cardnum) === true) {
            message = "This is an American Express card.";
        } else {
            message = "This is not a valid card.";
        };
    };
    return message;
}

function luhn(cardnum) {
    let sum1 = 0, sum2 = 0;
    //console.log(cardnum);
	for (let i = 0; i < cardnum.length; i+=2) {
        mult = cardnum[i] * 2
        if (mult >= 10) {
            mult -= 9;
        }
		sum1 = mult + sum1;
        console.log(mult);
	};

    for (let i = 1; i < cardnum.length; i+=2) {
        //console.log(`sum2 before addition ${sum2}`);
        console.log(cardnum[i]);
		sum2 = parseInt(cardnum[i]) + sum2;
        //console.log(sum2);
	};
    total = sum1 + sum2;
    console.log(`the total is ${total}`);
    console.log(`${(total % 10) == 0}`);
    return (total % 10) == 0;
}

function expiration() {
    let monthId = $('monthId');
    let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    for (let i = 0; i < months.length; i++) {
      let month = months[i];
      let monthElement = document.createElement("option");
      monthElement.textContent = month;
      monthElement.value = month;
      monthId.appendChild(monthElement);
    };
    let yearId = $('yearId');
    let thisYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      let year = thisYear + i;
      let yearElement = document.createElement("option");
      yearElement.textContent = year;
      yearElement.value = year;
      yearId.appendChild(yearElement);
    };
};
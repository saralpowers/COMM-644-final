// id handler
const $ = (id) => {
  return document.getElementById(id);
};

const processEntries = () => {
  // define generic variables
  let required = 'This field is required!';
  let invalid = 'Invalid entry!';
  let namereg = /^[a-z\s]*$/gi;  
  let statereg = /^[A-Z]{2}$/gi;
  let zipreg = /^\d{5}$/;
  let phonereg = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  let emailreg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let validation = 0;
  //console.log(`initial ${validation}`);

  // collect vaules from form elements
  let fullName = $('fullname').value;
  let addressType = $('addresstype').value;
  let other = $('other').value;
  let address = $('address').value;
  //let optNum = $('optnum').value;
  let city = $('city').value;
  let state = $('state').value;
  let zip = $('zip').value;
  let phone = $('phone').value;
  let email = $('email').value;

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
    validation += 1;
    //console.log(`name ${validation}`);
  }

  if (addressType === 'default') {
    $('typevalid').innerHTML = required;
    $('addresstype').className = "error";
  } else {
    $('typevalid').innerHTML = "";
    $('addresstype').className = "";
    validation += 1;
    //console.log(`address type ${validation}`);
  }

  if (addressType === 'other' && other === "") {
    $('othervalid').innerHTML = required;
    $('other').className = "error";
  } else if (addressType === 'other' && other !== "") {
    $('othervalid').innerHTML = "";
    $('other').className = "";
    validation += 1;
    //console.log(`other ${validation}`);
  }

  if (address === '') {
    $('addressvalid').innerHTML = required;
    $('address').className = "error";
  } else {
    $('addressvalid').innerHTML = "";
    $('address').className = "";
    validation += 1;
    //console.log(`address ${validation}`);
  }

  if (city === '') {
    $('cityvalid').innerHTML = required;
    $('city').className = "error";
  } else {
    $('cityvalid').innerHTML = "";
    $('city').className = "";
    validation += 1;
    //console.log(`city ${validation}`);
  }

  if (state === '') {
    $('statevalid').innerHTML = required;
    $('state').className = "error";
  } else if (statereg.test(state) === false) {
    $('statevalid').innerHTML = invalid;
    $('state').className = "error";
  } else {
    $('statevalid').innerHTML = "";
    $('state').className = "";
    validation += 1;
    //console.log(`state ${validation}`);
  }

  if (zip === '') {
    $('zipvalid').innerHTML = required;
    $('zip').className = "error";
  } else if (zipreg.test(zip) === false) {
    $('zipvalid').innerHTML = invalid;
    $('zip').className = "error";
  } else {
    $('zipvalid').innerHTML = "";
    $('zip').className = "";
    validation += 1;
    //console.log(`zip ${validation}`);
  }

  if (phone === '') {
    $('phonevalid').innerHTML = required;
    $('phone').className = "error";
  } else if (phonereg.test(phone) === false) {
    $('phonevalid').innerHTML = invalid;
    $('phone').className = "error";
  } else {
    $('phonevalid').innerHTML = "";
    $('phone').className = "";
    validation += 1;
    //console.log(`phone ${validation}`);
  }

  if (email === '') {
    $('emailvalid').innerHTML = required;
    $('email').className = "error";
  } else if (emailreg.test(email) === false) {
    $('emailvalid').innerHTML = invalid;
    $('email').className = "error";
  } else {
    $('emailvalid').innerHTML = "";
    $('email').className = "";
    validation += 1;
    //console.log(`email ${validation}`);
  }

  if ((validation >= 8 && addressType !== 'select' && addressType !== 'other') || (validation >= 9 && addressType === 'other')) {
    //console.log(validation);
    let radios = document.getElementsByName('dough');
    for (let i = 0; i < radios.length;  i++) {
      radios[i].disabled = false;
    };
  };
};

function OtherOption(val) {
  let element=$('other');
  if (val=='other') {
    element.style.display='block';
  } else {
    element.style.display='none';
  };
};

const resetForm = () => {
  $('locationform').reset();
  $('fullname').focus();
  let radios = document.getElementsByName('dough');
  for (let i = 0; i < radios.length;  i++) {
    radios[i].disabled = true;
  }
  validation = 0;
  $('namevalid').innerHTML = "";
  $('fullname').className = "";
  $('typevalid').innerHTML = "";
  $('addresstype').className = "";
  $('othervalid').innerHTML = "";
  $('other').className = "";
  $('addressvalid').innerHTML = "";
  $('address').className = "";
  $('cityvalid').innerHTML = "";
  $('city').className = "";
  $('statevalid').innerHTML = "";
  $('state').className = "";
  $('zipvalid').innerHTML = "";
  $('zip').className = "";
  $('phonevalid').innerHTML = "";
  $('phone').className = "";
  $('emailvalid').innerHTML = "";
  $('email').className = "";
}

window.addEventListener('load', () => {
  $('coupon').addEventListener('click', couponCode);
  $('continue').addEventListener('click', processEntries);
  $('clear').addEventListener('click', resetForm);
  $('size').addEventListener('change', unlock);
  $('orderform').addEventListener('change', totalPrice);
  $('finished').addEventListener('click', billing);
  //$('fullname').focus();
  $("price").style.visibility='hidden'
  let radios = document.getElementsByName('dough');
  //console.log(radios);
  for (let i = 0; i < radios.length;  i++) {
    radios[i].disabled = true;
  };
  $('size').disabled=true;
  $('cheese').disabled=true;
  $('sauce').disabled=true;
  $('toppings').disabled=true;
  $('finished').disabled=true;
});

function couponCode() {
    window.open('coupon.html','coupon','width=400,height=200');
}

let doughType = {
  handTossed: ["Select", "Small ($9.99)", "Medium ($12.99)", "Large ($14.99)"],
  thinCrust: ["Select", "Medium ($11.99)", "Large ($13.99)"],
  newYorkStyle: ["Select", "Large ($16.99)", "Extra Large ($19.99)"],
  glutenFree: ["Select", "Small ($10.99)"]
};

function changeDough(value) {
  let totalPrice = 0;
  $('size').disabled=false;
  //console.log($("size").value.length);
  //console.log($("size").value);
  let sizeOptions = "";
  for (dough in doughType[value]) {
    sizeOptions += "<option>" + doughType[value][dough] + "</option>";
  };
  $("size").innerHTML = sizeOptions;
};

function unlock() {
  if ($('size').value !== "Select") {
    $('cheese').disabled=false;
    $('sauce').disabled=false;
    $('toppings').disabled=false;
    $('finished').disabled=false;
  }  
}

function enable() {
  sizePrice = 0;
  $("price").style.visibility='visible'
  let size = $("size");
  sizePrice = size.options[size.selectedIndex].text;
  sizePrice = sizePrice.replace(/^\D+|\D+$/g, "");
  sizePrice = parseFloat(sizePrice);
  //console.log(`sizeprice ${sizePrice}`);
  return sizePrice;
}

function cheese() {
  let cheesePrice = 0;
  let cheese = $("cheese");
  let cheeseAddon = cheese.options[cheese.selectedIndex].text;
  //console.log(`cheeseAddon ${cheeseAddon}`);
  if (cheeseAddon === "Extra: +$2.99") {
    cheesePrice = 2.99;
    //console.log(`cheese cost ${cheeseAddon}`);
  } else if (cheeseAddon === "Double: +$3.99") {
    cheesePrice = 3.99;
  } else {
    cheesePrice = 0;
  }
  return cheesePrice;
};

function sauce() {
  let saucePrice = 0;
  let sauce = $("sauce");
  let sauceAddon = sauce.options[sauce.selectedIndex].text;
  //console.log(`sauceAddon ${sauceAddon}`);
  if (sauceAddon === "Hearty Tomato: +$.99") {
    saucePrice = .99;
    //console.log(`sauce cost ${sauceAddon}`);
  } else if (sauceAddon === "BBQ Sauce: +$1.99") {
    saucePrice = 1.99;
  } else {
    saucePrice = 0;
  }
  return saucePrice;
};

function toppings() {
  let toppings = document.querySelectorAll("input[name='toppings']:checked").length;
  //console.log(toppings);
  let toppingsPrice = toppings * .99;
  return toppingsPrice;
};

function totalPrice(sizePrice, cheesePrice, saucePrice, toppingsPrice) {
  let totalPrice = enable(sizePrice) + cheese(cheesePrice) + sauce(saucePrice) + toppings(toppingsPrice);
  if (isNaN(totalPrice)) totalPrice = 0;
  console.log(`total price is: ${totalPrice}`);
  $("price").innerHTML = "Total Order Cost: $" + totalPrice.toFixed(2);
  return totalPrice;
}

function billing() {
  if (window.confirm(`Select "OK" to continue to billing, select "Cancel" to return to forms.`)) {
      window.open('billinginfo.html','billing','width=800,height=800');
      billing.document.writeln('')
  } else {
    scroll(0,600);
  }
}

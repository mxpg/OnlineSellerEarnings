const addSaleBtn = document.querySelector('.submit__btn')
const productName = document.querySelector('#product__name')
const moneyReceived = document.querySelector('#money__received')
const feesPaid = document.querySelector('#fees')
const shippingCost = document.querySelector('#shipping')
const salesCont = document.querySelector('.sales__container')
const displayProfits = document.querySelector('#profit')

salesArr = []
salesProfits = []

// Event listeners
addSaleBtn.addEventListener('click', addSale)
salesCont.addEventListener('click', expandSale)

function addSale(e){
    e.preventDefault()
    // get input value
    const addSale = productName.value 
    // calculate profit  Note:'+' symbol turns string into a number
    const totalProfit = (+moneyReceived.value) - ((+feesPaid.value) + (+shippingCost.value))
    // if input is not empty
    if(addSale !== ''){
        // create new sale
        newSale = {
            "id": Math.floor((Math.random() * 1000) +1),
            "sale": addSale,
            "received": +moneyReceived.value,
            "fees": +feesPaid.value,
            "shipping": +shippingCost.value,
            "profit": totalProfit
        }
        // add sale to array
        salesArr.push(newSale)
        // add profit to array
        salesProfits.push(totalProfit)
        // clear inputs
        clearInputs()
        // calculate and display profits
        calcProfit()
        // add sale to list
        addSaleList(newSale)
    }
    
}

// calculate total profit and display it
function calcProfit(){
    displayProfits.innerHTML = salesProfits.reduce((total, current) => total + current , 0)
}

// clear inputs
function clearInputs(){
    productName.value = ''
    moneyReceived.value = ''
    feesPaid.value = ''
    shipping.value = ''
}

// add sale to list
function addSaleList(item){
    // create new div
    const div = document.createElement('div')
    // add a class
    div.classList = 'sale'
    // add id
    div.id = item.id
    // add html
    div.innerHTML = `
    <button class="sale__summary">
                    <div class="sale__summary--info">
                        <p class="item__sold">
                            ${item.sale}
                        </p>
                        <span class="profit">
                            ${item.profit}
                        </span>
                    </div>
                    
                    <span class="arrow">
                        <i class="fas fa-angle-down"></i>
                    </span>
                </button>
                <div class="sale__details">
                    <div class="sale__number">
                        <p>
                            Money Received:
                            <span id="money__received">
                                ${item.received}
                            </span>
                        </p>
                    </div>
                    <div class="sale__number">
                        <p>
                            Fees Paid:
                            <span id="fees__paid">
                                ${item.fees}
                            </span>
                        </p>
                    </div>
                    <div class="sale__number">
                        <p>
                            Shipping Cost:
                            <span id="shipping__cost">
                                ${item.shipping}
                            </span>
                        </p>
                    </div>
                </div>
    `
    // display sale
    salesCont.insertAdjacentElement('beforeend', div)
}

// expand sale information
function expandSale(e){
    if(e.target.classList.contains('sale__summary')){
        e.target.classList.toggle('display')

        if(e.target.classList.contains('display') || e.target.classList.contains('sale__details')){
            e.target.nextElementSibling.style.maxHeight = 'none';
            e.target.querySelector('.arrow').innerHTML = '<i class="fas fa-angle-up"></i>'
        } else {
            e.target.nextElementSibling.style.maxHeight = '0'
            e.target.querySelector('.arrow').innerHTML = '<i class="fas fa-angle-down"></i>'
        }
    }
}
"use strict";

const exit = new LogoutButton()
exit.action = () => ( ApiConnector.logout(response => {
    if (response.success){
        location.reload();
    }
}) )

ApiConnector.current( data => {
    if (data.success){
        ProfileWidget.showProfile(data.data)
    }
})

const currency = new RatesBoard()

function stock(){
    ApiConnector.getStocks(response => {
        if (response.success){
            currency.clearTable()
            currency.fillTable(response.data)
        }
    })
};

stock()
let timerId = setInterval( stock(), 60000)

const moneyForm = new MoneyManager()

moneyForm.addMoneyCallback = ({...data}) => {
    ApiConnector.addMoney( { currency: data.currency, amount: data.amount }, (state) => {
        if (state.success){
            ProfileWidget.showProfile(state.data)
            moneyForm.setMessage(state.success, "Success")
        }
        else {
            moneyForm.setMessage(state.success, state.error)
        }
    })
}

moneyForm.conversionMoneyCallback = ({...data}) => {
    ApiConnector.convertMoney({ fromCurrency: data.fromCurrency, targetCurrency: data.targetCurrency, fromAmount: data.fromAmount }, (state) => {
        if (state.success){
            ProfileWidget.showProfile(state.data)
            moneyForm.setMessage(state.success, "Success")
        }
        else {
            moneyForm.setMessage(state.success, state.error)
        }
    })
}

moneyForm.sendMoneyCallback = ({...data}) => {
    ApiConnector.transferMoney({to: data.to, currency: data.currency, amount: data.amount}, (state) => {
        if (state.success){
            ProfileWidget.showProfile(state.data)
            moneyForm.setMessage(state.success, "Success")
        }
        else {
            moneyForm.setMessage(state.success, state.error)
        }
    })
}


const favourit = new FavoritesWidget()
 ApiConnector.getFavorites( (state) => {
    if (state.success){
        favourit.clearTable()
        favourit.fillTable(state.data)
        moneyForm.updateUsersList(state.data)
        }
    }
)

favourit.addUserCallback = ({...data}) => {
    ApiConnector.addUserToFavorites( {id: data.id, name: data.name}, (state) => {
        if (state.success){
            favourit.clearTable()
            favourit.fillTable(state.data)
            moneyForm.updateUsersList(state.data)
            moneyForm.setMessage(state.success, "Success")
        }
        else {
            favourit.setMessage(state.success, state.error)
        }
    })
}

favourit.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites( id, (state) => {
        if (state.success){
            favourit.clearTable()
            favourit.fillTable(state.data)
            moneyForm.updateUsersList(state.data)
            moneyForm.setMessage(state.success, "Success")
        }
        else {
            favourit.setMessage(state.success, state.error)
        }
    })
}

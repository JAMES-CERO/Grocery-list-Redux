// establish DOM elements as variables
const grocerySubmit = document.getElementById('addGrocery')
const list = document.getElementById('list')
const clearBtn = document.getElementById('clear')

//instatiate default state value:
const initialState = {
    groceries: []
}

// establish the reducer. Takes initial state value and an action as arguments.
const groceryReducer = (state = initialState.groceries, action) => {
    switch(action.type) {
        case 'grocery/add':
            return [
                ...state,
                {
                    text: action.text
                }
            ]
        case 'grocery/clear':
            return []
        default:
                return state
    }
}

// establish Store
let store = Redux.createStore(groceryReducer)

const clearList = () => {
    document.getElementById('newItem').value = ''
    store.dispatch({
        type: 'grocery/clear'
    })
    console.log(store.getState())
}

const newGrocery = (e) => {
    e.preventDefault()
    let groceryText = document.getElementById('newItem').value
    store.dispatch({
        type: 'grocery/add',
        text: groceryText
    })
    console.log(store.getState())
}

grocerySubmit.addEventListener('click', (e) => {
    newGrocery(e) 
    document.getElementById('newItem').value = ''
})

clearBtn.addEventListener('click', clearList)

const renderList = (state) => {
    while(list.firstChild) {
        list.removeChild(list.firstChild)
    }
    state.forEach(grocery => {
        //generate a new list element for each property
        let li = document.createElement('li')
        //append to the DOM
        list.appendChild(li)
        //populate the text content of the list item
        li.textContent = grocery.text
    });
}

const render = () => {
    const state = store.getState()
    renderList(state)
}

store.subscribe(render)



// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(response => response.json())
//     .then(posts => console.log(posts))
//     .catch(e => console.log(e))
const debounce = (fn, debounceTime) => {
    let timer
    return function() {
        const fnCall = () => fn.apply(this, arguments)
        clearTimeout(timer)
        timer = setTimeout(fnCall, debounceTime)
    }
};

function createEl(tag, classEl) {
    let element = document.createElement(tag)
    if (classEl) element.classList.add(classEl)
    return element
}

// const wrap = createEl('div', 'wrap')
// document.body.appendChild(wrap)

let search = document.querySelector('.form__search')
let autocomplite = document.querySelector('.autocomplite')
let autocompliteItem = document.querySelector('.autocomplite__item')

search.addEventListener('keyup', debounce(getRepo, 250))

function getRepo(e) {
    if (e.target.value) {
        return fetch(`https://api.github.com/search/repositories?q=${e.target.value}&per_page=5`)
            .then(response => response.json())
            .then(rep => {
                let arr = []
                rep.items.forEach(item => {
                    let { name, stargazers_count, owner: { login } } = item
                    arr.push('<li class="autocomplite__item">' + name + '</li>')
                    // console.log(`name: ${name}, star: ${stargazers_count}, owner: ${login}`);  
                    // console.log(arr);
                    showResultSearch(arr)
                    autocomplite.style.display = 'block'
                })
            })
            .catch(e => console.log(e))
        
    } else {
        search.innerHTML = ''
        autocomplite.style.display = 'none'
    }
    
}


function showResultSearch(list) {
    let listData
    if (!list.length) {
        listData = search.value
    } else {
        listData = list.join('')
    }
    autocomplite.innerHTML = listData
}

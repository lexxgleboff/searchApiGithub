const search = document.querySelector('.form__search')
const autocompliteList = document.querySelector('.autocomplite')
const wrap = document.querySelector('.wrapper')

const debounce = (fn, debounceTime) => {
  let timer
  return function () {
    const fnCall = () => fn.apply(this, arguments)
    clearTimeout(timer)
    timer = setTimeout(fnCall, debounceTime)
  }
}

function createElement(tag, classElement) {
  const element = document.createElement(tag)
  if (classElement) element.classList.add(classElement)
  return element
}

search.addEventListener('input', debounce(getRepository, 500))

function getRepository(e) {
    if (e.target.value) {
        return fetch(
            `https://api.github.com/search/repositories?q=${e.target.value}&per_page=5`
            )
            .then((response) => response.json())
            .then((rep) => {
                autocompliteList.innerHTML = ''
                rep.items.forEach((item) => showResultSearch(item))
                autocompliteList.style.display = 'block'
      })
      .catch((e) => console.log(e))
  } else {
    e.target.value = ''
    autocompliteList.innerHTML = ''
    autocompliteList.style.display = 'none'
  }
}

function showResultSearch(item) {
  const {
    name,
    stargazers_count,
    owner: { login }
  } = item
  const autocompliteItem = createElement('li', 'autocomplite__item')
  autocompliteItem.innerHTML = `${name}`
  const btnRemove = createElement('div', 'btn__remove')
  autocompliteList.appendChild(autocompliteItem)

  autocompliteItem.addEventListener('click', () => {
    const item = createElement('div', 'item')
    item.innerHTML = `<div class="item__info"><span>Name: ${name}</span><span>Owner: ${login}</span><span>Stars: ${stargazers_count}</span></div>`
    item.appendChild(btnRemove)
    wrap.appendChild(item)

    item.addEventListener('click', (e) => {
      if (e.target.matches('.btn__remove')) item.remove()
    })

    search.value = ''
    autocompliteList.innerHTML = ''
  })
}

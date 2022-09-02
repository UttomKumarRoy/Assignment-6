//news menu section 
fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayMenu(data.data.news_category))
    .catch(err => console.log(err))
const menuContainer = document.getElementById('menu-container');
const displayMenu = (categories) => {
    console.log(categories);
    categories.forEach(category => {
        const a = document.createElement('a');
        a.innerText = `${category.category_name}`;
        a.classList.add('col');
        a.setAttribute('id', '${category.category_id}')
        menuContainer.appendChild(a);
    });
}
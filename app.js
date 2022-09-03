//news menu section 
fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayMenu(data.data.news_category))
    .catch(err => console.log(err))
const menuContainer = document.getElementById('menu-container');
const displayMenu = (categories) => {
    categories.forEach(category => {
        const a = document.createElement('a');
        a.innerText = `${category.category_name}`;
        a.classList.add('col');
        a.setAttribute('id', `${category.category_id}`);
        a.setAttribute('href', '#');
        menuContainer.appendChild(a);
        document.getElementById(category.category_id).addEventListener('click', () => {
            allNews(category.category_id);
        })
    });
}


//news section 


const allNews = (id) => {
    console.log(id);

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(err => console.log(err))
}



const displayNews = (newsAll) => {
    console.log(newsAll);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    newsAll.forEach((news) => {
        const { title, total_view, author, image_url, details, thumbnail_url } = news;
        const { name, img } = author;
        const div = document.createElement('div');
        div.classList.add('row');
        div.innerHTML = `
                        <div class="col-3">
                        <img class="img-fluid" src="${image_url}" alt="">
                        </div>
                        <div class="col-9">
                        <h3> ${title}</h3>
                        <p>${details}</p>
                        <p>
                            <img class="author-img" src="${img}" alt="">
                            <span>${name}</span>
                            <span><i class="fa-thin fa-eye"></i>${total_view}</span>
                            <button>Author Info</button>
                        </p>
                        </div>                     
`
        newsContainer.appendChild(div);
    })
}
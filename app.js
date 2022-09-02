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
        });
    }
    //news section 
setTimeout(() => {
    document.getElementById('01').addEventListener('click', function() {
        fetch('https://openapi.programming-hero.com/api/news/category/01')
            .then(res => res.json())
            .then(data => displayNews(data.data))
            .catch(err => console.log(err))
    })

    document.getElementById('02').addEventListener('click', function() {
        fetch('https://openapi.programming-hero.com/api/news/category/02')
            .then(res => res.json())
            .then(data => displayNews(data.data))
            .catch(err => console.log(err))
    })

    document.getElementById('03').addEventListener('click', function() {
        fetch('https://openapi.programming-hero.com/api/news/category/03')
            .then(res => res.json())
            .then(data => displayNews(data.data))
            .catch(err => console.log(err))
    })

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
                            <img class="img-fluid" src="${img}" alt="">
                            <span>${name}</span>
                            <span><i class="fa-thin fa-eye"></i>${total_view}</span>
                            <button>Author Info</button>
                        </p>
                        </div>                     
`
            newsContainer.appendChild(div);
        })
    }
}, 1000);
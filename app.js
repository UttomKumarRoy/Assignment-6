//news menu section 

fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayMenu(data.data.news_category))
    .catch(err => console.log(err))
const menuContainer = document.getElementById('menu-container');
menuContainer.innerHTML = `<a href="#" class="col-md-1 col-sm-12">Home</a>`;
const displayMenu = (categories) => {
    categories.forEach(category => {
        const a = document.createElement('a');
        a.innerText = `${category.category_name}`;
        a.classList.add('col-md-1');
        a.classList.add('col-sm-12');
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
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data, id))
        .catch(err => console.log(err))
}

const displayNews = (newsAll, id) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    const itemsContainer = document.getElementById('items-found');
    const items = newsAll.length;
    if (items === 0) {
        toggleSpinner(false);
        const linkTitle = document.getElementById(`${id}`).innerText;
        return itemsContainer.innerText = `No item found for category ${linkTitle}`;
    }
    const linkTitle = document.getElementById(`${id}`).innerText;
    itemsContainer.innerText = `${items} items found for category ${linkTitle}`;
    const [{ total_view }] = newsAll;
    newsAll.sort((a, b) => a.total_view - b.total_view).reverse();
    newsAll.forEach((news) => {
        const { _id, title, total_view, author, details, thumbnail_url } = news;
        const { name, img } = author;
        const div = document.createElement('div');
        div.classList.add('row');
        div.classList.add('gy-5');
        let results;
        if (details.length > 600) {
            results = details.slice(0, 600);
            results += '  ...';
        } else {
            results = details;
        }
        div.innerHTML = `
                        <div class="col-md-3 col-sm-12">
                            <img class="img-fluid" src="${thumbnail_url}" alt="">
                        </div>
                        <div class="col-md-9 col-sm-12">
                        <h3> ${title}</h3>
                        <p>${results}</p>
                        <div class="d-flex justify-content-between">
                            <div>
                            <img class="author-img" src="${img}" alt="">
                            <span>${name}</span>
                            </div>
                            <span><i class="fa-regular fa-eye"></i>
                            ${total_view}</span>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id='${_id}'>News Details</button>
                        </div>
                        </div>  
                        <br>                   
`
        newsContainer.appendChild(div);
        toggleSpinner(false);
        document.getElementById(_id).addEventListener('click', () => {
            showModal(_id);
        })
    })
}

//Modal of details news info 

const showModal = (_id) => {
    console.log(_id);
    const url = ` https://openapi.programming-hero.com/api/news/${_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))
        .catch(err => console.log(err))
}

const displayNewsDetails = (news) => {
    console.log(news);
    const { _id, title, total_view, author, details, rating, thumbnail_url } = news;
    const { name, img, published_date } = author;
    const { number } = rating;
    if (name === null) {
        name = "No data found";
    }
    if (total_view === null) {
        name = "No data found";
    }
    const modal = document.getElementById('modal');
    modal.innerHTML = `
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <img src="${thumbnail_url}">
                <p>${details}</p>
                <p>Author:  <img class="author-img" src="${img}"> ${name}</p>
                <p>Published Date: ${published_date}</p>
                <p>View: ${total_view}</p>
                <p>Rating: ${number}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
    `
}


//loader section 
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}
window.onload = () => allNews('01');
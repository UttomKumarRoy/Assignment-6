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
    const linkTitle = document.getElementById(`${id}`).innerText;
    itemsContainer.innerText = `${items} items found for category ${linkTitle}`;
    newsAll.forEach((news) => {
        const { _id, title, total_view, author, details, thumbnail_url } = news;
        const { name, img } = author;
        const div = document.createElement('div');
        div.classList.add('row');
        div.classList.add('gy-5')
        div.innerHTML = `
                        <div class="col-3">
                        <img class="img-fluid" src="${thumbnail_url}" alt="">
                        </div>
                        <div class="col-9">
                        <h3> ${title}</h3>
                        <p>${details}</p>
                        <p>
                            <img class="author-img" src="${img}" alt="">
                            <span>${name}</span>
                            <span><i class="fa-thin fa-eye"></i>${total_view}</span>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id='${_id}'>Author Info</button>
                        </p>
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
    const url = ` https://openapi.programming-hero.com/api/news/${_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))
        .catch(err => console.log(err))
}

const displayNewsDetails = (news) => {
    console.log(news);
    const { _id, title, total_view, author, details, thumbnail_url } = news;
    const { name, img } = author;
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
        loaderSection.classList.remove('d-none')
    } else {
        loaderSection.classList.add('d-none');
    }
}
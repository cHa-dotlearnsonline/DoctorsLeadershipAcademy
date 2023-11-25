getHealth()
getNews()
get_articles()
function get_articles() {

    let csrf_token = getCookie('csrftoken')
    let number = 4
    let category = "Self Development"
    fetch("/category/category", {
        method: 'POST',
        body: JSON.stringify({
            number: number,
            category: category, 
        }),
        headers: {'X-CSRFToken': csrf_token},
        mode: 'same-origin'
    })
    .then(response => response.json())
    .then(articles => {
        articles.forEach(article => {
            let docume = document.querySelector("#our-work-display")
            let photo = article["photo"]
            let title = article["title"]
            let caption= article["caption"]
            let url= article["id"]
            let card = `
            <div class="col-md-6">
          <div class="card my-2 border border-0">
            <img src="${photo}" alt="" class="card-img-top w-100 rounded object-fit-cover">
            <div class="card-body">
              <h4 class="card-title">${title}</h4>
              <p class="card-text text-start">${caption}</p>
              <a  href="/read/${url}" style="text-decoration:none; color:rgb(0, 145, 145);"><strong>READ MORE…</strong></a>
            </div>
          </div> 
        </div>
            `
        docume.insertAdjacentHTML('beforeend', card)


        })
    })
}
function getHealth() {
    let csrf_token = getCookie('csrftoken')
    let number = 3
    let category = "Self Development"
    fetch("/category/category", {
        method: 'POST',
        body: JSON.stringify({
            number: number,
            category: category, 
        }),
        headers: {'X-CSRFToken': csrf_token},
        mode: 'same-origin'
    })
    .then(response => response.json())
    .then( articles => {
        console.log(articles)

        articles.forEach(article => {
          let the_display = document.querySelector("#health")
          let photo = article["photo"]
          let title = article["title"]
          let caption= article["caption"]
          let url= article["id"]
          let card = `
          <div class="col-md-4 my-5">
             <div class="text-start">
                 <div class= "card w-75 rounded shadow border border-second-subtle">
                     <img src="${photo}" class="card-img-top card-display">
                     <div class="card-body text-start healthy-height">
                          <h4 class="card-title">${title}</h4>
                          <p class="card-text">${caption}</p>
                          
                      </div>
                
                    <a href="/read/${url}" class="m-2 nav-font">READ MORE...</a>
                  </div>
             </div>
          </div>
          `
          the_display.insertAdjacentHTML('beforeend', card)
        })
        let the_display = document.querySelector("#health")
        let see_more = `<div class="d-flex justify-content-end"><a class="btn btn-primary fw-semibold" href="/category/Self Development">See more</a></div>`
        the_display.insertAdjacentHTML('beforeend', see_more)
    })
}
function getNews() {
    let csrf_token = getCookie('csrftoken')
    let number = 3
    let category = "Self Development"
    fetch("/category/category", {
        method: 'POST',
        body: JSON.stringify({
            number: number,
            category: category, 
        }),
        headers: {'X-CSRFToken': csrf_token},
        mode: 'same-origin'
    })
    .then(response => response.json()).then( articles => {
        let url = articles[0]["id"]
        let photo = articles[0]["photo"]
        let title = articles[0]["title"]
        let caption = articles[0]["caption"]
        let card1 = `
        <div style="background-image: url(${photo}); min-height:300px;" class="col-md-6 just_image mb-2">
            <a href="/read/${url}" style="text-decoration:none;">
               <div class="card-body">
               <h2 class="card-title" style="color: white;">${title}</h2>
               <p class="card-text" style="color: white;">${caption}</p>
               </div>
            </a>
        </div>
        `
        let displayer = document.querySelector("#news")
        displayer.insertAdjacentHTML('afterbegin', card1)
        let count = 1
        let other_divs = document.querySelectorAll(".row1")
        other_divs.forEach(element => {
            let current_article = articles[count]
            let url = current_article["id"]
            let photo = current_article["photo"]
            let title = current_article["title"]
            let caption = current_article["caption"]
            let card1 = `
            <div id="el-${count}" style="background-image: url(${photo}); min-height:150px;" class="col-4 mx-0 just_image p-0" >
            </div>
            <div class="col-8 bg-secondary-subtle w-md-50 p-md-2" >
            <a href="/read/${url}" style="text-decoration:none; color:black;">
                <div class="card-body">
                <h4 class="card-title">${title}</h4>
                <p class="card-text">${caption}</p>
            </a>
           </div>
            
            </div>
            `
            element.insertAdjacentHTML('beforeend', card1)
            count++
        })
    })
}
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break
            }
        }
    }
    return cookieValue;
}
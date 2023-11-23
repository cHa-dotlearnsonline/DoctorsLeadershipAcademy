get_photos()
function get_photos() {
    const csrf_token = getCookie('csrftoken')
    let first_container = document.querySelector("#first")
    let second_container = document.querySelector("#second")
    first_container.style.display = 'none'
    let windowWidth = window.innerWidth
    console.log(windowWidth)
    if (windowWidth < 768) {
        first_container.style.display = 'block'
        second_container.style.display = 'none'
    }
    window.addEventListener('resize', () => {
        let width = window.innerWidth
        if (width < 768) {
            first_container.style.display = 'block'
            second_container.style.display = 'none'
        } else {
            first_container.style.display = 'none'
            second_container.style.display = 'block'
        }
    })
    fetch('/gallery', {
        method: 'POST',
        body: JSON.stringify({
            photos: "all"
        }),
        headers: {'X-CSRFToken': csrf_token},
        mode: 'same-origin'
    })
    .then(response => response.json())
    .then(photos => {
        console.log(photos)  
        let shown_pictures = []
        for (let i=0; i < photos.length; i++){
            let picture = photos[i]["photo"]
            let card = `
                <div class="col-md-12 mb-5">
                <img src=${picture} class = "w-100"> 
                </div>
                `
            first_container.insertAdjacentHTML('beforeend', card)
        }
        for (let i=0; i < photos.length; i = i + 2){
            let k = 0
            for (let j = 0; j < 4; j++ ) {
                let column = document.querySelector(`#column${k+1}`)
                if ( (i+j) < photos.length){
                    let picture = photos[i+j]["photo"]
                    let card = `
                    <div class="col-12 mb-5">
                    <img src=${picture} class = "w-100"> 
                    </div>
                    `
                    if (!shown_pictures.includes(picture) && ((k+1)!== 4)){
                        column.insertAdjacentHTML('beforeend', card)
                        shown_pictures.push(picture)
                        k = k + 1
                    }

                }
                
            }
            
        }
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



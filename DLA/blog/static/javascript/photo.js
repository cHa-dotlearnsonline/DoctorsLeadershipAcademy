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
        for (let i=0; i < photos.length; i++){
            let picture = photos[i]["photo"]
            let card = `
                <div class="col-md-12 mb-1">
                <img src=${picture} class = "w-100"> 
                </div>
                `
            first_container.insertAdjacentHTML('beforeend', card)
        }

        // new material that will hopefully work
        let to_distribute = []
        let current_start = 0
        for (let i= 0; i < photos.length; i=i+3){
            my_array = photos.slice(current_start, current_start+3)
            console.log(my_array)
            to_distribute.push(my_array)
            current_start=current_start+3
        }
        for (let i=0; i < to_distribute.length; i++){
            let current_arrary  = to_distribute[i]
            for (let j = 0; j < current_arrary.length; j++ ) {
                let column = document.querySelector(`#column${j+1}`)
                let picture = current_arrary[j]["photo"]
                let card = `
                <div class="col-12 mb-1">
                <img src=${picture} class = "w-100"> 
                </div>
                `
                column.insertAdjacentHTML('beforeend', card)
                
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



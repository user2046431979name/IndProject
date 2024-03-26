let btn_save = document.querySelector(".nav_save")
let div_save = document.querySelector(".saves_film")

let btn_like = document.querySelector(".nav_like")
let div_like = document.querySelector(".likes_film")

let btn_comment = document.querySelector(".nav_comment")
let div_comment = document.querySelector(".comments_link")

btn_save.addEventListener("click",event => {
     btn_save.style.cssText = "border-bottom: 1px solid white;";
     div_save.style.display = "flex";

     div_like.style.display = "none";
     btn_like.style.border = "0";
     div_comment.style.display = "none";
     btn_comment.style.border = "0";
})

btn_like.addEventListener("click",event => {
     btn_like.style.cssText = "border-bottom: 1px solid white;";
     div_like.style.display = "flex";

     div_save.style.display = "none";
     btn_save.style.border = "0";
     div_comment.style.display = "none";
     btn_comment.style.border = "0";
})

btn_comment.addEventListener("click",event => {
     btn_comment.style.cssText = "border-bottom: 1px solid white;";
     div_comment.style.display = "flex";

     div_save.style.display = "none";
     btn_save.style.border = "0";
     div_like.style.display = "none";
     btn_like.style.border = "0";
})


let profile = document.querySelector(".header_profile")
 profile.addEventListener("click",event => {
    window.location.href = "http://127.0.0.1:8000/Profile"
 })


let up_btn = document.querySelector(".update_btn")
let modal_change = document.querySelector(".Modal")
up_btn.addEventListener("click",event => {
     modal_change.style.display = "block";
})

let exit_btn = document.querySelector(".change_exit i")
exit_btn.addEventListener("click",event => {
     modal_change.style.display = "none";
})

async function getFilms(url){
   try{
       let response = await fetch(url)
       if(!response.ok){
           console.log("error in after res")
       }
       return response.json()
   } catch (error) {
       console.log("error in try/catch")
   }
}

getFilms("http://127.0.0.1:8000/getLikeFilm/")
  .then(data => {
      let array = JSON.parse(data)
      let cont_save = document.querySelector(".likes_film .cards")
      array.forEach(item => {
             let card = document.createElement("div")
             card.className = "card"
                let a = document.createElement("a")
                a.href = "http://127.0.0.1:8000/About/" + item.fields.slug
                    let info = document.createElement("div")
                    info.className = "card_info"
                       let img = document.createElement("img")
                       img.src = "http://127.0.0.1:8000/media/" + item.fields.poster
                       info.appendChild(img)
                       let title = document.createElement("span")
                       title.innerHTML = item.fields.title
                       info.appendChild(title)

                    a.appendChild(info)
                card.appendChild(a)
                    let delete_card = document.createElement("div")
                    delete_card.className = "card_delete"
                         let trash = document.createElement("i")
                         trash.classList.add("fas","fa-trash")
                         delete_card.appendChild(trash)
                    let slug = document.createElement("span")
                    slug.className = "slug"
                    slug.id = item.fields.slug
                    slug.style.display = "none";
                    card.appendChild(slug)
                card.appendChild(delete_card)
             cont_save.prepend(card)
       })
       document.querySelectorAll(".likes_film .cards .card").forEach(item => {
             let delete_btn = item.querySelector(".card_delete")
             let delete_slug = item.querySelector(".slug").id
             delete_btn.addEventListener("click",event => {
                 event.preventDefault()
                 cont_save.removeChild(item)
                 fetch("http://127.0.0.1:8000/Like/" + delete_slug)
                    .then(res => {return res.json()})
                        .then(data => {})
                    .catch(error => {console.log(error)})
             })
       })
  })

getFilms("http://127.0.0.1:8000/getSaveFilm/")
  .then(data => {
       let array = JSON.parse(data);
       let cont_save = document.querySelector(".saves_film .cards")
       array.forEach(item => {
             let card = document.createElement("div")
             card.className = "card"
                let a = document.createElement("a")
                a.href = "http://127.0.0.1:8000/About/" + item.fields.slug
                    let info = document.createElement("div")
                    info.className = "card_info"
                       let img = document.createElement("img")
                       img.src = "http://127.0.0.1:8000/media/" + item.fields.poster
                       info.appendChild(img)
                       let title = document.createElement("span")
                       title.innerHTML = item.fields.title
                       info.appendChild(title)

                    a.appendChild(info)
                card.appendChild(a)
                    let delete_card = document.createElement("div")
                    delete_card.className = "card_delete"
                         let trash = document.createElement("i")
                         trash.classList.add("fas","fa-trash")
                         delete_card.appendChild(trash)
                card.appendChild(delete_card)
                let slug = document.createElement("span")
                slug.className = "slug"
                slug.id = item.fields.slug
                slug.style.display = "none";
                card.appendChild(slug)
             cont_save.prepend(card)
       })

       document.querySelectorAll(".saves_film .cards .card").forEach(item => {
             let delete_btn = item.querySelector(".card_delete")
             let delete_slug = item.querySelector(".slug").id
             delete_btn.addEventListener("click",event => {
                 event.preventDefault()
                 cont_save.removeChild(item)
                 fetch("http://127.0.0.1:8000/saveFilm/" + delete_slug)
                    .then(res => {return res.json()})
                        .then(data => {})
                    .catch(error => {console.log(error)})
             })
       })

  })

getFilms("http://127.0.0.1:8000/getCommFilm/")
  .then(data => {
      let array = JSON.parse(data)
      let cont_save = document.querySelector(".comments_link .cards")
      array.forEach(item => {
           let card = document.createElement("div")
           card.className = "comm_card"
              let a = document.createElement("a")
              a.href = "http://127.0.0.1:8000/About/" + item.fields.film_title
              a.className = "info_a"
                  let c_info = document.createElement("div")
                  c_info.className = "comment_info"
                     let img = document.createElement("img")
                     img.src = "http://127.0.0.1:8000/media/" + item.fields.user_ava
                     c_info.appendChild(img)
                     let span = document.createElement("span")
                     span.className = "info_title"
                     span.innerHTML = item.fields.username
                     c_info.appendChild(span)
                     let date = document.createElement("span")
                     date.className = "info_data"
                     date.innerHTML = String(item.fields.date).slice(0,10)
                     c_info.appendChild(date)
                  a.appendChild(c_info)

                  let del_a = document.createElement("a")
                  del_a.className = "del_a"
                     let delete_func = document.createElement("div")
                     delete_func.className = "delete_comment"
                         let trash_comm = document.createElement("i")
                         trash_comm.classList.add("fas","fa-trash")
                         delete_func.appendChild(trash_comm)
                     del_a.appendChild(delete_func)
                  a.appendChild(del_a)
              card.appendChild(a)

              let c_text = document.createElement("div")
              c_text.className = "comment_text"
                   let btn_f = document.createElement("button")
                   btn_f.className = "comm_full_text"
                   btn_f.innerHTML = "expand"
                   c_text.appendChild(btn_f)
                   let comment = document.createElement("div")
                   comment.className = "comm_text"
                        let tqx = document.createElement("span")

                        tqx.innerHTML = item.fields.text_comment
                        comment.appendChild(tqx)
                   c_text.appendChild(comment)
                   let btn_s = document.createElement("button")
                   btn_s.className = "comm_short_text"
                   btn_s.innerHTML = "hide"
                   c_text.appendChild(btn_s)


                     let pk = document.createElement("span")
                     pk.className = "comm_id"
                     pk.id = item.pk
                     pk.style.display = "none";
                   card.appendChild(pk)
              card.appendChild(c_text)
           cont_save.prepend(card)
      })
      document.querySelectorAll(".comment_text").forEach(item => {
          let comm_full = item.querySelector(".comm_full_text")
          let comm_short = item.querySelector(".comm_short_text")
          let comm_text = item.querySelector(".comm_text")
          comm_full.addEventListener("click",event => {
              comm_full.style.display = "none";
              comm_text.style.display = "flex";
              comm_short.style.display = "flex";
          })
          comm_short.addEventListener("click",event => {
              comm_short.style.display = "none";
              comm_text.style.display = "none";
              comm_full.style.display = "flex";
          })
      })
      document.querySelectorAll(".comments_link .cards .comm_card").forEach(item => {
             let delete_btn = item.querySelector(".del_a .delete_comment i")
             let comm_id = item.querySelector(".comm_id").id
             delete_btn.addEventListener("click",event => {
                  event.preventDefault()
                  cont_save.removeChild(item)
                  fetch("http://127.0.0.1:8000/deleteDataComment/" + comm_id)
                     .then(response => {return response.json()})
                         .then(data => {})
                     .catch(error => {console.log(error)})
             })
      })
  })



let form = document.getElementById("form")
form.addEventListener("submit",event => {
    event.preventDefault()

    let ava = document.querySelector(".c_ava")
    let username = document.querySelector(".c_username")
    let login = document.querySelector(".c_login")
    let password = document.querySelector(".c_password")

    let formD = new FormData(form)

    fetch("http://127.0.0.1:8000/changeAccount/",{
         method: "POST",
         body: formD,
         headers:{
              'X-Requested-With':'XMLHttpRequest',
              'X-CSRFToken': document.querySelector('meta[name="csrf-token"]'),
         },
    })
      .then(response => {return response.json()})
         .then(data => {
             document.querySelector(".Modal").style.display = "none";
             window.location.reload()
         })
      .catch(error => {
         console.log(error)
      })


})





let profile = document.querySelector(".header_profile")
if(profile){
profile.addEventListener("click",event => {
   window.location.href = "http://127.0.0.1:8000/Profile"
})}
const numberRedact = (num) => {
   num = String(num)
   if(num.length > 3 && num.length <= 6){
      if(num.length == 4){
         if(num.slice(1,2) != 0){
           return ` ${num.slice(0,1)}.${num.slice(1,2)}k`
         } else {
           return ` ${num.slice(0,1)}k`
         }
      } else if(num.length == 5){
          if(num.slice(2,3) != 0){
             return ` ${num.slice(0,2)}.${num.slice(2,3)}k`
         } else {
             return ` ${num.slice(0,2)}k`
         }
      } else if(num.length == 6){
         if(num.slice(3,4) != 0){
            return ` ${num.slice(0,3)}.${num.slice(3,4)}k`
         } else {
            return ` ${num.slice(0,3)}k`
         }
      }
   } else if(num.length > 6 && num.length <= 9){
      if(num.length == 7){
         if(num.slice(1,2) != 0){
           return ` ${num.slice(0,1)}.${num.slice(1,2)}m`
         } else {
           return ` ${num.slice(0,1)}m`
         }
      } else if(num.length == 8){
         if(num.slice(2,3) != 0){
             return ` ${num.slice(0,2)}.${num.slice(2,3)}m`
         } else {
             return ` ${num.slice(0,2)}m`
         }
      } else if(num.length == 9){
         if(num.slice(3,4) != 0){
            return ` ${num.slice(0,3)}.${num.slice(3,4)}m`
         } else {
            return ` ${num.slice(0,3)}m`
         }
      }
   } else if(num.length > 9 && num.length <= 12){
      if(num.length == 10){
         if(num.slice(1,2) != 0){
           return ` ${num.slice(0,1)}.${num.slice(1,2)}b`
         } else {
           return ` ${num.slice(0,1)}b`
         }
      } else if(num.length == 11){
         if(num.slice(2,3) != 0){
             return ` ${num.slice(0,2)}.${num.slice(2,3)}b`
         } else {
             return ` ${num.slice(0,2)}b`
         }
      } else if(num.length == 12){
         if(num.slice(3,4) != 0){
            return ` ${num.slice(0,3)}.${num.slice(3,4)}b`
         } else {
            return ` ${num.slice(0,3)}b`
         }
      }
   } else {
       return num
   }
}
const deleteCard = () => {
    let p = document.querySelectorAll(".film_card")

    p.forEach(item => {
         document.querySelector(".content_films").removeChild(item);
    })
}

async function getDataFilms(url){
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

getDataFilms("http://127.0.0.1:8000/getDataFilms/25")
   .then(data => {
        let array = JSON.parse(data)
        let films = document.querySelector(".content_films")
        let search_title = document.getElementById("search")
        search_title.addEventListener("submit",event => {
             event.preventDefault()
             let film_title = document.querySelector(".filter_name_inp")
             let film_btn = document.querySelector(".filter_name_btn")
             let formD = new FormData(search_title)
             fetch("http://127.0.0.1:8000/getDataFilms/25",{
                 method: "POST",
                 body: formD,
                 headers:{
                     'X-Requested-With':'XMLHttpRequest',
                     'X-CSRFToken': "9Y4EizMnZzURJXn6jSMbSYRrZA3gSXIU9Y8p7Cg5ZFOjzVfHIao2SOgf7Jok0ig8",
                 },
             })
               .then(response => {return response.json()})
                  .then(data_f => {
                      if(data_f){
                         array = JSON.parse(data_f)
                         deleteCard()
                         array.forEach(item => {
          let card = document.createElement("div")
          card.className = "film_card"
          let a = document.createElement("a")
          let f = "http://127.0.0.1:8000/About/"
          let s = item.fields.slug
          a.href = f.concat("",s)

          let card_info = document.createElement("div")
          card_info.className = "film_card_info"

          let btn_save = document.createElement("button")
              btn_save.className = "card_saveFunc"
              let i_save = document.createElement("i")
              let slug_save = document.createElement("span")
              slug_save.className = "slug_save"
              slug_save.innerHTML = item.fields.slug
              slug_save.style.display = "none"
              btn_save.appendChild(slug_save)
              i_save.classList.add("fas","fa-bookmark")
              btn_save.appendChild(i_save)
              card_info.appendChild(btn_save)


          let btn_like = document.createElement("button")
              btn_like.className = "card_like"
              let i_like = document.createElement("span")
              i_like.className = "like_i"
              let true_like = document.createElement("span")
              true_like.className = "true_like"
              true_like.innerHTML = item.fields.likes
              true_like.style.display = "none"
              btn_like.appendChild(true_like)
              let slug_like = document.createElement("span")
              slug_like.className = "slug_like"
              slug_like.innerHTML = item.fields.slug
              slug_like.style.display = "none"
              btn_like.appendChild(slug_like)
              let like_ind = document.createElement("span")
              like_ind.className = "like_ind"
              i_like.innerHTML = "&#10084;"
              btn_like.prepend(i_like)
              like_ind.innerHTML += `  ${numberRedact(item.fields.likes)}`
              btn_like.appendChild(like_ind)
          card_info.appendChild(btn_like)


          let span = document.createElement("span")
              let i = document.createElement("i")
              i.classList.add("fas","fa-eye")
              span.prepend(i)
              span.innerHTML += `  ${numberRedact(item.fields.watch)}`
              card_info.appendChild(span)

          let span1 = document.createElement("span")
          span1.className = "card_date"
              span1.innerHTML = item.fields.date
              card_info.appendChild(span1)

          let span2 = document.createElement("span")
          span2.className = "card_zhanre"
              span2.innerHTML = item.fields.zhanre_title
              card_info.appendChild(span2)

              a.appendChild(card_info)

          card.appendChild(a)

          let poster = document.createElement("div")
          poster.className = "film_card_poster"
          let f1 = "background: url('http://127.0.0.1:8000/media/"
          let s1 = `${item.fields.poster}') center no-repeat;background-size:cover;`
          poster.style = f1.concat("",s1)
          card.appendChild(poster)


          let span3 = document.createElement("span")
          span3.className = "film_background"
          let f2 = "background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('http://127.0.0.1:8000/media/"
          let s2 = `${item.fields.poster}') center no-repeat;background-size:cover;`
          span3.innerHTML = f2.concat("",s2)
          poster.appendChild(span3)


          let title = document.createElement("span")
          title.className = "film_card_title"
          title.innerHTML = item.fields.title

          card.appendChild(title)
          card.prepend(a)

          films.prepend(card)


          let film_card = document.querySelectorAll(".film_card")
          film_card.forEach(item => {
          let film_poster = item.querySelector(".film_card_poster")
          let film_info = item.querySelector(".film_card_info")
          let fone = item.querySelector(".film_background")
          item.addEventListener("mouseover", () => {
              film_poster.style.display = "none";
              film_info.style.cssText = `${fone.innerHTML}; display: flex; width: 140px;height: 190px;`;
          })
          item.addEventListener("mouseout", () => {
              film_poster.style.display = "flex";
              film_info.style.display = "none";
          })

          })
       })
                         document.querySelectorAll(".card_like").forEach(item => {
              fetch("http://127.0.0.1:8000/isLike/" + item.querySelector(".slug_like").innerHTML)
                .then(response => {return response.json()}).then(data => {
                   if(data.success == 1){
                        item.querySelector(".like_i").style.color = "red"
                   }else if(data.success == -1){
                      item.querySelector(".like_i").style.color = "";
                   } else if(data.success == false){
                      item.style.display = "none";
                   }
                }).catch(error => {console.log(error)})
             item.addEventListener("click",event => {
                  event.preventDefault()
                  item.querySelector(".like_i").style.color = "red";

                  fetch("http://127.0.0.1:8000/Like/" + item.querySelector(".slug_like").innerHTML)
                     .then(response => {
                         return response.json()
                     })
                        .then(data => {
                            if(data.success == true){
                                 item.querySelector(".like_ind").innerHTML = numberRedact(parseInt(item.querySelector(".true_like").innerHTML) + 1)
                                 item.querySelector(".true_like").innerHTML = parseInt(item.querySelector(".true_like").innerHTML) + 1

                            } else if(data.success == -1) {
                                 item.querySelector(".like_ind").innerHTML = numberRedact(parseInt(item.querySelector(".true_like").innerHTML) - 1)
                                 item.querySelector(".true_like").innerHTML = parseInt(item.querySelector(".true_like").innerHTML) - 1
                                 item.querySelector(".like_i").style.color = "";
                            }
                        })
                     .catch(error => {
                          console.log(error)
                     })

             })
        })
                         document.querySelectorAll(".card_saveFunc").forEach(item => {
             fetch("http://127.0.0.1:8000/isSave/" + item.querySelector(".slug_save").innerHTML)
                .then(response => {return response.json()}).then(data => {
                   if(data.success == 1){item.querySelector("i").style.color = "orange"
                   }else if(data.success == -1){
                      item.querySelector("i").style.color = "";
                   } else if(data.success == false){
                      item.style.display = "none";
                   }
                }).catch(error => {console.log(error)})

             item.addEventListener("click",event => {
                  event.preventDefault()
                  item.querySelector("i").style.color = "orange";
                  fetch("http://127.0.0.1:8000/saveFilm/" + item.querySelector(".slug_save").innerHTML)
                    .then(response => {
                           return response.json()
                    })
                       .then(data => {
                            if(data.success == 1){

                            } else if(data.success == -1){
                                item.querySelector("i").style.color = "";
                            }
                       })
                    .catch(error => {
                        console.log(error)
                    })
             })
        })
                  } else {
                         array = JSON.parse(data)
                         deleteCard()
                         array.forEach(item => {
          let card = document.createElement("div")
          card.className = "film_card"
          let a = document.createElement("a")
          let f = "http://127.0.0.1:8000/About/"
          let s = item.fields.slug
          a.href = f.concat("",s)

          let card_info = document.createElement("div")
          card_info.className = "film_card_info"

          let btn_save = document.createElement("button")
              btn_save.className = "card_saveFunc"
              let i_save = document.createElement("i")
              let slug_save = document.createElement("span")
              slug_save.className = "slug_save"
              slug_save.innerHTML = item.fields.slug
              slug_save.style.display = "none"
              btn_save.appendChild(slug_save)
              i_save.classList.add("fas","fa-bookmark")
              btn_save.appendChild(i_save)
              card_info.appendChild(btn_save)


          let btn_like = document.createElement("button")
              btn_like.className = "card_like"
              let i_like = document.createElement("span")
              i_like.className = "like_i"
              let true_like = document.createElement("span")
              true_like.className = "true_like"
              true_like.innerHTML = item.fields.likes
              true_like.style.display = "none"
              btn_like.appendChild(true_like)
              let slug_like = document.createElement("span")
              slug_like.className = "slug_like"
              slug_like.innerHTML = item.fields.slug
              slug_like.style.display = "none"
              btn_like.appendChild(slug_like)
              let like_ind = document.createElement("span")
              like_ind.className = "like_ind"
              i_like.innerHTML = "&#10084;"
              btn_like.prepend(i_like)
              like_ind.innerHTML += `  ${numberRedact(item.fields.likes)}`
              btn_like.appendChild(like_ind)
          card_info.appendChild(btn_like)


          let span = document.createElement("span")
              let i = document.createElement("i")
              i.classList.add("fas","fa-eye")
              span.prepend(i)
              span.innerHTML += `  ${numberRedact(item.fields.watch)}`
              card_info.appendChild(span)

          let span1 = document.createElement("span")
          span1.className = "card_date"
              span1.innerHTML = item.fields.date
              card_info.appendChild(span1)

          let span2 = document.createElement("span")
          span2.className = "card_zhanre"
              span2.innerHTML = item.fields.zhanre_title
              card_info.appendChild(span2)

              a.appendChild(card_info)

          card.appendChild(a)

          let poster = document.createElement("div")
          poster.className = "film_card_poster"
          let f1 = "background: url('http://127.0.0.1:8000/media/"
          let s1 = `${item.fields.poster}') center no-repeat;background-size:cover;`
          poster.style = f1.concat("",s1)
          card.appendChild(poster)


          let span3 = document.createElement("span")
          span3.className = "film_background"
          let f2 = "background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('http://127.0.0.1:8000/media/"
          let s2 = `${item.fields.poster}') center no-repeat;background-size:cover;`
          span3.innerHTML = f2.concat("",s2)
          poster.appendChild(span3)


          let title = document.createElement("span")
          title.className = "film_card_title"
          title.innerHTML = item.fields.title

          card.appendChild(title)
          card.prepend(a)

          films.prepend(card)


          let film_card = document.querySelectorAll(".film_card")
          film_card.forEach(item => {
          let film_poster = item.querySelector(".film_card_poster")
          let film_info = item.querySelector(".film_card_info")
          let fone = item.querySelector(".film_background")
          item.addEventListener("mouseover", () => {
              film_poster.style.display = "none";
              film_info.style.cssText = `${fone.innerHTML}; display: flex; width: 140px;height: 190px;`;
          })
          item.addEventListener("mouseout", () => {
              film_poster.style.display = "flex";
              film_info.style.display = "none";
          })

          })
       })
       document.querySelectorAll(".card_like").forEach(item =>                   {
              fetch("http://127.0.0.1:8000/isLike/" + item.querySelector(".slug_like").innerHTML)
                .then(response => {return response.json()}).then(data => {
                   if(data.success == 1){
                        item.querySelector(".like_i").style.color = "red"
                   }else if(data.success == -1){
                      item.querySelector(".like_i").style.color = "";
                   } else if(data.success == false){
                      item.style.display = "none";
                   }
                }).catch(error => {console.log(error)})
             item.addEventListener("click",event => {
                  event.preventDefault()
                  item.querySelector(".like_i").style.color = "red";

                  fetch("http://127.0.0.1:8000/Like/" + item.querySelector(".slug_like").innerHTML)
                     .then(response => {
                         return response.json()
                     })
                        .then(data => {
                            if(data.success == true){
                                 item.querySelector(".like_ind").innerHTML = numberRedact(parseInt(item.querySelector(".true_like").innerHTML) + 1)
                                 item.querySelector(".true_like").innerHTML = parseInt(item.querySelector(".true_like").innerHTML) + 1

                            } else if(data.success == -1) {
                                 item.querySelector(".like_ind").innerHTML = numberRedact(parseInt(item.querySelector(".true_like").innerHTML) - 1)
                                 item.querySelector(".true_like").innerHTML = parseInt(item.querySelector(".true_like").innerHTML) - 1
                                 item.querySelector(".like_i").style.color = "";
                            }
                        })
                     .catch(error => {
                          console.log(error)
                     })

             })
        })
                         document.querySelectorAll(".card_saveFunc").forEach(item => {
             fetch("http://127.0.0.1:8000/isSave/" + item.querySelector(".slug_save").innerHTML)
                .then(response => {return response.json()}).then(data => {
                   if(data.success == 1){item.querySelector("i").style.color = "orange"
                   }else if(data.success == -1){
                      item.querySelector("i").style.color = "";
                   } else if(data.success == false){
                      item.style.display = "none";
                   }
                }).catch(error => {console.log(error)})

             item.addEventListener("click",event => {
                  event.preventDefault()
                  item.querySelector("i").style.color = "orange";
                  fetch("http://127.0.0.1:8000/saveFilm/" + item.querySelector(".slug_save").innerHTML)
                    .then(response => {
                           return response.json()
                    })
                       .then(data => {
                            if(data.success == 1){

                            } else if(data.success == -1){
                                item.querySelector("i").style.color = "";
                            }
                       })
                    .catch(error => {
                        console.log(error)
                    })
             })
        })
                     }
                  })
               .catch(error => {console.log(error)})
        })


        array.forEach(item => {
          let card = document.createElement("div")
          card.className = "film_card"
          let a = document.createElement("a")
          let f = "http://127.0.0.1:8000/About/"
          let s = item.fields.slug
          a.href = f.concat("",s)

          let card_info = document.createElement("div")
          card_info.className = "film_card_info"

          let btn_save = document.createElement("button")
              btn_save.className = "card_saveFunc"
              let i_save = document.createElement("i")
              let slug_save = document.createElement("span")
              slug_save.className = "slug_save"
              slug_save.innerHTML = item.fields.slug
              slug_save.style.display = "none"
              btn_save.appendChild(slug_save)
              i_save.classList.add("fas","fa-bookmark")
              btn_save.appendChild(i_save)
              card_info.appendChild(btn_save)


          let btn_like = document.createElement("button")
              btn_like.className = "card_like"
              let i_like = document.createElement("span")
              i_like.className = "like_i"
              let true_like = document.createElement("span")
              true_like.className = "true_like"
              true_like.innerHTML = item.fields.likes
              true_like.style.display = "none"
              btn_like.appendChild(true_like)
              let slug_like = document.createElement("span")
              slug_like.className = "slug_like"
              slug_like.innerHTML = item.fields.slug
              slug_like.style.display = "none"
              btn_like.appendChild(slug_like)
              let like_ind = document.createElement("span")
              like_ind.className = "like_ind"
              i_like.innerHTML = "&#10084;"
              btn_like.prepend(i_like)
              like_ind.innerHTML += `  ${numberRedact(item.fields.likes)}`
              btn_like.appendChild(like_ind)
          card_info.appendChild(btn_like)


          let span = document.createElement("span")
              let i = document.createElement("i")
              i.classList.add("fas","fa-eye")
              span.prepend(i)
              span.innerHTML += `  ${numberRedact(item.fields.watch)}`
              card_info.appendChild(span)

          let span1 = document.createElement("span")
          span1.className = "card_date"
              span1.innerHTML = item.fields.date
              card_info.appendChild(span1)

          let span2 = document.createElement("span")
          span2.className = "card_zhanre"
              span2.innerHTML = item.fields.zhanre_title
              card_info.appendChild(span2)

              a.appendChild(card_info)

          card.appendChild(a)

          let poster = document.createElement("div")
          poster.className = "film_card_poster"
          let f1 = "background: url('http://127.0.0.1:8000/media/"
          let s1 = `${item.fields.poster}') center no-repeat;background-size:cover;`
          poster.style = f1.concat("",s1)
          card.appendChild(poster)


          let span3 = document.createElement("span")
          span3.className = "film_background"
          let f2 = "background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('http://127.0.0.1:8000/media/"
          let s2 = `${item.fields.poster}') center no-repeat;background-size:cover;`
          span3.innerHTML = f2.concat("",s2)
          poster.appendChild(span3)


          let title = document.createElement("span")
          title.className = "film_card_title"
          title.innerHTML = item.fields.title

          card.appendChild(title)
          card.prepend(a)

          films.prepend(card)


          let film_card = document.querySelectorAll(".film_card")
          film_card.forEach(item => {
          let film_poster = item.querySelector(".film_card_poster")
          let film_info = item.querySelector(".film_card_info")
          let fone = item.querySelector(".film_background")
          item.addEventListener("mouseover", () => {
              film_poster.style.display = "none";
              film_info.style.cssText = `${fone.innerHTML}; display: flex; width: 140px;height: 190px;`;
          })
          item.addEventListener("mouseout", () => {
              film_poster.style.display = "flex";
              film_info.style.display = "none";
          })

          })
       })


        let s_like = document.querySelector(".sort_like")
        let s_time = document.querySelector(".sort_time")
        let s_watch = document.querySelector(".sort_watch")
        let change_filter = document.querySelector(".change_filter")
        s_like.addEventListener("click",event => {
             event.preventDefault()
             if(s_like.style.color == "black"){
                  change_filter.value = ""
                  s_like.style.cssText = "background: transparent;color: #fff;"
                  s_time.style.cssText = ""
                  s_watch.style.cssText = ""
             } else{
                  s_like.style.cssText = "background: #fff;color: black;"
                  change_filter.value = "likes"
                  s_time.style.cssText = ""
                  s_watch.style.cssText = ""
             }
        })
        s_time.addEventListener("click",event => {
             event.preventDefault()
             if(s_time.style.color == "black"){
                  change_filter.value = ""
                  s_time.style.cssText = "background: transparent;color: #fff;"
                  s_like.style.cssText = ""
                  s_watch.style.cssText = ""
             } else{
                  s_time.style.cssText = "background: #fff;color: black;"
                  change_filter.value = "dates"
                  s_like.style.cssText = ""
                  s_watch.style.cssText = ""
             }
        })
        s_watch.addEventListener("click",event => {
             event.preventDefault()
             if(s_watch.style.color == "black"){
                  change_filter.value = ""
                  s_watch.style.cssText = "background: transparent;color: #fff;"
                  s_time.style.cssText = ""
                  s_like.style.cssText = ""
             } else{
                  s_watch.style.cssText = "background: #fff;color: black;"
                  change_filter.value = "watches"
                  s_time.style.cssText = ""
                  s_like.style.cssText = ""
             }
        })

        let s_zhanres = document.querySelector(".filter_zhanre")
        let change_zhanre = document.querySelector(".change_option_zhanres")
        s_zhanres.addEventListener("change",event => {
             event.preventDefault()
             let selectedOption = s_zhanres.options[s_zhanres.selectedIndex];
             change_zhanre.value = selectedOption.id
        })

        let filter = document.getElementById("filters")
        let filter_btn = document.querySelector(".filter_zhanre_btn")
        filter_btn.addEventListener("click",event => {
           event.preventDefault()
           let formD = new FormData(filter)
           fetch("http://127.0.0.1:8000/getDataFilms/25",{
                method:"POST",
                body:formD,
                headers:{
                     'X-Requested-With':'XMLHttpRequest',
                     'X-CSRFToken': document.querySelector('meta[name="csrf-token"]'),
                }
           })
              .then(data => {return data.json()})
                 .then(data => {
                    let array = JSON.parse(data)
                    deleteCard()
                    array.forEach(item => {
          let card = document.createElement("div")
          card.className = "film_card"
          let a = document.createElement("a")
          let f = "http://127.0.0.1:8000/About/"
          let s = item.fields.slug
          a.href = f.concat("",s)

          let card_info = document.createElement("div")
          card_info.className = "film_card_info"

          let btn_save = document.createElement("button")
              btn_save.className = "card_saveFunc"
              let i_save = document.createElement("i")
              let slug_save = document.createElement("span")
              slug_save.className = "slug_save"
              slug_save.innerHTML = item.fields.slug
              slug_save.style.display = "none"
              btn_save.appendChild(slug_save)
              i_save.classList.add("fas","fa-bookmark")
              btn_save.appendChild(i_save)
              card_info.appendChild(btn_save)


          let btn_like = document.createElement("button")
              btn_like.className = "card_like"
              let i_like = document.createElement("span")
              i_like.className = "like_i"
              let true_like = document.createElement("span")
              true_like.className = "true_like"
              true_like.innerHTML = item.fields.likes
              true_like.style.display = "none"
              btn_like.appendChild(true_like)
              let slug_like = document.createElement("span")
              slug_like.className = "slug_like"
              slug_like.innerHTML = item.fields.slug
              slug_like.style.display = "none"
              btn_like.appendChild(slug_like)
              let like_ind = document.createElement("span")
              like_ind.className = "like_ind"
              i_like.innerHTML = "&#10084;"
              btn_like.prepend(i_like)
              like_ind.innerHTML += `  ${numberRedact(item.fields.likes)}`
              btn_like.appendChild(like_ind)
          card_info.appendChild(btn_like)


          let span = document.createElement("span")
              let i = document.createElement("i")
              i.classList.add("fas","fa-eye")
              span.prepend(i)
              span.innerHTML += `  ${numberRedact(item.fields.watch)}`
              card_info.appendChild(span)

          let span1 = document.createElement("span")
          span1.className = "card_date"
              span1.innerHTML = item.fields.date
              card_info.appendChild(span1)

          let span2 = document.createElement("span")
          span2.className = "card_zhanre"
              span2.innerHTML = item.fields.zhanre_title
              card_info.appendChild(span2)

              a.appendChild(card_info)

          card.appendChild(a)

          let poster = document.createElement("div")
          poster.className = "film_card_poster"
          let f1 = "background: url('http://127.0.0.1:8000/media/"
          let s1 = `${item.fields.poster}') center no-repeat;background-size:cover;`
          poster.style = f1.concat("",s1)
          card.appendChild(poster)


          let span3 = document.createElement("span")
          span3.className = "film_background"
          let f2 = "background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('http://127.0.0.1:8000/media/"
          let s2 = `${item.fields.poster}') center no-repeat;background-size:cover;`
          span3.innerHTML = f2.concat("",s2)
          poster.appendChild(span3)


          let title = document.createElement("span")
          title.className = "film_card_title"
          title.innerHTML = item.fields.title

          card.appendChild(title)
          card.prepend(a)

          films.prepend(card)


          let film_card = document.querySelectorAll(".film_card")
          film_card.forEach(item => {
          let film_poster = item.querySelector(".film_card_poster")
          let film_info = item.querySelector(".film_card_info")
          let fone = item.querySelector(".film_background")
          item.addEventListener("mouseover", () => {
              film_poster.style.display = "none";
              film_info.style.cssText = `${fone.innerHTML}; display: flex; width: 140px;height: 190px;`;
          })
          item.addEventListener("mouseout", () => {
              film_poster.style.display = "flex";
              film_info.style.display = "none";
          })

          })
       })
                    document.querySelectorAll(".card_like").forEach(item => {
              fetch("http://127.0.0.1:8000/isLike/" + item.querySelector(".slug_like").innerHTML)
                .then(response => {return response.json()}).then(data => {
                   if(data.success == 1){
                        item.querySelector(".like_i").style.color = "red"
                   }else if(data.success == -1){
                      item.querySelector(".like_i").style.color = "";
                   } else if(data.success == false){
                      item.style.display = "none";
                   }
                }).catch(error => {console.log(error)})
             item.addEventListener("click",event => {
                  event.preventDefault()
                  item.querySelector(".like_i").style.color = "red";

                  fetch("http://127.0.0.1:8000/Like/" + item.querySelector(".slug_like").innerHTML)
                     .then(response => {
                         return response.json()
                     })
                        .then(data => {
                            if(data.success == true){
                                 item.querySelector(".like_ind").innerHTML = numberRedact(parseInt(item.querySelector(".true_like").innerHTML) + 1)
                                 item.querySelector(".true_like").innerHTML = parseInt(item.querySelector(".true_like").innerHTML) + 1

                            } else if(data.success == -1) {
                                 item.querySelector(".like_ind").innerHTML = numberRedact(parseInt(item.querySelector(".true_like").innerHTML) - 1)
                                 item.querySelector(".true_like").innerHTML = parseInt(item.querySelector(".true_like").innerHTML) - 1
                                 item.querySelector(".like_i").style.color = "";
                            }
                        })
                     .catch(error => {
                          console.log(error)
                     })

             })
        })
                    document.querySelectorAll(".card_saveFunc").forEach(item => {
             fetch("http://127.0.0.1:8000/isSave/" + item.querySelector(".slug_save").innerHTML)
                .then(response => {return response.json()}).then(data => {
                   if(data.success == 1){item.querySelector("i").style.color = "orange"
                   }else if(data.success == -1){
                      item.querySelector("i").style.color = "";
                   } else if(data.success == false){
                      item.style.display = "none";
                   }
                }).catch(error => {console.log(error)})

             item.addEventListener("click",event => {
                  event.preventDefault()
                  item.querySelector("i").style.color = "orange";
                  fetch("http://127.0.0.1:8000/saveFilm/" + item.querySelector(".slug_save").innerHTML)
                    .then(response => {
                           return response.json()
                    })
                       .then(data => {
                            if(data.success == 1){

                            } else if(data.success == -1){
                                item.querySelector("i").style.color = "";
                            }
                       })
                    .catch(error => {
                        console.log(error)
                    })
             })
        })
                 })
              .catch(error => {console.log(error)})
        })


        document.querySelectorAll(".card_like").forEach(item => {
              fetch("http://127.0.0.1:8000/isLike/" + item.querySelector(".slug_like").innerHTML)
                .then(response => {return response.json()}).then(data => {
                   if(data.success == 1){
                        item.querySelector(".like_i").style.color = "red"
                   }else if(data.success == -1){
                      item.querySelector(".like_i").style.color = "";
                   } else if(data.success == false){
                      item.style.display = "none";
                   }
                }).catch(error => {console.log(error)})
             item.addEventListener("click",event => {
                  event.preventDefault()
                  item.querySelector(".like_i").style.color = "red";

                  fetch("http://127.0.0.1:8000/Like/" + item.querySelector(".slug_like").innerHTML)
                     .then(response => {
                         return response.json()
                     })
                        .then(data => {
                            if(data.success == true){
                                 item.querySelector(".like_ind").innerHTML = numberRedact(parseInt(item.querySelector(".true_like").innerHTML) + 1)
                                 item.querySelector(".true_like").innerHTML = parseInt(item.querySelector(".true_like").innerHTML) + 1

                            } else if(data.success == -1) {
                                 item.querySelector(".like_ind").innerHTML = numberRedact(parseInt(item.querySelector(".true_like").innerHTML) - 1)
                                 item.querySelector(".true_like").innerHTML = parseInt(item.querySelector(".true_like").innerHTML) - 1
                                 item.querySelector(".like_i").style.color = "";
                            }
                        })
                     .catch(error => {
                          console.log(error)
                     })

             })
        })
        document.querySelectorAll(".card_saveFunc").forEach(item => {
             fetch("http://127.0.0.1:8000/isSave/" + item.querySelector(".slug_save").innerHTML)
                .then(response => {return response.json()}).then(data => {
                   if(data.success == 1){item.querySelector("i").style.color = "orange"
                   }else if(data.success == -1){
                      item.querySelector("i").style.color = "";
                   } else if(data.success == false){
                      item.style.display = "none";
                   }
                }).catch(error => {console.log(error)})

             item.addEventListener("click",event => {
                  event.preventDefault()
                  item.querySelector("i").style.color = "orange";
                  fetch("http://127.0.0.1:8000/saveFilm/" + item.querySelector(".slug_save").innerHTML)
                    .then(response => {
                           return response.json()
                    })
                       .then(data => {
                            if(data.success == 1){

                            } else if(data.success == -1){
                                item.querySelector("i").style.color = "";
                            }
                       })
                    .catch(error => {
                        console.log(error)
                    })
             })
        })
   })

getDataFilms("http://127.0.0.1:8000/getZhanres")
   .then(data => {
        let array = JSON.parse(data)
        let cont_save = document.querySelector(".filter_zhanre")
        array.forEach(item => {
             let option = document.createElement("option")
             option.id = item.fields.slug
             option.innerHTML = item.fields.title
             cont_save.appendChild(option)
        })
   })

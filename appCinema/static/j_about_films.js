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

let btn_desc = document.querySelector(".nav_desc")
let btn_comm = document.querySelector(".nav_comment")
let box_desc = document.querySelector(".main_description")
let box_comm = document.querySelector(".main_comments")
let main_info = document.querySelector(".Main_info")

btn_desc.addEventListener("click",(event) => {
     box_desc.style.display = "flex";
     box_comm.style.display = "none";
     btn_desc.style.cssText += "border-bottom: 1px solid white;";
     btn_comm.style.cssText = "border: 0;";
     main_info.style.height = "900px";
})

btn_comm.addEventListener("click",(event) => {
     box_comm.style.display = "flex";
     box_desc.style.display = "none";
     btn_comm.style.cssText += "border-bottom: 1px solid white;";
     btn_desc.style.cssText = "border: 0;";
     main_info.style.height = "1000px";
})

let likes = document.querySelector(".true_likes")
let watches = document.querySelector(".ind_watch button span")
let comments = document.querySelector(".ind_comment button span")
likes.innerHTML = numberRedact(likes.innerHTML)
watches.innerHTML = numberRedact(watches.innerHTML)
comments.innerHTML = numberRedact(comments.innerHTML)



async function getDataComments(){
     try{
         let data = await fetch("http://127.0.0.1:8000/getDataComments/" + document.querySelector(".slug").innerHTML)
         return data.json()
     } catch {
         console.log("error in first check")
     }
}

getDataComments()
   .then(data => {
       let array = JSON.parse(data)
       let comments = document.querySelectorAll(".comm_card")
       let cards = document.querySelector(".cards")
       array.forEach(item => {
           let card = document.createElement("div")
           card.className = "comm_card"
              let info = document.createElement("div")
              info.className = "comm_info"
                  let ava = document.createElement("img")
                  if(item.fields.user_ava){
                     ava.src = "http://127.0.0.1:8000/media/" + item.fields.user_ava
                  } else {ava.src = "http://127.0.0.1:8000/media/default_user.png"}
                  info.appendChild(ava)
                  let info_text = document.createElement("div")
                  info_text.className = "comm_info_text"
                       let username = document.createElement("span")
                       username.className = "comm_user"
                       username.innerHTML = item.fields.username
                       info_text.appendChild(username)

                       let date = document.createElement("span")
                       date.className = "comm_date"

                       date.innerHTML = item.fields.date.slice(0,10)
                       info_text.appendChild(date)
                  info.appendChild(info_text)
              card.appendChild(info)
              let text = document.createElement("div")
              text.className = "comm_text"
                  let comment = document.createElement("span")
                  comment.innerHTML = item.fields.text_comment
                  text.appendChild(comment)
              card.appendChild(text)

              cards.prepend(card)
       })

            let commForm = document.getElementById("comm_form_id")
            commForm.addEventListener("submit",event => {
                   event.preventDefault()
                   let t = document.querySelector(".comm_inp")
                   if(t.value.length != 0){
                      let card = document.createElement("div")
                      card.className = "comm_card"
                      let info = document.createElement("div")
                      info.className = "comm_info"
                         let ava = document.createElement("img")
                         ava.src = "http://127.0.0.1:8000/media/" + document.querySelector(".user_ava").value
                         info.appendChild(ava)
                         let info_text = document.createElement("div")
                         info_text.className = "comm_info_text"
                              let username = document.createElement("span")
                              username.className = "comm_user"
                              username.innerHTML = document.querySelector(".user_login").value
                              info_text.appendChild(username)

                              let date = document.createElement("span")
                              date.className = "comm_date"

                              date.innerHTML = "только что"
                              info_text.appendChild(date)
                         info.appendChild(info_text)
                         card.appendChild(info)
                         let text = document.createElement("div")
                         text.className = "comm_text"
                         let comment = document.createElement("span")
                         comment.innerHTML = document.querySelector(".comm_inp").value
                         text.appendChild(comment)
                         card.appendChild(text)
                         cards.prepend(card)

                         let formData = new FormData(commForm)
                         fetch("http://127.0.0.1:8000/sendComment",{
                             method: "POST",
                             body: formData,
                             headers:{
                                  'X-Requested-With': 'XMLHttpRequest',
                                   'X-CSRFToken': document.querySelector('meta[name="csrf-token"]')
                             }
                         })
                            .then(response => {
                                return response.json()
                            })
                                .then(data => {
                                     if(data.success){
                                        document.querySelector(".comm_inp").value = "";
                                        document.querySelector(".ind_comment button span").innerHTML = numberRedact(parseInt(document.querySelector(".true_comments").innerHTML) + 1)
                                        document.querySelector(".true_comments").innerHTML = parseInt(document.querySelector(".true_comments").innerHTML) + 1
                                     } else {
                                        alert("Ошибки на сервере")
                                     }
                                })
                            .catch(error => {
                                console.log(error)
                            })

                   }

       })

   })

let profile = document.querySelector(".header_profile")
profile.addEventListener("click",event => {
    window.location.href = "http://127.0.0.1:8000/Profile"
})



let like_btn = document.getElementById("ind_like_btn")
let save_btn = document.getElementById("ind_save_btn")
let slug = document.querySelector(".slug")

fetch("http://127.0.0.1:8000/isLike/" + slug.innerHTML)
    .then(response => {
         return response.json()
    })
       .then(data => {
           if(data.success == 1){
                like_btn.querySelector("button i").style.color = "red";
           } else if(data.success == -1){
           } else if(data.success == false){
                like_btn.style.display = "none";
           }
       })
    .catch(error => console.log(error))

fetch("http://127.0.0.1:8000/isSave/" + slug.innerHTML)
    .then(response => {
         return response.json()
    })
       .then(data => {
           if(data.success == 1){
                save_btn.querySelector("button i").style.color = "orange";
           } else if(data.success == -1){
           } else if(data.success == false){
                save_btn.style.display = "none";
           }
       })
    .catch(error => console.log(error))

save_btn.addEventListener("click",event => {
     event.preventDefault()
     fetch("http://127.0.0.1:8000/saveFilm/" + slug.innerHTML)
         .then(res => {return res.json()})
             .then(data => {
                 if(data.success == 1){
                     save_btn.querySelector("button i").style.color = "orange";
                 } else if(data.success == -1){
                     save_btn.querySelector("button i").style.color = "black";
                 }
             })
         .catch(error => console.log(error))
})

like_btn.addEventListener("click",event => {
     event.preventDefault()
     like_btn.querySelector("button i").style.color = "red";
     fetch("http://127.0.0.1:8000/Like/" + slug.innerHTML)
         .then(res => {return res.json()})
            .then(data => {
                if(data.success == true){
                     let t_like = document.querySelector(".true_likes")
                     document.querySelector(".ind_like button span").innerHTML = numberRedact(parseInt(t_like.innerHTML) + 1)
                     t_like.innerHTML = parseInt(likes.innerHTML) + 1
                }else if(data.success == -1){
                     let t_like = document.querySelector(".true_likes")
                     document.querySelector(".ind_like button span").innerHTML = numberRedact(parseInt(t_like.innerHTML) - 1)
                     t_like.innerHTML = parseInt(likes.innerHTML) - 1

                }
            })
         .catch(error => {console.log(error)})
})


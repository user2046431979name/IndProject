const signForm = document.getElementById("signup_form")


signForm.addEventListener("submit",(event) => {
     event.preventDefault()
     let p = document.querySelector('.password')
     let c_p = document.querySelector('.confirm_password')
     let name = document.querySelector('.username')
     let l = document.querySelector('.login')
     let e = document.querySelector('.email')

     let formData = new FormData(signForm)
     if(p.value && c_p.value && name.value && l.value && e.value){
          if(p.value == c_p.value){
                const formData = new FormData(signForm);
                fetch("http://127.0.0.1:8000/account/signup_func/",{
                   method:'POST',
                   body:formData,
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
                            window.location.href = "http://127.0.0.1:8000/";
                        } else {
                            let span = document.querySelector(".forms span")
                            span.style.display = "block";
                            span.innerHTML = "Пользователь с таким именем уже существует";
                           signForm.style.cssText = "border: 1px solid red;";
                        }
                    })
                  .catch(error => {
                      console.log(error)
                  })

          } else {
                let span = document.querySelector(".forms span")
                span.style.display = "block";
                span.innerHTML = "Не прошли проверку пароля";
                signForm.style.cssText = "border: 1px solid red;";
          }
     } else {
          let span = document.querySelector(".forms span")
          span.style.display = "block";
          span.innerHTML = "Заполните все поля";
          signForm.style.cssText = "border: 1px solid red;";
     }
})


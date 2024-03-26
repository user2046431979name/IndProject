let loginForm = document.getElementById("login_form")

login_form.addEventListener("submit",(event) => {
      event.preventDefault()

       const formData = new FormData(login_form);
       fetch('http://127.0.0.1:8000/account/login_func/', {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': document.querySelector('meta[name="csrf-token"]')
        }
       })
        .then(response => {
           return response.json()
        })
           .then(data => {
                if(data.success){
                   window.location.href = "http://127.0.0.1:8000/"
                } else {
                   let span = document.querySelector(".forms span")
                   span.style.display = "block";
                   login_form.style.cssText = "border: 1px solid red;";
                   login_form.prepend(span)
                }
           })
        .catch(error => {
            console.log(error)
        })
})

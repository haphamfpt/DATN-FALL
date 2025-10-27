<script>
    window.onload = function (){

        const  form = document.querySelectorAll(".form-delete");
        
        form.forEach(form =>{
            form.addEventListener("submit",handleSubmit);
        })
       function handleSubmit(){
        event.preventDefault();
        console.log(this);
        const textUrl = this.dataset.url.trim();
        const id = this.querySelector(`input[name=id]`).value;
        const _token = document.querySelector("input[name=_token]").value;
        const url = '{{env('APP_URL')}}'+ "admin/" + textUrl  + "/delete";
        const element = this.parentElement.parentElement;
        console.log(element);
        const tbodyElement  = element.parentElement;
        const data = {
            id,_token
        }
  
        alertleDelete(data,element,tbodyElement,url);
       }
    }
</script>
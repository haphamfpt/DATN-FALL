
<script>
    $(document).ready(function(){

        $(".form-add").submit(function(){
            event.preventDefault();
            let _token = $("input[name='_token'").val()
            let data =  new FormData();
            const inputs = Array.from(this.querySelectorAll(".form-control"));
            inputs.forEach(function(input){
                    data.append(input.name,input.value.trim());
                   
            })
            data.append("_token",_token); 
           
            $.ajax({
            url : '{{route('admin.variant.store')}}',
            type: "POST",
            dataType: "json",
            data : data,
            contentType: false,
            processData: false,
            success : function(res){
                toastMessage(res[1],res[0],'{{route('admin.variant')}}')
                
            },
            error : function(error){
            let errors =  error.responseJSON.errors;
            document.querySelectorAll(".message-error").forEach(function(e){
                e.innerText = "";
            })
                Object.keys(errors).forEach(function(error){
                    const input = document.querySelector(`input[name="${error}"]`);
                    const select = document.querySelector(`select[name="${error}"]`)
                    if(input){
                    const message = input.parentElement.querySelector("p");
                        message.innerText = errors[error]

                    }
                    if(select){
                        const message = select.parentElement.querySelector(".message-error");

                        message.innerText = errors[error]
                       
                    }
                })
            }
        })
        })
    })
</script>
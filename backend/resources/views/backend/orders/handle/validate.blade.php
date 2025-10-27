
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    $(document).ready(function(){
        $("form").submit(function(){
            event.preventDefault();
            const uploadfile = document.querySelector('#upload-file');
            let _token = $("input[name='_token'").val()
            let data =  new FormData();
        const inputs = Array.from(this.querySelectorAll(".form-control"));
        inputs.shift();
        inputs.forEach(function(input){
            
                data.append(input.name,input.value);
        })
        data.append("_token",_token);
        data.append("avatar",uploadfile.files[0] || ""); 
        
        $.ajax({
            url : "{{route('admin.users.store')}}",
            type: "POST",
            data : data,
            contentType: false,
            processData: false,
            success : function(res){
            Swal.fire({
            title: 'Thêm mới thành công!',
            text: 'Bạn có muốn tiếp tục?',
            icon: 'success',
            confirmButtonText: 'Cool'
            }).then(function(res){
                window.location.href = '{{route("admin.users")}}'
            })
            
            },
            error : function(error){
            let errors =  error.responseJSON.errors;
                Object.keys(errors).forEach(function(error){
                    const input = document.querySelector(`input[name="${error}"]`);
                    const select = document.querySelector(`select[name="${error}"]`)
                    if(input){
                    const message = input.parentElement.querySelector("p");
                        message.innerText = errors[error]

                    }
                    if(select){
                        const message = select.parentElement.querySelector("p");
                        message.innerText = errors[error]
                    }
                })
            }
           })
        })
    })
</script>
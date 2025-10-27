
<script>
    $(document).ready(function(){

        $(".form-seo").submit(function(){
            event.preventDefault();
            let catelogues = [];
            let _token = $("input[name='_token'").val()
            let data =  new FormData();
            const inputs = Array.from(this.querySelectorAll(".form-control"));
            const catelogueElem = Array.from(this.querySelectorAll('input[name="post_catelogue_id"]'));
            inputs.forEach(function(input){
                  if(!(input.name == "variant_image" || input.name == "price_variant" || input.name =="discount_price_variant" || input.name == "stock_variant")){
                    data.append(input.name,input.value.trim());
                  }
            })
            catelogueElem.forEach(function(catelogue){
                if(catelogue.checked){
                    catelogues.push(Number(catelogue.value) )
                }
            })
            data.append("catelogues",catelogues);
            data.append("_token",_token); 
            const checkValidate = document.querySelector(".checkVariants").checked;
            if(checkValidate){
                const dataaVariant = [];
                const variants = document.querySelectorAll(".form-variant");
                
                if(variants && variants.length > 0){
                    variants.forEach(function(variant){
                        const variantData = {}
                        const inputsVariant = Array.from(variant.querySelectorAll("input"));
                        inputsVariant.forEach(function(input){
                            variantData[input.name] = input.value.trim();
                        })
                        dataaVariant.push(variantData)
                    })
                  
                    data.append("variants",JSON.stringify(dataaVariant));                   
                    
                }
                
            }
            const gallerys = document.querySelectorAll(".image-container")
            if(gallerys && gallerys.length > 0){
                const datagallery = [];
             
                
                gallerys.forEach(function(gallery){

                        const inputsgallery = gallery.querySelector("input");
                        console.log(inputsgallery.value);
                        
                        datagallery.push(inputsgallery.value)
                    })
                    data.append("gallery",datagallery)
                
            }
            $.ajax({
            url : '{{route('admin.product.store')}}',
            type: "POST",
            dataType: "json",
            data : data,
            contentType: false,
            processData: false,
            success : function(res){
                toastMessage(res[1],res[0],'{{route('admin.product')}}')
                
            },
            error : function(error){
             
                document.querySelectorAll(".message-error").forEach(item => {
                    item.innerText = "";
                })
            let errors =  error.responseJSON.errors;
              if(errors){
                Object.keys(errors).forEach(function(error){
                    const input = document.querySelector(`input[name="${error}"]`);
                    const select = document.querySelector(`select[name="${error}"]`)
                    const textarea = document.querySelector(`textarea[name="${error}"]`)
                   
                    if(input){
                    const message = input.parentElement.querySelector("span");
                    console.log(message,errors[error]);
                    
                        message.innerText = errors[error][0]

                    }
                    if(select){
                        const message = select.parentElement.querySelector(".message-error");

                        message.innerText = errors[error][0]
                       
                    }
                    if(textarea){
                        const message = textarea.parentElement.querySelector(".text-danger");
                        console.log(message);
                        message.innerText = errors[error][0]
                    }
                })
              
              }
              else {
                 const error_variant = error.responseJSON.error_variant;

                 document.querySelector(".error_variant").innerText = error_variant
                }
                
            }
        })
        })
    })
</script>
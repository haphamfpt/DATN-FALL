<script>
    $(document).ready(function(){
        var switcheryInputs = document.querySelectorAll(".js-switch");
            switcheryInputs.forEach(function(switchery){
              new Switchery(switchery, { size: 'small' });
                switchery.onchange = function(){
                    let _token = switchery.parentElement.querySelector("input[name=_token]").value;
                    let id = this.dataset.id;
                    let status = this.checked ? 1 : 0;
                    $.ajax({
                        type: "POST",
                        url : '{{ route("ajax.changeStatus")}}',
                        data : {
                            status,
                           id,
                           table : "posts",
                           _token
                        },
                        dataType: "json",
                        headers :{
                            "X-HTTP-Method-Override":  "PUT"
                        },
                        success : function(res){
                                console.log(res);
                        }
                    })
                }
            })

    })
</script>

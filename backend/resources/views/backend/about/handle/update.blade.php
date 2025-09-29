
<script>
$(document).ready(function(){
    $(".form-seo").submit(function(event) {
        event.preventDefault();

        let data = new FormData(this);
        data.append('_method', 'PUT');  // Thêm phương thức PUT vào FormData

        $.ajax({
            url: '{{ route('admin.about.update', $aboutPage->id) }}',
            type: "POST", // Laravel sẽ nhận POST và chuyển thành PUT
            dataType: "json",
            data: data,
            contentType: false,
            processData: false,
            success: function(res) {
                Swal.fire({
                    icon: 'success', // Biểu tượng thành công
                    title: 'Cập nhật thành công',
                    text: 'Bạn có muốn tiếp tục không?',
                    confirmButtonText: 'Tiếp tục', // Nút tiếp tục
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = res.redirect; // Điều hướng về trang danh sách
                    }
                });
            },
            error: function(error) {
                console.log(error); // Kiểm tra chi tiết lỗi trong console
                if (error.status === 422) {
                    let errors = error.responseJSON.errors;
                    Object.keys(errors).forEach(function(key) {
                        let errorMsg = errors[key][0];
                        $(`input[name="${key}"], textarea[name="${key}"], select[name="${key}"]`)
                            .next('.text-danger').html(errorMsg); 
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Đã có lỗi xảy ra',
                        text: 'Vui lòng thử lại sau',
                    });
                }
            }
        });
    });
});





</script>
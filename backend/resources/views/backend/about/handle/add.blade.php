<script>
   $(document).ready(function(){
    $(".form-seo").submit(function(event) {
        event.preventDefault();

        let data = new FormData(this);

        $.ajax({
            url: '{{ route('admin.about.store') }}', // URL thêm mới
            type: "POST",
            dataType: "json",
            data: data,
            contentType: false,
            processData: false,
            success: function(res) {
                Swal.fire({
                    icon: 'success', // Biểu tượng thành công
                    title: 'Thêm mới thành công',
                    text: 'Bạn có muốn tiếp tục không?', // Thông báo
                    confirmButtonText: 'Tiếp tục', // Nút tiếp tục
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = res.redirect; // Điều hướng về trang khác (nếu có)
                    }
                });
            },
            error: function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Đã có lỗi xảy ra',
                    text: 'Vui lòng thử lại',
                });
            }
        });
    });
});

</script>

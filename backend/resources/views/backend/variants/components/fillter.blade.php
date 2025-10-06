<div class="ibox-content_top">

    <form action="" method="GET" class="form_seach">
        <input type="text" class="form-control" name="keywords" @if(isset($_GET["keywords"])) value="{{$_GET['keywords']}}" @endif placeholder="Tìm kiếm theo tên">
        <button class="btn btn-outline-light seach"> <i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm </button>

    </form>
    <a href="{{route("admin.variant.create")}}" class="btn btn-success" style="font-size: 13px;"><i class="fa-solid fa-plus"></i> Thêm mới</a>
</div>
<form action="{{ route('admin.banner.store') }}" method="POST" class="form-add"
    style="background-color: white; padding:40px" enctype="multipart/form-data" novalidate>
    @csrf
    <div class="row">
        <div class="col-md-9">
            <div class="ibox-title">
                <h5>Thông tin chung</h5>
            </div>
            <div class="ibox-content">
                <div class="form-group">
                    <label>Tiêu đề</label>
                    <input type="text" placeholder="Tiêu đề danh mục" name="title" class="form-control">
                    <p  class=" text-danger message-error"></p>
                </div>
                <div class="form-group">
                    <label>Nội dung </label>
                    <textarea cols="50" rows="50" class="form-control" name="content" id="editor"></textarea>
                    <p  class=" text-danger message-error"></p>
                </div>

            </div>
        </div>
        <div class="col-md-3">
            <div class="ibox-content">
                <div class="form-group">
                    <label for="page">Trang</label>
                    <select name="page" id="" class="form-control">
                        <option value="" hidden>- Chọn trang -</option>
                        <option value="home">home</option>
                        <option value="product">product</option>
                        <option value="introduce">introduce</option>
                    </select>
                    <p class=" text-danger message-error"></p>
                </div>
                <div>
                    <button class="btn btn-success" type="submit">Thêm mới</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="avatar_title">
                    <h5>Chọn ảnh đại diện</h5>
                </div>
                <div class="ibox-content">
                    <div class="form-group">
                        <input type="text" name="image" class="form-control" id="avatar" class="avatar"
                            style="display: none;">
                        <div class="seo_avatar" id="seo_avatar">
                            <img class="" src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                alt="" style="height: 245px">
                        </div>
                        <p  class=" text-danger message-error"></p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</form>


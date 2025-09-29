<div class="ibox-content_top">
    <form action="" method="GET" class="form_seach">
        <div class="form-group d-flex align-items-center">
            <div>
                <label for="seach" class="me-2">Tìm kiếm theo tiêu đề:</label>
                <input type="text" class="form-control" name="seach_text" @if (isset($_GET['seach_text']))
                    value="{{ $_GET['seach_text'] }}" @endif placeholder="Tìm kiếm">
            </div>
            <div>
                <label for="date_order">Sắp xếp thứ tự:</label>
                <select name="date_order" class="form-control">
                    <option value="">Toàn bộ </option>
                    <option value="newest" {{ request('date_order') == 'newest' ? 'selected' : '' }}>Mới nhất</option>
                    <option value="oldest" {{ request('date_order') == 'oldest' ? 'selected' : '' }}>Cũ nhất</option>
                </select>
            </div>
            <div>
                <label for="status">Sắp xếp trạng thái :</label>
                <select name="status" class="form-control">
                    <option value="">Toàn bộ</option>
                    <option value="1" {{ request('status') == '1' ? 'selected' : '' }}>Hoạt động</option>
                    <option value="0" {{ request('status') == '0' ? 'selected' : '' }}>Không hoạt động</option>
                </select>
            </div>
            <div style="margin-top: 24px;">
                <button class="btn btn-primary seach"> <i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm </button>

            </div>
        </div>
    </form>

    <div class="total_record">

        <div style="margin-top: 15px;">
            <a href="{{ route('admin.banner.create') }}" class="btn btn-success"><i class="fa-solid fa-plus"></i>
                Thêm
                mới </a>

        </div>
    </div>
</div>

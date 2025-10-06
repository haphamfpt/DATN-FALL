<div class="ibox-content_top">
    <div class="form_seach" style="padding-bottom: 12px">
        <form method="GET" class="row">
            <div class="col-md-2 p-2" style="padding-right: 2px;!important">
                <input type="text" class="form-control" name="ma_don_hang" @if(isset($_GET["ma_don_hang"])) value="{{$_GET['ma_don_hang']}}" @endif placeholder="Tìm kiếm theo mã đơn hàng">
            </div>
            <div class="col-md-2 p-2" style="padding-right: 2px;!important">
                <select name="trang_thai" id="" class="form-control">
                    <option value="">Tìm kiếm theo trạng thái</option>
                    <option @if(isset($_GET["trang_thai"]) && $_GET["trang_thai"] == 1 ) selected @endif value="1">Chờ xử lý</option>
                    <option @if(isset($_GET["trang_thai"]) && $_GET["trang_thai"] == 2) selected @endif value="2">Đã xác nhận</option>
                    <option @if(isset($_GET["trang_thai"]) && $_GET["trang_thai"] == 3 ) selected @endif value="3">Đang xử lý</option>
                    <option @if(isset($_GET["trang_thai"]) && $_GET["trang_thai"] == 4) selected @endif value="4">Xác nhận giao hàng</option>
                    <option @if(isset($_GET["trang_thai"]) && $_GET["trang_thai"] == 5 ) selected @endif value="5">Đã giao hàng</option>
                    <option @if(isset($_GET["trang_thai"]) && $_GET["trang_thai"] == 6) selected @endif value="6">Hoàn tất</option>
                    <option @if(isset($_GET["trang_thai"]) && $_GET["trang_thai"] == 7 ) selected @endif value="7">Hủy</option>
                </select>
            </div>
            <div class="col-md-2 p-2">
                <div >
                    <input type="text" class="form-control" id="dateRangePicker" @if(isset($_GET["dates"])) value="{{$_GET['dates']}}" @endif name="dates" />
                </div>
            </div>
            <div class="col-md-4 d-flex align-items-center" style="padding-left: 12px;">
                <button type="submit" class="btn btn-primary seach"> 
                    <i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm
                </button>
            </div>
        </form>
    </div>
</div>

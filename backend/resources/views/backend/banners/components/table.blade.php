<table class="table table-bordered">
    <thead>
        <tr>
            <th>Tiêu đề</th>
            <th>Nội dung</th>
            <th>ảnh</th>
            <th>Trang</th>
            <th>Trạng thái</th>
            <th class="text-center">Hành động</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($data as $index => $item)
        <tr>

            <td>
                <p style="margin-bottom: 0;font-weight: 600;font-size: 14px;">{{ $item->title }}</p>
            </td>
            <th>
                <p style="margin-bottom: 0;font-weight: 600;font-size: 14px;">{{ $item->content ?: 'không có dữ liệu' }}</p>
            </th>
            <th>
                @if ( $item->image != null || $item->image!="")
                <p style="margin-bottom: 0;font-weight: 600;font-size: 14px;"><img src="{{$item->image}}" alt="" style="height: 150px"></p>
                @else
                <p style="margin-bottom: 0;font-weight: 600;font-size: 14px;">Không có ảnh</p>
                @endif
            </th>
            <th>
                <p style="margin-bottom: 0;font-weight: 600;font-size: 14px;">{{ $item->page ?: 'không có dữ liệu' }}</p>
            </th>
            <td class="text-center">
                <form name="form_status" action="">
                    @csrf
                    <input type="hidden" name="attribute" value="status">
                    <input type="hidden" name="table" value="{{$table}}">
                    <input type="checkbox" data-id="{{ $item->id }}" @if ($item['status']==1) checked @endif
                        class="js-switch js-switch_{{ $item->id }}" style="display: none;" data-switchery="true">
                </form>
            </td>
            <th class="text-center">
                <div style="display: flex; justify-content: center;column-gap: 5px;">
                    <a class="btn btn-sm btn-info" href="{{ route('admin.banner.edit', $item->id) }}" title="Chỉnh sửa"><i
                            class="fa fa-pencil"></i></a>
                    @if(auth()->user()->hasPermission('deleteBanner'))
                    <form action="" method="POST" data-url="banner" class="form-delete">
                        @method('DELETE')
                        @csrf
                        <input type="hidden" value="{{ $item->id }}" name="id">
                        <button class="btn btn-sm btn-danger" title="Xoá"><i class="fa fa-trash-o"></i></button>
                    </form>
                    @else
                        <a href="{{ route('permission.denied') }}" class="btn btn-warning center" title="Không có quyền">
                            <i class="fa fa-trash-o"></i>
                        </a> {{-- Hiển thị nút xóa nhưng không cho phép --}}
                    @endif
                </div>
            </th>
        </tr>
        @endforeach
    </tbody>
</table>

<table class="table table-bordered">
    <thead>
        <tr>
            <th>STT</th>
            <th>Gía trị thuộc tính</th>
            <th>Danh mục thuộc tính</th>
            <th class="text-center">Thao tác</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($data as $index => $item)
        <tr>
            <td>{{$index+1}}</td>
            <td>
                <p style="margin-bottom: 0;font-weight: 600;font-size: 14px;">{{ $item->name }}</p>
            </td>
            <th>
                <p style="margin-bottom: 0;font-weight: 600;font-size: 14px;">{{ $item->attributes->name }}</p>

            <td style="text-align: center">
                <div style="display: flex; justify-content: center;column-gap: 5px;">
                    <a class="btn btn-sm btn-info" data-toggle="tooltip" data-placement="top" title="Chỉnh sửa" href="{{route("admin.variant.edit",$item->id) }}"><i class="fa fa-pencil"></i> </a>
                    @if(auth()->user()->hasPermission('deleteAttributeValue'))

                    <form action="" method="POST" data-url="variant" class="form-delete">
                        @method("DELETE")
                        @csrf
                        <input type="hidden" value="{{$item->id}}" name="id">
                        <button class="btn btn-warning center" data-toggle="tooltip" data-placement="top" title="Xóa"><i class="fa fa-trash-o"></i>
                    </button>
                    </form>
                    @else
                        <a href="{{ route('permission.denied') }}" class="btn btn-warning center" title="Không có quyền">
                            <i class="fa fa-trash-o"></i>
                        </a> {{-- Hiển thị nút xóa nhưng không cho phép --}}
                        @endif
            </td>

        </tr>
        @endforeach
    </tbody>

</table>
<div class="total_record">
    <p>Tồn tại tổng <strong>{{$data->count()}}</strong> tại trang thứ <strong>{{$data->currentPage()}}</strong></p>
</div>

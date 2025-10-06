<table class="table table-striped table-bordered table-hover dataTables-example">
    <thead>
    <tr>
        <th>STT</th>
        <th>Tiêu đề</th>
        <th class="text-center">Nội dung</th>
        <th class="text-center">Trạng thái</th>
        <th class="text-center">Chỉnh sửa</th>
    </tr>
    </thead>
    <tbody>
        @foreach ($data as $index => $item)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $item->title }}</td>
                <td>{{ Str::limit(strip_tags($item->content), 100) }}</td>
                <td>
                    <span class="badge {{ $item->status == '1' ? 'badge-success' : 'badge-warning' }}">
                        {{ $item->status == '1' ? 'Hoạt động' : 'Không hoạt động' }}
                    </span>
                </td>
                <td style="text-align: center">
                    <a href="{{ route('admin.about.edit', $item["id"]) }}" class="btn btn-info">
                        <i class="fa fa-pencil"></i>
                    </a>
                    @if(auth()->user()->hasPermission('deleteAboutPage'))
                    <form action="{{ route('admin.about.delete', $item['id']) }}" method="POST" class="form-delete" style="display:inline-block;">
                        @method('DELETE')
                        @csrf
                        <button class="btn btn-warning center" type="submit">
                            <i class="fa fa-trash-o"></i>
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

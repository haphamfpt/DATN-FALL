@extends('backend.index')

@section('style')
    @include('backend.components.head')
    <link rel="stylesheet" href="{{ asset('backend/css/catelogue/custom.css') }}">
    <link rel="stylesheet" href="{{ asset('backend/css/customdropdown.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <style>
        .form-user_create .row .col-md-6 {
            flex: 0 0 auto !important;
            margin-bottom: 4px;
        }
        .form-user_create .row .col-md-6>p {
            margin: 0;
        }
    </style>
@endsection

@section('title')
    {{ $title }}
@endsection

@section('content')
    @include('backend.components.breadcrumb')
    <div class="wrapper wrapper-content">
        <form action="{{ route('admin.about.store') }}" enctype="multipart/form-data" method="POST" class="form-seo" name="form-seo">
            @csrf
            <div class="row">
                <div class="col-md-9">
                    <div class="ibox-title">
                        <h5>Thông tin chung</h5>
                    </div>
        
                    <input type="hidden" class="form-control" name="user_id" value="{{ Auth::id() }}">
        
                    <div class="ibox-content">
                        <div class="form-group">
                            <label>Tiêu đề </label>
                            <input type="text" placeholder="Tiêu đề danh mục" name="title" class="form-control">
                            <span class="text-danger"></span>
                        </div>
                        <div class="form-group">
                            <label>Nội dung</label>
                            <textarea cols="50" rows="50" class="form-control" name="content" id="editor"></textarea>
                            <span class="text-danger"></span>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="avatar_title">
                            <label>Ảnh</label>
                        </div>
                        <div class="ibox-content">
                            <div class="form-group">
                               <input type="text" name="image" class="form-control" id="avatar" class="avatar" style="display: none;">
                               <div class="seo_avatar" id="seo_avatar" >
                                <img class="" src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" alt="">
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
        
                <div class="col-md-3">
                    <div class="ibox-content">
                        <div class="form-group">
                            <label for="">Trạng thái</label>
                            <select name="status" id="" class="form-control">
                                <option value="0">Không hoạt động</option>
                                <option value="1">Hoạt động</option>
                            </select>
                        </div>
                        <div>
                            <button class="btn btn-success" type="submit">Thêm mới</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        
        
    </div>
@endsection

@push('scripts')
    @include('backend.components.scripts')
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="{{ asset('backend/js/framework/ckfinder.js') }}"></script>
    @include('backend.about.components.js.ckfinder')
    <script src="{{ asset('backend/js/framework/catelogue/select2.js') }}"></script>
    @include('backend.about.handle.add')
    <script src="{{ asset('backend/js/collapse.js') }}"></script>
@endpush

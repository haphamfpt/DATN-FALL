@extends("backend.index")
@section("style")
@include('backend.components.head')
<link rel="stylesheet" href="{{asset("backend/css/customize.css")}}">
@endsection
@section("title")

@endsection
@section("content")

<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox float-e-margins">



                <div class="ibox-content">


                    <div class="alert alert-danger">
                        Bạn không có quyền thực hiện thao tác này.
                    </div>
                    <a href="{{ url()->previous() }}" class="btn btn-secondary">
                        <i class="fa fa-arrow-left"></i> Quay lại
                    </a>
                </div>

            </div>

        </div>
    </div>
</div>

@endsection
@push("scripts")
@include('backend.components.scripts');

@include('backend.components.toastmsg');
<script src="{{asset("backend/js/framework/delete2.js")}}"></script>

@endpush

@extends("backend.index")
@section("style")
@include('backend.components.head')
@include('backend.user.components.customcss')
<link href="{{asset("backend/css/plugins/dataTables/datatables.min.css")}}" rel="stylesheet">
@endsection
@section("title")
{{$title}}
@endsection
@section("content")
@include("backend.components.breadcrumb")
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox float-e-margins">
                <!-- <div class="ibox-title">    
                <h5>{{$table_name}}</h5>
                <div class="ibox-tools">
                    <a class="collapse-link">
                        <i class="fa fa-chevron-up"></i>
                    </a>
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-wrench"></i>
                    </a>
                    <a class="close-link">
                        <i class="fa fa-times"></i>
                    </a>
                </div>
            </div> -->
                <div class="ibox-content">
                    <div class="table-responsive">
                        <div style="display: flex;justify-content: end;">
                            <a style=" margin-bottom: 20px ;font-size: 13px;" href="{{route("admin.product_catelogue.create")}}" class="btn btn-success"><i class="fa fa-plus"></i>Thêm mới </a>
                        </div>
                        @include("backend.product_catelogues.components.table")
                        <div style="display:flex;justify-content: space-between;align-items: center">
                            <div class="per_page">
                                <p>Tồn tại tổng <strong>{{$total}}</strong> tại trang thứ <strong>{{$pagination->currentPage()}}</strong></p>
                            </div>
                            <div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                                {{ $pagination->appends(request()->query())->links()}}
                            </div>
                        </div>
                    </div>
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
@include("backend.product_catelogues.handles.delete");
<script src="{{asset("backend/js/plugins/dataTables/datatables.min.js")}}"></script>
<script src="{{asset("backend/js/framework/table.js")}}"></script>
@endpush
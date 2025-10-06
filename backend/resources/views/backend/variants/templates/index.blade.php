@extends("backend.index")
@section("style")
@include('backend.components.head')
<link rel="stylesheet" href="{{asset("backend/css/customize.css")}}">
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
         
            <div class="ibox-title">
                <h5>{{$title}}</h5>
                <div class="ibox-tools">
                    <a class="collapse-link">
                        <i class="fa fa-chevron-up"></i>
                    </a>
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-wrench"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                        <li><a href="#">Config option 1</a>
                        </li>
                        <li><a href="#">Config option 2</a>
                        </li>
                    </ul>
                    <a class="close-link">
                        <i class="fa fa-times"></i>
                    </a>
                </div>
            </div>
            <div class="ibox-content">
                @include("backend.variants.components.fillter")  
                @include("backend.variants.components.table")  
                <div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                    {{  $data->appends(request()->query())->links()}}
                </div>
            </div>
        </div>
    
    </div>
    </div>
</div>

@endsection
@push("scripts")
@include('backend.components.scripts');
@include("backend.posts.handle.switchery")
@include('backend.components.toastmsg');
<script src="{{asset("backend/js/framework/delete2.js")}}"></script>
@include("backend.components.handles.delete");
@endpush

@extends("backend.index")
@section("style")
@include('backend.components.head')
<link rel="stylesheet" href="{{asset("backend/css/upload.css")}}">
<style>
    .form-user_create .row .col-md-6{
    flex: 0 0 auto !important;
    margin-bottom: 4px;

}
.form-user_create .row .col-md-6 > p{
    margin: 0;
}
.select2-selection {
    
}
.select2-selection__rendered {
    font-size: 14px !important;
    line-height: 1.42857143 !important;
    height: 34px !important;
}
.select2-container .select2-selection--single{
    height: 34px !important;
    padding: 6px 12px;
    color: #333;
}
.select2-container--default .select2-selection--single {
    border-radius: 0;
    border: 1px solid #e5e6e7;
}
.select2-container {
    width: 100% !important;
    
 
}
.select2-selection__rendered{
    padding: 0 !important;
}
</style>
@endsection
@section("title")
{{$title}} 
@endsection
@section("content")
@include("backend.components.breadcrumb")
<div class="wrapper wrapper-content animated fadeInRight">
    @include("backend.variants.components.formedit")
</div>
@endsection
@push("scripts")
@include('backend.components.scripts');
@include("backend.variants.handles.update");
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
<script>
   $(document).ready(function(){
    $(".attribute_id").select2({
       
    });
   })
</script>
@endpush
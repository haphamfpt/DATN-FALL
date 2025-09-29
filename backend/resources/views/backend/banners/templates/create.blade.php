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
    @include("backend.banners.components.formadd")
</div>
@endsection
@push("scripts")
<style>
    .form-user_create .row .col-md-6{
    flex: 0 0 auto !important;
    margin-bottom: 4px;

}
.form-user_create .row .col-md-6 > p{
    margin: 0;
}
</style>
<link rel="stylesheet" href="{{asset("backend/css/catelogue/custom.css")}}">
<link rel="stylesheet" href="{{asset("backend/css/customdropdown.css")}}">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
@include('backend.components.scripts');
<script src="{{asset("backend/js/framework/ckfinder.js")}}"></script>
@include("backend.posts.components.post.js.ckfinder")

@include("backend.banners.handles.add");
<script>
   $(document).ready(function(){
    $(".attribute_id").select2({

    });
   })
</script>
@endpush

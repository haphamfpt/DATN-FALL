@extends('backend.index')
@section('style')
    @include('backend.components.head')
    <link href="{{ asset('backend/css/plugins/dataTables/datatables.min.css') }}" rel="stylesheet">
    <style>
    
    .modal-title {
      font-size: 1.75rem;
      font-weight: bold;
    }
    
    .table-borderless th {
      width: 150px;
      font-weight: bold;
      font-size: 1.1rem;
    }
    
    .table td, .table th {
      font-size: 1.1rem;
    }
    
    .gallery img {
      width: 80px;
      height: 80px;
      margin-right: 8px;
    }
    
    .modal-footer .btn {
      font-size: 1.1rem;
    }
    
    </style>
@endsection
@section('content')
    @include('backend.components.breadcrumb')
    <div class="wrapper wrapper-content animated fadeInRight">
        <div class="row">
            <div class="col-lg-12">
                <div class="ibox float-e-margins">
                    <!-- <div class="ibox-title">
                    <h5>{{ $title }}</h5>
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
                </div> -->
                    <div class="ibox-content">
                        <div class="">
                            @include('backend.products.components.prductdetail')
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
    @include('backend.components.scripts');
    @include('backend.components.handles.switchery');
    @include('backend.components.toastmsg');
    <script src="{{ asset('backend/js/framework/delete2.js') }}"></script>
    <script src="{{ asset('backend/js/plugins/dataTables/datatables.min.js') }}"></script>
    <script src="{{ asset('backend/js/framework/table.js') }}"></script>
@endpush

@extends('backend.index')
@section("style")
@include('backend.components.head')
@include('backend.components.chartCss')


        .stat-box2 {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 22%;
            text-align: center;
        }

        .stat-box2 h2 {
            font-size: 30px;
            margin-bottom: 10px;
            color: #333;
        }

        .stat-box2 p {
            margin-bottom: 0;
            color: #888;
        }

        .stat-box2 .status {
            margin-top: 10px;
            font-size: 12px;
            font-weight: bold;
            color: green;
        }

        .stat-box2 .low-value {
            color: red;
        }

        .stat-box2 .medium-value {
            color: orange;
        }

        .charts-container {
            display: flex;
            justify-content: space-around;
            margin: 50px;
            flex-wrap: wrap;
        }
        .total-revenue {
            color: #27ae60;
            font-weight: bold;

        }
        .inactive{
            color: red
        }

        .chart2-container {
            width: 50%;
            text-align: center;
            margin-bottom: 20px;
        }
        #reviewRatingsDoughnutChart {
            width: 400px; /* Chiều rộng của biểu đồ đánh giá */
            text-align: center;
            margin-bottom: 20px;
        }

        #topRatedProductsChart {
            width: 700px; /* Chiều rộng của biểu đồ sản phẩm được đánh giá cao nhất */
            text-align: center;
            margin-bottom: 20px;
        }
        #promotionChart,
        #topCouponsChart {
            width: 100% !important;
            height: 300px !important;
        }
    </style>

    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css"></select>
@endsection
@section("title")
@endsection
@section("content")
<div class="row  border-bottom white-bg dashboard-header">

    <!-- Doanh thu -->
    <div class="col-md-8">
            <div class="col-md-12">
                <div class="stat-box">
                    <div >
                        <h3><span class="total-revenue"><i class="fas fa-dollar-sign"></i> Tổng Doanh Thu Cửa Hàng</span></h3>
                    </div>
                    <h3>100.000.000 VNĐ</h3>
                    <p>Tổng doanh thu</p>
                </div>

            </div>

        <div class="col-md-6">
                <div class="stat-box">
                    <span class="total-revenue"><h3>Tổng doanh thu hôm nay</h3></span>
                    <h3>100.000.000 VNĐ</h3>
                    <p>Doanh thu hôm nay</p>
                    <div class="status medium-value"></div>
                </div>
        </div>
        <div class="col-md-6">
            <div class="stat-box">
                <span class="new-orders"><h3>Đơn hàng mới</h3></span>
                <h3>10<a href="{{route('admin.orders')}}"><i class="fas fa-arrow-right"></i></a></h3>
                <div class="status">Cần xử lí</div>
            </div>
        </div>

    </div>

        <div class="col-md-4">
            <div class="stat-box">
                <div class="stat-title">
                    <div class="col-md-6">
                    <span class="canceled-orders"><i class="fas fa-box"></i> Trạng thái đơn hàng </span>
                    </div>
                    <div class="col-md-6">
                        <select class="order-filter form-control">
                            <option value="homnay">hôm nay</option>
                            <option value="7ngay">7 ngày qua</option>
                            <option value="thangnay" >tháng này</option>
                            <option value="thangtruoc">tháng trước</option>
                            <option value="365ngayqua" selected>365 ngày qua</option>
                        </select>
                    </div>
                </div>
                <div id="orderStatusChart" style="height: 231px;"></div>
            </div>
        </div>

        <div class="row">

        </div>



        <div class="row">

            <div class="col-md-8">
                <form id="filterForm">

                    @csrf
                    <!-- Form lọc theo ngày -->

                    <div class="filter-box col-md-3" style="width: 250px;margin-left: 11px">


                        <div class="form-group">
                            <label for="fromDate">Từ ngày:</label>
                            <input type="text" class="form-control datepicker" id="fromDate" name="fromDate"
                                placeholder="Chọn ngày bắt đầu" readonly>
                        </div>
                    </div>
                    <div class="col-md-3" style="width: 250px">
                        <div class="form-group">
                            <label for="toDate">Đến ngày:</label>
                            <input type="text" class="form-control datepicker" id="toDate" name="toDate"
                                placeholder="Chọn ngày kết thúc" readonly>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary" id='filter' style="margin-top:23px">Lọc</button>

                </form>
            </div>
            <div class="col-md-2">
                <label for="">Lọc doanh thu theo</label>
                <select class="dashboard-filter form-control">
                    <option value="7ngay">7 ngày qua</option>
                    <option value="thangnay" >tháng này</option>
                    <option value="thangtruoc">tháng trước</option>
                    <option value="365ngayqua" selected>365 ngày qua</option>
                </select>
            </div>
        </div>
        <div class="row" style="margin-top:50px">
            <!-- Biểu đồ Doanh thu theo tháng -->
            <div class="col-md-12 chart-container">
                <div class="stat-box">
                    <h4><i class="fas fa-chart-line"> </i> Biểu Đồ Doanh Thu</h4>
                    <div id="salesMonthlyChart" style="height: 500px;"></div>
                </div>
            </div>

        </div>

</div>

<div class="row  border-bottom white-bg dashboard-header">


            <div class="charts-container">
                <div class="chart2-container">
                    <canvas id="topSellingChart"width="450px"></canvas>
                </div>

                <!-- Biểu đồ mã giảm giá được sử dụng nhiều nhất -->
                <div class="chart2-container">
                    <canvas id="topCouponsChart"></canvas>
                </div>
            </div>
</div>
<div class="row border-bottom white-bg dashboard-header">
<h3>Thống Kê đánh giá</h3>
    <div class="charts-container">
        <!-- Biểu đồ tổng quan -->
        <div class="chart5-container">
            <canvas id="reviewRatingsDoughnutChart"></canvas>
        </div>

        <!-- Biểu đồ mã giảm giá được sử dụng nhiều nhất -->
        <div class="chart5-container">
            <canvas id="topRatedProductsChart" ></canvas>
        </div>
    </div>
</div>


<div class="small-chat-box fadeInRight animated">

    <div class="heading" draggable="true">
        <small class="chat-date pull-right">
            02.19.2015
        </small>
        Small chat
    </div>

    <div class="content">

        <div class="left">
            <div class="author-name">
                Monica Jackson <small class="chat-date">
                10:02 am
            </small>
            </div>
            <div class="chat-message active">
                Lorem Ipsum is simply dummy text input.
            </div>

        </div>
        <div class="right">
            <div class="author-name">
                Mick Smith
                <small class="chat-date">
                    11:24 am
                </small>
            </div>
            <div class="chat-message">
                Lorem Ipsum is simpl.
            </div>
        </div>
        <div class="left">
            <div class="author-name">
                Alice Novak
                <small class="chat-date">
                    08:45 pm
                </small>
            </div>
            <div class="chat-message active">
                Check this stock char.
            </div>
        </div>
        <div class="right">
            <div class="author-name">
                Anna Lamson
                <small class="chat-date">
                    11:24 am
                </small>
            </div>
            <div class="chat-message">
                The standard chunk of Lorem Ipsum
            </div>
        </div>
        <div class="left">
            <div class="author-name">
                Mick Lane
                <small class="chat-date">
                    08:45 pm
                </small>
            </div>
            <div class="chat-message active">
                I belive that. Lorem Ipsum is simply dummy text.
            </div>
        </div>


    </div>
    <div class="form-chat">
        <div class="input-group input-group-sm">
            <input type="text" class="form-control">
            <span class="input-group-btn"> <button
                class="btn btn-primary" type="button">Send
        </button> </span></div>
    </div>

</div>
<div id="small-chat">

    <span class="badge badge-warning pull-right">5</span>
    <a class="open-small-chat">
        <i class="fa fa-comments"></i>

    </a>
</div>
<div id="right-sidebar" class="animated">
    <div class="sidebar-container">

        <ul class="nav nav-tabs navs-3">

            <li class="active"><a data-toggle="tab" href="#tab-1">
                Notes
            </a></li>
            <li><a data-toggle="tab" href="#tab-2">
                Projects
            </a></li>
            <li class=""><a data-toggle="tab" href="#tab-3">
                <i class="fa fa-gear"></i>
            </a></li>
        </ul>

        <div class="tab-content">


            <div id="tab-1" class="tab-pane active">

                <div class="sidebar-title">
                    <h3> <i class="fa fa-comments-o"></i> Latest Notes</h3>
                    <small><i class="fa fa-tim"></i> You have 10 new message.</small>
                </div>

                <div>

                    <div class="sidebar-message">
                        <a href="#">
                            <div class="pull-left text-center">
                                <img alt="image" class="img-circle message-avatar" src="backend/img/a1.jpg">

                                <div class="m-t-xs">
                                    <i class="fa fa-star text-warning"></i>
                                    <i class="fa fa-star text-warning"></i>
                                </div>
                            </div>
                            <div class="media-body">

                                There are many variations of passages of Lorem Ipsum available.
                                <br>
                                <small class="text-muted">Today 4:21 pm</small>
                            </div>
                        </a>
                    </div>
                    <div class="sidebar-message">
                        <a href="#">
                            <div class="pull-left text-center">
                                <img alt="image" class="img-circle message-avatar" src="backend/img/a2.jpg">
                            </div>
                            <div class="media-body">
                                The point of using Lorem Ipsum is that it has a more-or-less normal.
                                <br>
                                <small class="text-muted">Yesterday 2:45 pm</small>
                            </div>
                        </a>
                    </div>
                    <div class="sidebar-message">
                        <a href="#">
                            <div class="pull-left text-center">
                                <img alt="image" class="img-circle message-avatar" src="backend/img/a3.jpg">

                                <div class="m-t-xs">
                                    <i class="fa fa-star text-warning"></i>
                                    <i class="fa fa-star text-warning"></i>
                                    <i class="fa fa-star text-warning"></i>
                                </div>
                            </div>
                            <div class="media-body">
                                Mevolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                <br>
                                <small class="text-muted">Yesterday 1:10 pm</small>
                            </div>
                        </a>
                    </div>
                    <div class="sidebar-message">
                        <a href="#">
                            <div class="pull-left text-center">
                                <img alt="image" class="img-circle message-avatar" src="backend/img/a4.jpg">
                            </div>

                            <div class="media-body">
                                Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the
                                <br>
                                <small class="text-muted">Monday 8:37 pm</small>
                            </div>
                        </a>
                    </div>
                    <div class="sidebar-message">
                        <a href="#">
                            <div class="pull-left text-center">
                                <img alt="image" class="img-circle message-avatar" src="backend/img/a8.jpg">
                            </div>
                            <div class="media-body">

                                All the Lorem Ipsum generators on the Internet tend to repeat.
                                <br>
                                <small class="text-muted">Today 4:21 pm</small>
                            </div>
                        </a>
                    </div>
                    <div class="sidebar-message">
                        <a href="#">
                            <div class="pull-left text-center">
                                <img alt="image" class="img-circle message-avatar" src="backend/img/a7.jpg">
                            </div>
                            <div class="media-body">
                                Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                <br>
                                <small class="text-muted">Yesterday 2:45 pm</small>
                            </div>
                        </a>
                    </div>
                    <div class="sidebar-message">
                        <a href="#">
                            <div class="pull-left text-center">
                                <img alt="image" class="img-circle message-avatar" src="backend/img/a3.jpg">

                                <div class="m-t-xs">
                                    <i class="fa fa-star text-warning"></i>
                                    <i class="fa fa-star text-warning"></i>
                                    <i class="fa fa-star text-warning"></i>
                                </div>
                            </div>
                            <div class="media-body">
                                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below.
                                <br>
                                <small class="text-muted">Yesterday 1:10 pm</small>
                            </div>
                        </a>
                    </div>
                    <div class="sidebar-message">
                        <a href="#">
                            <div class="pull-left text-center">
                                <img alt="image" class="img-circle message-avatar" src="backend/img/a4.jpg">
                            </div>
                            <div class="media-body">
                                Uncover many web sites still in their infancy. Various versions have.
                                <br>
                                <small class="text-muted">Monday 8:37 pm</small>
                            </div>
                        </a>
                    </div>
                </div>

            </div>

            <div id="tab-2" class="tab-pane">

                <div class="sidebar-title">
                    <h3> <i class="fa fa-cube"></i> Latest projects</h3>
                    <small><i class="fa fa-tim"></i> You have 14 projects. 10 not completed.</small>
                </div>

                <ul class="sidebar-list">
                    <li>
                        <a href="#">
                            <div class="small pull-right m-t-xs">9 hours ago</div>
                            <h4>Business valuation</h4>
                            It is a long established fact that a reader will be distracted.

                            <div class="small">Completion with: 22%</div>
                            <div class="progress progress-mini">
                                <div style="width: 22%;" class="progress-bar progress-bar-warning"></div>
                            </div>
                            <div class="small text-muted m-t-xs">Project end: 4:00 pm - 12.06.2014</div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div class="small pull-right m-t-xs">9 hours ago</div>
                            <h4>Contract with Company </h4>
                            Many desktop publishing packages and web page editors.

                            <div class="small">Completion with: 48%</div>
                            <div class="progress progress-mini">
                                <div style="width: 48%;" class="progress-bar"></div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div class="small pull-right m-t-xs">9 hours ago</div>
                            <h4>Meeting</h4>
                            By the readable content of a page when looking at its layout.

                            <div class="small">Completion with: 14%</div>
                            <div class="progress progress-mini">
                                <div style="width: 14%;" class="progress-bar progress-bar-info"></div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span class="label label-primary pull-right">NEW</span>
                            <h4>The generated</h4>
                            There are many variations of passages of Lorem Ipsum available.
                            <div class="small">Completion with: 22%</div>
                            <div class="small text-muted m-t-xs">Project end: 4:00 pm - 12.06.2014</div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div class="small pull-right m-t-xs">9 hours ago</div>
                            <h4>Business valuation</h4>
                            It is a long established fact that a reader will be distracted.

                            <div class="small">Completion with: 22%</div>
                            <div class="progress progress-mini">
                                <div style="width: 22%;" class="progress-bar progress-bar-warning"></div>
                            </div>
                            <div class="small text-muted m-t-xs">Project end: 4:00 pm - 12.06.2014</div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div class="small pull-right m-t-xs">9 hours ago</div>
                            <h4>Contract with Company </h4>
                            Many desktop publishing packages and web page editors.

                            <div class="small">Completion with: 48%</div>
                            <div class="progress progress-mini">
                                <div style="width: 48%;" class="progress-bar"></div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div class="small pull-right m-t-xs">9 hours ago</div>
                            <h4>Meeting</h4>
                            By the readable content of a page when looking at its layout.

                            <div class="small">Completion with: 14%</div>
                            <div class="progress progress-mini">
                                <div style="width: 14%;" class="progress-bar progress-bar-info"></div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span class="label label-primary pull-right">NEW</span>
                            <h4>The generated</h4>
                            <!--<div class="small pull-right m-t-xs">9 hours ago</div>-->
                            There are many variations of passages of Lorem Ipsum available.
                            <div class="small">Completion with: 22%</div>
                            <div class="small text-muted m-t-xs">Project end: 4:00 pm - 12.06.2014</div>
                        </a>
                    </li>

                </ul>

            </div>

            <div id="tab-3" class="tab-pane">

                <div class="sidebar-title">
                    <h3><i class="fa fa-gears"></i> Settings</h3>
                    <small><i class="fa fa-tim"></i> You have 14 projects. 10 not completed.</small>
                </div>

                <div class="setings-item">
            <span>
                Show notifications
            </span>
                    <div class="switch">
                        <div class="onoffswitch">
                            <input type="checkbox" name="collapsemenu" class="onoffswitch-checkbox" id="example">
                            <label class="onoffswitch-label" for="example">
                                <span class="onoffswitch-inner"></span>
                                <span class="onoffswitch-switch"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="setings-item">
            <span>
                Disable Chat
            </span>
                    <div class="switch">
                        <div class="onoffswitch">
                            <input type="checkbox" name="collapsemenu" checked class="onoffswitch-checkbox" id="example2">
                            <label class="onoffswitch-label" for="example2">
                                <span class="onoffswitch-inner"></span>
                                <span class="onoffswitch-switch"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="setings-item">
            <span>
                Enable history
            </span>
                    <div class="switch">
                        <div class="onoffswitch">
                            <input type="checkbox" name="collapsemenu" class="onoffswitch-checkbox" id="example3">
                            <label class="onoffswitch-label" for="example3">
                                <span class="onoffswitch-inner"></span>
                                <span class="onoffswitch-switch"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="setings-item">
            <span>
                Show charts
            </span>
                    <div class="switch">
                        <div class="onoffswitch">
                            <input type="checkbox" name="collapsemenu" class="onoffswitch-checkbox" id="example4">
                            <label class="onoffswitch-label" for="example4">
                                <span class="onoffswitch-inner"></span>
                                <span class="onoffswitch-switch"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="setings-item">
            <span>
                Offline users
            </span>
                    <div class="switch">
                        <div class="onoffswitch">
                            <input type="checkbox" checked name="collapsemenu" class="onoffswitch-checkbox" id="example5">
                            <label class="onoffswitch-label" for="example5">
                                <span class="onoffswitch-inner"></span>
                                <span class="onoffswitch-switch"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="setings-item">
            <span>
                Global search
            </span>
                    <div class="switch">
                        <div class="onoffswitch">
                            <input type="checkbox" checked name="collapsemenu" class="onoffswitch-checkbox" id="example6">
                            <label class="onoffswitch-label" for="example6">
                                <span class="onoffswitch-inner"></span>
                                <span class="onoffswitch-switch"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="setings-item">
            <span>
                Update everyday
            </span>
                    <div class="switch">
                        <div class="onoffswitch">
                            <input type="checkbox" name="collapsemenu" class="onoffswitch-checkbox" id="example7">
                            <label class="onoffswitch-label" for="example7">
                                <span class="onoffswitch-inner"></span>
                                <span class="onoffswitch-switch"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="sidebar-content">
                    <h4>Settings</h4>
                    <div class="small">
                        I belive that. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        And typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        Over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </div>
                </div>

            </div>
        </div>

    </div>



</div>
    <!-- Thêm Chart.js và jQuery để vẽ biểu đồ -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<!-- Biểu đồ doanh thu -->
<script>
            $(document).ready(function() {

                var chartData = @json($chartData); // Lấy dữ liệu từ controller

                var chart = new Morris.Line({
                    element: 'salesMonthlyChart',
                    data: chartData, // Dữ liệu từ server
                    xkey: 'created_at',
                    ykeys: ['final_amount'],
                    labels: ['Doanh thu'],

                    // Tùy chỉnh giao diện
                    lineColors: ['#0b62a4'], // Màu đường
                    lineWidth: 2, // Độ rộng đường
                    pointSize: 4, // Kích thước điểm
                    pointFillColors: ['#ffffff'], // Màu điểm
                    pointStrokeColors: ['#0b62a4'], // Màu viền điểm
                    gridTextColor: '#333', // Màu chữ lưới
                    gridTextSize: 12, // Kích thước chữ lưới
                    hideHover: 'auto', // Tự động ẩn tooltip khi không hover

                    // Tùy chỉnh hiển thị trục Y
                    yLabelFormat: function(y) {
                        return y.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        });
                    },

                    // Tùy chỉnh trục X
                    xLabelAngle: 0, // Xoay trục X để dễ đọc
                    resize: true, // Tự động điều chỉnh kích thước khi cửa sổ thay đổi

                    // Thêm tooltip format
                    hoverCallback: function(index, options, content, row) {
                        return `<div style="padding: 8px;"><strong>Ngày:</strong> ${row.created_at}<br><strong>Doanh thu:</strong> ${row.final_amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}</div>`;
                    }
                });


                $('.datepicker').datepicker({
                    format: 'yyyy-mm-dd',
                    autoclose: true,
                    todayHighlight: true,
                    endDate: new Date(),
                    clearBtn: true,
                    todayBtn: "linked",
                    language: "vi",
                });
                // Thiết lập Datepicker cho từ ngày
                $('#fromDate').datepicker({
                    format: 'yyyy-mm-dd',
                    autoclose: true,
                    todayHighlight: true,
                    endDate: new Date(),
                    clearBtn: true,
                    todayBtn: "linked",
                    language: "vi"
                }).on('changeDate', function(e) {
                    // Khi người dùng chọn từ ngày, thiết lập ngày bắt đầu cho đến ngày
                    $('#toDate').datepicker('setStartDate', e.date);
                });

                // Thiết lập Datepicker cho đến ngày
                $('#toDate').datepicker({
                    format: 'yyyy-mm-dd',
                    autoclose: true,
                    todayHighlight: true,
                    endDate: new Date(),
                    clearBtn: true,
                    todayBtn: "linked",
                    language: "vi"
                }).on('changeDate', function(e) {
                    // Khi người dùng chọn đến ngày, thiết lập ngày kết thúc cho từ ngày
                    $('#fromDate').datepicker('setEndDate', e.date);
                });
                let previousValue = $('.dashboard-filter').val();

                $('.dashboard-filter').on('change', function(event) {
                    event.preventDefault();

                    var dashboard_value = $(this).val();
                    var _token = $('meta[name="csrf-token"]').attr('content');
                    // Xóa dữ liệu trong form khi chọn select
                    $('#filterForm')[0].reset();
                    $.ajax({
                        type: "POST",
                        url: '{{ route('orders.select') }}',
                        dataType: "json",
                        data: {
                            dashboard_value: dashboard_value,
                            _token: _token
                        },
                        headers: {
                            "X-HTTP-Method-Override": "GET"
                        },
                        success: function(response) {


                            chart.setData(response);
                            previousValue = dashboard_value;

                        },
                        error: function(xhr, status, error) {
                            Swal.fire({
                                icon: 'info',
                                title: 'Không có doanh thu',
                                text: 'Không có doanh thu cho khoảng thời gian này.',
                                confirmButtonText: 'Đóng',
                                customClass: {
                                    confirmButton: 'btn btn-primary'
                                },
                                buttonsStyling: false
                            });
                            // Đặt lại select khi submit form
                            $('.dashboard-filter').val(previousValue);
                            console.error(xhr.responseText);
                        }
                    });
                });

                $('#filterForm').on('submit', function(event) {
                    event.preventDefault();




                    var fromDate = $('#fromDate').val();
                    var toDate = $('#toDate').val();
                    var _token = $('meta[name="csrf-token"]').attr('content');
                    // Kiểm tra nếu ngày bắt đầu lớn hơn ngày kết thúc
                    if (new Date(fromDate) > new Date(toDate)) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi!',
                            text: 'Ngày kết thúc không thể nhỏ hơn ngày bắt đầu.',
                        });
                        return; // Ngừng thực hiện nếu không hợp lệ
                    }
                    // Kiểm tra xem người dùng đã chọn đủ ngày chưa
                    if (!fromDate) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi!',
                            text: 'Vui lòng chọn ngày bắt đầu.',
                        });
                        return; // Ngừng thực hiện nếu không đủ dữ liệu
                    }

                    if (!toDate) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi!',
                            text: 'Vui lòng chọn ngày kết thúc.',
                        });
                        return; // Ngừng thực hiện nếu không đủ dữ liệu
                    }
                    // Đặt lại select khi submit form
                    $('.dashboard-filter').val('');
                    $.ajax({
                        type: "POST",
                        url: '{{ route('orders.filter') }}',
                        dataType: "json",
                        data: {
                            fromDate: fromDate,
                            toDate: toDate,
                            _token: _token
                        },
                        headers: {
                            "X-HTTP-Method-Override": "GET"
                        },
                        success: function(response) {


                            chart.setData(response);
                            console.log(chart);

                        },
                        error: function(xhr, status, error) {
                            Swal.fire({
                                icon: 'info',
                                title: 'Không có doanh thu',
                                text: 'Không có doanh thu cho khoảng thời gian này.',
                                confirmButtonText: 'Đóng',
                                customClass: {
                                    confirmButton: 'btn btn-primary'
                                },
                                buttonsStyling: false
                            });
                            // Xóa dữ liệu trong form khi chọn select
                            $('#filterForm')[0].reset();
                            console.error(xhr.responseText);
                        }
                    });
                });
                const orderStatusData = @json($orderStatusData);

                chartStatus=Morris.Donut({
                    element: 'orderStatusChart',
                    data: orderStatusData,
                    colors: ["#ffcc00", "#3366ff", "#33cc33", "#8bc34a", "#00bcd4", "#4caf50", "#ff4444", "#ff6384"],
                    resize: true,
                    formatter: function(value, data) {
                        return value + " đơn hàng";
                    }
                });

                let previousStatusValue = $('.order-filter').val();

                $('.order-filter').on('change', function(event) {
                    event.preventDefault();

                    var order_value = $(this).val();
                    var _token = $('meta[name="csrf-token"]').attr('content');
                    // Xóa dữ liệu trong form khi chọn select
                    $('#filterForm')[0].reset();
                    $.ajax({
                        type: "POST",
                        url: '{{ route('orders_status.select') }}',
                        dataType: "json",
                        data: {
                            order_value: order_value,
                            _token: _token
                        },
                        headers: {
                            "X-HTTP-Method-Override": "GET"
                        },
                        success: function(response) {

                            console.log(response);
                            chartStatus.setData(response);

                            previousStatusValue = order_value;

                        },
                        error: function(xhr, status, error) {
                            Swal.fire({
                                icon: 'info',
                                title: 'Không có đơn hàng',
                                text: 'Không có đơn hàng cho khoảng thời gian này.',
                                confirmButtonText: 'Đóng',
                                customClass: {
                                    confirmButton: 'btn btn-primary'
                                },
                                buttonsStyling: false
                            });
                            // Đặt lại select khi submit form
                            $('.order-filter').val(previousStatusValue);
                            console.error(xhr.responseText);
                        }
                    });
                });
            });
</script>


<!-- biểu đồ tròn đánh giá sao -->
<script>
    var ratingLabels = {!! json_encode($ratingLabels) !!}; // 1, 2, 3, 4, 5 sao
    var ratingCounts = {!! json_encode($ratingCounts) !!}; // Số lượng đánh giá theo từng mốc sao

    var ctx = document.getElementById('reviewRatingsDoughnutChart').getContext('2d');
    var reviewRatingsDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['1 sao', '2 sao', '3 sao', '4 sao', '5 sao'],
            datasets: [{
                label: 'Lượt đánh giá',
                data: ratingCounts,
                backgroundColor: [
                    'rgba(0, 204, 204, 0.8)',
                    'rgba(0, 204, 153, 0.8)',
                    'rgba(51, 153, 153, 0.8)',
                    'rgba(51, 204, 0, 0.8)',
                    'rgba(51, 153, 255, 0.8)'
                ],
                borderColor: [
                    'rgba(0, 204, 204, 1)',
                    'rgba(0, 204, 153, 1)',
                    'rgba(51, 153, 153, 1)',
                    'rgba(51, 204, 0, 1)',
                    'rgba(51, 153, 255, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Thống kê đánh giá theo sao'
                }
            }
        }
    });
</script>

<!-- Top 10 Sản phẩm có đánh giá trung bình sao cao nhất -->
<script>
    var productNames = {!! json_encode($topRatedProducts->pluck('product.name')) !!}; // Lấy tên sản phẩm
    var averageRatings = {!! json_encode($topRatedProducts->pluck('average_rating')) !!}; // Lấy đánh giá trung bình

    var ctx = document.getElementById('topRatedProductsChart').getContext('2d');
    var topRatedProductsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [{
                label: 'Trung bình sao',
                data: averageRatings,
                backgroundColor: 'rgba(255, 159, 64, 1)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Top 10 Sản phẩm có đánh giá trung bình sao cao nhất'
                }
            }
        }
    });
</script>

<!-- Biểu đồ mã giảm giá được sử dụng nhiều nhất -->
<script>
    // Dữ liệu mã giảm giá được sử dụng nhiều nhất
    const topCoupons = @json($topCoupons);
    const couponCodes = topCoupons.map(coupon => coupon.code);
    const usageCounts = topCoupons.map(coupon => coupon.used_count);

    const ctx2 = document.getElementById('topCouponsChart').getContext('2d');
    const topCouponsChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: couponCodes,
            datasets: [{
                label: 'Số lần sử dụng',
                data: usageCounts,
                backgroundColor: '#36a2eb',
                borderColor: '#36a2eb',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                },
                title: {
                    display: true,
                    text: 'Mã Giảm Giá Được Sử Dụng Nhiều Nhất'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
</script>
<script>
    const topSellingData = @json($topSellingChartData);
    const topSellingLabels = topSellingData.map(item => item.name);
    const topSellingValues = topSellingData.map(item => item.total_sold);

    const ctxSelling = document.getElementById('topSellingChart').getContext('2d');
    new Chart(ctxSelling, {
        type: 'bar',
        data: {
            labels: topSellingLabels,
            datasets: [{
                label: 'Số lượng bán',
                data: topSellingValues,
                backgroundColor: 'rgba(0, 102, 204, 0.8)', // Màu xanh đậm
                borderColor: 'rgba(0, 102, 204, 1)', // Màu viền xanh đậm
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Top 10 Sản phẩm bán chạy nhất'
                }
            }
        }
    });
</script>
@endsection
@push('scripts')
    @include('backend.components.scripts')
    {{-- @include("backend.components.chartJs") --}}
@endpush

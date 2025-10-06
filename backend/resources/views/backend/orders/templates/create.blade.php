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

        .collapse-row.open {
            height: auto;
        }

        .attribute_collape {
            height: 0;
            /* Đặt chiều cao ban đầu bằng 0 */
            overflow: hidden;
            /* Ẩn nội dung bị vượt quá khi thu gọn */
            padding-top: 0;
            transition: height 0.3s ease, padding-top 0.3s ease;
            /* Hiệu ứng chuyển động mượt */
            background-color: #f8f9fa;
            /* Màu nền nhẹ nhàng */
            border: 1px solid #dee2e6;
            /* Viền nhẹ để tạo khung */
            border-radius: 5px;
            /* Bo tròn các góc */
        }

        /* Hiệu ứng khi nội dung bên trong mở rộng */
        .attribute_collape-content {
            padding: 10px 20px;
            /* Khoảng đệm trong nội dung */
            transition: opacity 0.3s ease-in;
            /* Tăng dần độ mờ */
            opacity: 0;
        }

        .attribute_collape[style*="height:"] .attribute_collape-content {
            opacity: 1;
            /* Hiện nội dung khi `height` có giá trị */
        }

        .button-collapse {
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            font-weight: bold;
            padding: 8px 16px;
            background-color: #343a40;
            /* Màu nền tối cho thanh tiêu đề */
            color: white;
            border-radius: 5px 5px 0 0;
            /* Bo tròn chỉ phần trên của thanh */
            transition: background-color 0.3s ease, color 0.3s ease;
            /* Hiệu ứng chuyển màu */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            /* Hiệu ứng đổ bóng nhẹ */
        }

        .button-collapse:hover {
            background-color: #495057;
            /* Màu nền khi hover */
            color: #f1f1f1;
            /* Màu chữ khi hover */
        }

        /* Đặt kiểu cho icon mũi tên nếu bạn có sử dụng */
        .button-collapse i {
            margin-left: auto;
            /* Đẩy icon mũi tên sang bên phải */
            transition: transform 0.3s ease;
            /* Thêm hiệu ứng xoay */
        }

        /* Xoay icon khi mở rộng */
        .button-collapse[aria-expanded="true"] i {
            transform: rotate(180deg);
            /* Xoay icon 180 độ khi mở */
        }

        .image-container {
            position: relative;
            display: inline-block;
            margin: 5px;
        }

        .variant_image-show {
            width: 200px;
            height: 200px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            /* Tạo hiệu ứng đổ bóng cho ảnh */
        }

        .remove-btn {
            position: absolute;
            top: -5px;
            right: -5px;
            width: 20px;
            height: 20px;
            background-color: #ffcccc;
            /* Màu nền nhạt hơn cho nút xóa */
            color: #cc0000;
            /* Màu đỏ nhạt cho chữ */
            font-size: 14px;
            font-weight: bold;
            border-radius: 50%;
            /* Tạo hình tròn */
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.2s ease, transform 0.2s ease;
            /* Hiệu ứng khi hover */
        }

        .remove-btn:hover {
            background-color: #ff9999;
            /* Đổi màu nhạt hơn khi hover */
            transform: scale(1.1);
            /* Tăng kích thước nhẹ khi hover */
        }

        .image-gallery {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
        }

        .image-container {
            position: relative;
            width: 200px;
            height: 200px;
        }

        .variant_image-show {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .remove-btn {
            position: absolute;
            top: -5px;
            right: -5px;
            width: 20px;
            height: 20px;
            background-color: #ffcccc;
            color: #cc0000;
            font-size: 14px;
            font-weight: bold;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .remove-btn:hover {
            background-color: #ff9999;
            transform: scale(1.1);
        }

        /* Nút dấu "+" */
        .add-image-btn {
            width: 200px;
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 60px;
            font-weight: bold;
            color: #999;
            background-color: #f9f9f9;
            border: 2px dashed #ccc;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        .add-image-btn:hover {
            background-color: #e6e6e6;
            color: #666;
            transform: scale(1.05);
        }

        .seo_avatar {
            width: 200px;
            height: 200px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #ddd;
            /* Đường viền màu xám nhạt */
            border-radius: 5px;
            background-color: #f9f9f9;
            /* Nền xám nhạt */
            overflow: hidden;
            cursor: pointer;
            transition: border-color 0.3s ease;
        }

        .seo_avatar:hover {
            border-color: #aaa;
            /* Đổi màu viền khi hover */
        }

        /* Tùy chỉnh hình ảnh bên trong */
        .seo_avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
            transition: transform 0.3s ease;
            /* Hiệu ứng phóng to nhẹ khi hover */
        }

        .seo_avatar:hover img {
            transform: scale(1.05);
            /* Phóng to nhẹ khi hover */
        }

        /* Tùy chỉnh nút xóa (dấu x) */
        .remove-avatar-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 24px;
            height: 24px;
            background-color: rgba(255, 0, 0, 0.8);
            /* Màu đỏ nhạt với độ trong suốt */
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .seo_avatar:hover .remove-avatar-btn {
            opacity: 1;
        }

        .remove-avatar-btn:hover {
            transform: scale(1.1);
            background-color: rgba(255, 0, 0, 0.9);
            /* Màu đậm hơn khi hover */
        }
    </style>
@endsection
@section('title')
    {{ $title }}
@endsection
@section('content')
    @include('backend.components.breadcrumb')
    <div class="wrapper wrapper-content">
        <form action="" enctype="multipart/form-data" method="POST" class="form-seo" name="form-seo">
            @csrf
            <div class="row">
                <div class="col-md-9">
                    <div class="ibox-title">
                        <h5>Thông tin chung</h5>
                    </div>
                    <input type="text" class="form-control" style="display: none" name="user_id"
                        value="{{ Auth::id() }}">
                    <div class="ibox-content">
                        <div class="form-group">
                            <label>Tên sản phẩm</label>
                            <input type="text" placeholder="Tên sản phẩm" name="name" class="form-control">
                            <span class="text-danger"></span>
                        </div>
                        <div class="form-group">
                            <label>Mô tả sản phẩm</label>
                            <textarea cols="50" rows="50" class="form-control" name="detailed_description" id="editor"></textarea>
                            <span style="display:block" class="text-danger"></span>
                        </div>

                    </div>
                    <div class="ibox-title">
                        <h5>Chọn nhiều ảnh </h5>
                    </div>
                    <div class="ibox-content">
                        <div id="image-gallery" class="image-gallery">
                            <!-- Ảnh sẽ được render vào đây -->
                            <div id="add-image-btn" class="add-image-btn">
                                <span>+</span>
                            </div>
                        </div>
                    </div>
                    <div class="ibox" style="margin-top: 20px">
                        <div class="ibox-content">
                            <h6 style="margin: 0;  font-weight: 500; font-size: 16px;">Sản phẩm có nhiều phiên bản
                            </h6>
                            <p style="margin-bottom: 12px; font-size: 11px;">Một sản phẩm có thể có nhiều phiên bản
                                khác nhau ví dụ áo có kích thước, độ rộng, màu sắc khách nhau</p>
                            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                                <input style="height: 20px; margin: 0;" class="checkVariants"
                                    onchange="renderAttributeProduct()" type="checkbox">
                                <p style="margin: 0 4px;">Sản phẩm có nhiều thể loại, nhiều mức giá</p>

                            </div>
                            <span class="error_variant text-center"></span>
                            <div class="attribute_add" style="display:none">
                                <div class="attribute">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <p>Thuộc tính sản phẩm</p>
                                        </div>
                                        <div class="col-md-8">
                                            <p>Thêm giá trị thuộc tính</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="btn btn-primary attribute_add" onclick="handleAttributeAdd()">
                                    Thêm thuộc tính
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="ibox border-bottom attribute-details" style="display:none">
                        <div class="ibox-title">
                            <h5>Chi tiết thuộc tính của sản phẩm</h5>
                            <div class="ibox-tools">
                                <a class="collapse-link">
                                    <i class="fa fa-chevron-down"></i>
                                </a>
                                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                    <i class="fa fa-wrench"></i>
                                </a>

                                <a class="close-link">
                                    <i class="fa fa-times"></i>
                                </a>
                            </div>
                        </div>
                        <div class="ibox-content" style="display: block;">

                            <table class="attribute_table table">
                                <thead>
                                    <tr class="attribute_table-top">

                                    </tr>
                                </thead>
                                <tbody>


                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="ibox-title">
                        <h5>Cấu hình nâng cao </h5>
                    </div>
                    <div class="ibox-content">
                        <div class="form-group">
                            <label for="">Từ khóa chính</label>
                            <input type="text" class="form-control" name="meta_keywords">
                            <span class="text-danger"></span>
                        </div>
                        <div class="seo_showup">
                            <p>Xem trước :</p>
                            <span class="seo_url">
                                http://127.0.0.1:5500/post.htm
                            </span>
                            <h2 class="seo_title">Tiêu đề danh mục bài viết</h2>

                            <span class="seo_description">
                                Cung cấp 1 thẻ mô tả bằng cách sửa đoạn trích dẫn bên dưới. Nếu bạn không có thẻ mô tả,
                                Google sẽ thử tìm 1 phần thích hợp trong bài viết của bạn để hiển thị cho kết quả tìm kiếm.
                            </span>
                        </div>
                        <div class="form-group">
                            <label for="">Đường dẫn</label>
                            <input type="text" class="form-control" name="slug">
                            <span class="text-danger"></span>
                        </div>
                        <div class="form-group">
                            <label for="">Thẻ mô tả</label>
                            <textarea class="form-control" name="meta_description" id="" cols="30" rows="2"></textarea>
                            <div class="description-meta">
                                <p id="meta-info"></p>
                            </div>
                            <span class="text-danger"></span>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="ibox-content">
                        <div class="collapse_catelogue">
                            <span>Danh mục sản phẩm</span>
                            <i class="fa-solid fa-caret-right"></i>
                        </div>
                        <div class="collapse collapse-show">
                            @php
                                echo $product_catelogue;
                            @endphp
                        </div>
                        <p class="message-error text-danger"></p>
                        <div>
                            <button class="btn btn-success" type="submit">Thêm mới</button>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="avatar_title">
                            <h5>Thông tin chung</h5>
                        </div>
                        <div class="ibox-content">
                            <div class="form-group">
                                <label for="">Nhãn hàng</label>
                                <select name="brand_id " class="form-control" id="">
                                    @foreach ($brands as $item)
                                        <option value="">Lựa chọn thương hiệu</option>
                                        <option value="{{ $item->id }}">{{ $item->name }}</option>
                                    @endforeach
                                </select>
                            <span class="text-danger"></span>

                            </div>
                            <div class="form-group">
                                <label for="">Mã sản phẩm</label>
                                <input type="text" class="form-control" name="sku" placeholder="Mã sản phẩm">
                            <span class="text-danger"></span>


                            </div>
                            <div class="form-group">
                                <label for="">Giá thành</label>
                                <input type="text" class="form-control" name="price" placeholder="Giá sản phẩm">
                            <span class="text-danger"></span>

                            </div>
                            <div class="form-group">
                                <label for="">Giảm giá</label>
                                <input type="text" class="form-control" name="discount_price"
                                    placeholder="Giảm giá nếu có">
                            <span class="text-danger"></span>
                                    
                            </div>
                            <div class="form-group">
                                <label for="">Tồn kho</label>
                                <input type="text" class="form-control" name="stock" placeholder="Tồn kho">
                            <span class="text-danger"></span>

                            </div>
                            <div class="form-group">
                                <label for="">Cân năng</label>
                                <input type="text" class="form-control" name="weight" placeholder="Cân nặng">
                            <span class="text-danger"></span>

                            </div>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="avatar_title">
                            <h5>Chọn ảnh đại diện</h5>
                        </div>
                        <div class="ibox-content">
                            <div class="form-group" style="display:flex;justify-content: center">
                                <input type="text" name="image_url" class="form-control" id="avatar"
                                    class="avatar" style="display: none;">
                                <div class="seo_avatar" id="seo_avatar">
                                    <img class=""
                                        src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                        alt="">
                                  
                                </div>

                            </div>
                        </div>

                    </div>

                    <div class="ibox-content">
                        <div class="avatar_title">
                            <h5>Cấu hình nâng cao</h5>
                        </div>
                        <div class="ibox-content">
                            <div class="form-group">
                                <label for="">Trạng thái</label>
                                <select name="status" id="" class="form-control">
                                    <option value="0">Không kích hoạt</option>
                                    <option value="1">Kích hoạt</option>
                                </select>
                                <span class="text-danger"></span>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
@endsection
@push('scripts')
    @include('backend.components.scripts');
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="{{ asset('backend/js/framework/ckfinder.js') }}"></script>
    @include('backend.products.components.js.ckfinder')
    <script src="{{ asset('backend/js/framework/seo.js') }}"></script>
    <script src="{{ asset('backend/js/framework/catelogue/select2.js') }}"></script>
    @include('backend.products.handle.add');
    <script src="{{ asset('backend/js/collapse.js') }}"></script>
    <script>
        const attributes = document.querySelector(".attribute")

        function selectFileWithCKFinder(button) {
            const parent = button.parentElement;
            CKFinder.popup({
                chooseFiles: true,
                width: 800,
                height: 600,
                onInit: function(finder) {
                    finder.on('files:choose', function(evt) {
                        var file = evt.data.files.first();
                        var output = parent.querySelector("input");
                        const image = parent.querySelector('.variant_image-show')
                        image.src = file.getUrl();
                        output.value = file.getUrl();
                    });

                    finder.on('file:choose:resizedImage', function(evt) {
                        var output = parent.querySelector("input");
                        output.value = evt.data.resizedUrl;
                    });
                }
            });
        }
    </script>

    <!-- Page-Level Scripts -->
    <script>
        function handleCollapse() {

            event.stopPropagation();

            const collapse = event.currentTarget.parentElement.querySelector('.attribute_table-content .attribute_collape');
            const height = collapse.querySelector('.row').offsetHeight;
            if (collapse.style.height == height + "px") {
                collapse.style.height = `${0}px`;
                collapse.style.paddingTop = `0px`;
            } else {
                collapse.style.height = `${height}px`;
                collapse.style.paddingTop = `8px`;
            }
        }
    </script>
    <script>
        var attributesData = [];
        $.ajax({
            method: "GET",
            url: "{{ route('api.attribute') }}",
            dataType: "json",
            success: function(data) {


                if (data.status == 200) {

                    attributesData = data.data
                }

            }
        })



        const data = {};


        function createElementAttributeValue(options) {
            const select = document.createElement('select');
            select.className = "attribute_value";
            select.multiple = true;
            options.forEach(function(option) {
                const optionValue = document.createElement('option');
                optionValue.value = option.id;
                optionValue.text = option.name;
                select.appendChild(optionValue);
            });
            return select;
        }
        const selectedAttributes = [];
        // Khởi tạo mảng để lưu trữ các thuộc tính đã chọn

        const selectedValues = []; // 

        function createElementAttributeValue(options) {

            console.log(options);

            const select = document.createElement('select');
            select.className = "attribute_value";
            select.multiple = true;
            options.forEach(function(option) {
                const optionValue = document.createElement('option');
                optionValue.value = option.id;
                optionValue.text = option.name;
                optionValue.disabled = false
                select.appendChild(optionValue);
            });
            console.log(select);

            return select;
        }




        function handleAttributeAdd() {
            const attributeGroups = document.querySelector(".attribute");
            const rowElement = document.createElement("div");
            rowElement.classList.add('row');
            rowElement.style.paddingBottom = "6px";

            const attribute = document.createElement("div");
            attribute.classList.add('col-md-4');

            const attribute_value = document.createElement("div");
            attribute_value.classList.add('col-md-7');

            const remove_attribute = document.createElement("div");
            remove_attribute.classList.add('col-md-1');
            remove_attribute.innerHTML =
                `<button onclick='handleAttributeRemoveClick(event)' class="btn btn-danger remove_attribute"><i class="fa fa-trash-o"></i></button>`;

            const option = document.createElement("option");
            option.textContent = "Vui lòng chọn";

            const selectAttribute = document.createElement("select");
            selectAttribute.appendChild(option);

            // Chỉ thêm các thuộc tính chưa được chọn vào danh sách
            attributesData.forEach(function(attribute) {
                const option = document.createElement("option");
                option.value = attribute.id;
                option.text = attribute.name;
                // Disable thuộc tính đã được chọn trước đó
                if (selectedAttributes.includes(attribute.id)) {
                    option.disabled = true;
                }
                selectAttribute.appendChild(option);
            });

            attribute.appendChild(selectAttribute);

            const selectAttributeValue = document.createElement("select");
            selectAttributeValue.multiple = true;
            selectAttributeValue.className = "attribute_value";

            $(selectAttribute).select2({
                width: "100%",
            });

            attribute_value.appendChild(selectAttributeValue);
            $(selectAttributeValue).select2({
                width: "100%",
            });

            rowElement.appendChild(attribute);
            rowElement.appendChild(attribute_value);
            rowElement.appendChild(remove_attribute);

            attributeGroups.appendChild(rowElement);

            // Xử lý sự kiện chọn thuộc tính
            selectAttribute.onchange = function() {
                const key = selectAttribute[selectAttribute.options.selectedIndex].text.trim();
                const attributeValueSelect = this.parentElement.parentElement.querySelector(".attribute_value");
                const attributeId = this.value;


                // Thêm thuộc tính đã chọn vào danh sách `selectedAttributes`
                selectedAttributes.push(parseInt(attributeId));

                const options = attributesData.find(attribute => attribute.id == attributeId).values;

                updateSelectAttributes();
                attribute_value.innerHTML = "";
                const newSelect = createElementAttributeValue(options);

                attribute_value.appendChild(newSelect);
                $(newSelect).select2({
                    width: "100%"
                });


                newSelect.onchange = function() {


                    data[key] = $(newSelect).val();


                    renderTableListVariant(data);
                };
            };
        }

        function renderTableListVariant(data) {


            const nameColumn = Object.keys(data); // Lấy tất cả các keys
            const variants = [];

            // Nếu có ít nhất một thuộc tính có giá trị
            if (nameColumn.length > 0) {
                // Tạo mảng chứa tất cả các giá trị thuộc tính
                const attributeValues = nameColumn.map(attr => data[attr]);

                // Tạo tất cả các tổ hợp của thuộc tính
                const createCombinations = (arrays) => {
                    return arrays.reduce((acc, curr) => {
                        return acc.flatMap(a => curr.map(b => [...a, b]));
                    }, [
                        []
                    ]);
                };

                const combinations = createCombinations(attributeValues);

                combinations.forEach(combination => {
                    const variant = {
                        "Hình ảnh": "",
                        "Số lượng": "-",
                        "Gía": "-",
                        "Sku": "-"
                    };

                    nameColumn.forEach((name, index) => {
                        variant[name] = combination[index];
                    });

                    variants.push(variant);
                });
            }

            const table = document.querySelector(".attribute_table");
            table.innerHTML = "";

            if (variants.length > 0) {
                const columns = Object.keys(variants[0]);
                const thead = document.createElement("thead");
                const tableTop = document.createElement("tr");
                tableTop.className = "attribute_table-top";

                columns.forEach(function(column) {
                    const tableTopCell = document.createElement("th");
                    tableTopCell.className = "text-center";
                    tableTopCell.innerText = column;
                    tableTop.appendChild(tableTopCell);
                });

                thead.appendChild(tableTop);
                table.appendChild(thead);

                variants.forEach(function(variant, index) {
                    let count = 0;
                    const tbody = document.createElement("tbody");
                    const listVariant = document.createElement("tr");
                    listVariant.className = "attribute_table-list";
                    listVariant.addEventListener("click", handleCollapse);

                    const attributevalue = [];
                    Object.entries(variant).forEach(function(item) {

                        const td = document.createElement("td");
                        td.className = "text-center";

                        switch (item[0]) {
                            case "Hình ảnh":
                            case "Số lượng":
                            case "Gía":
                            case "Sku":
                                td.textContent = item[1];
                                listVariant.appendChild(td);
                                break;
                            default:
                                const value = attributesData.find(attribute => attribute.name.trim() ===
                                    item[0].trim());

                                attributevalue
                                if (value) {
                                    attributevalue.push(item[1]);

                                    // attributevalue = value.map(item => item.values.id)
                                    count++;
                                    const valueName = value.values.find(val => val.id == item[1])?.name ||
                                        '';


                                    td.textContent = valueName;

                                }

                                listVariant.appendChild(td);
                                break;
                        }
                    });
                    const price = document.querySelector("input[name='price']");

                    tbody.appendChild(listVariant);
                    tbody.insertAdjacentHTML("beforeend", `
    <tr class="attribute_table-content">
    <td colspan="${4 + count}">
        <div class="attribute_collape">
            <div class="row form-variant">
                <input type='hidden' name="attribute" value='${attributevalue.join(",")}'/>
                <div class="col-md-12 attribute_collape-content">
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label style="width:100px;height:100px" onclick='selectFileWithCKFinder(this)' for="" id="ckfinder-popup-1">
                                <img style="border:1px solid #ccc;" width="100"
                                    height="100" class="variant_image-show"
                                    src="https://img.icons8.com/?size=100&id=1G2BW7-tQJJJ&format=png&color=000000"
                                    alt="">
                            </label>
                            <input type="text" style="display:none"
                                class="form-control" name='variant_image' id="variant_image">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="">Sku</label>
                            <input type="text" name="sku_variant" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="">Giá</label>
                    <input type="text" class="form-control" value='${price.value}' name="price_variant">
                </div>
                <div class="form-group col-md-6">
                    <label for="">Giá khuyến mãi</label>
                    <input type="text" name="discount_price_variant" class="form-control">
                </div>
               
                <div class="form-group col-md-6">
                    <label for="">Số lượng</label>
                    <input type="text" name="stock_variant" class="form-control">
                </div>
            </div>
        </div>
    </td>
</tr>
`);
                    table.appendChild(tbody);
                });
            }
        }

        function updateSelectAttributes() {
            const allSelects = document.querySelectorAll(".attribute select");
            const currentSelectedIds = Array.from(allSelects).map(select => select.value).filter(id => id);

            allSelects.forEach(select => {
                const options = select.querySelectorAll('option');
                options.forEach(option => {
                    option.disabled = currentSelectedIds.includes(option.value) && option.value !== select
                        .value; // Disable nếu đã chọn
                });
            });
        }

        function handleAttributeRemoveClick(event) {
            event.stopPropagation();

            // Tìm đến phần tử hàng cha và phần tử select trong hàng đó
            const parentNode = event.target.closest(".row");
            const selectElement = parentNode.querySelector("select");
            console.log(selectElement.value);

            const attributeId = selectElement.value;
            const attributeName = selectElement.options[selectElement.selectedIndex].text.trim();

            // Xóa thuộc tính tương ứng khỏi danh sách `selectedAttributes`
            const index = selectedAttributes.indexOf(parseInt(attributeId));
            if (index > -1) {
                selectedAttributes.splice(index, 1); // Xóa thuộc tính khỏi danh sách
            }

            // Xóa dữ liệu thuộc tính khỏi đối tượng `data` nếu nó tồn tại
            if (attributeName in data) {
                delete data[attributeName];
            }

            // Kích hoạt lại thuộc tính đã chọn trong danh sách
            const optionToEnable = document.querySelector(`.attribute select option[value="${attributeId}"]`);


            // Xóa phần tử hàng khỏi giao diện
            parentNode.remove();
            updateSelectAttributes()
            // Cập nhật lại bảng hiển thị
            renderTableListVariant(data);
        }
    </script>

    <script>
        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
        console.log(elems);

        elems.forEach(function(html) {
            var switchery = new Switchery(html, {
                size: 'small'
            });
            html.onchange = function() {
                const stock = this.parentElement.parentElement.querySelector("input[name='stock']") != this
                    .checked ? stock.setAttribute('disabled', 'disabled') : stock.removeAttribute('disabled');
            }
        });

        function handleCollapse(event) {

            event.stopPropagation();

            const collapse = event.currentTarget.parentElement.querySelector('.attribute_table-content .attribute_collape');
            const height = collapse.querySelector('.row').offsetHeight;
            if (collapse.style.height == height + "px") {
                collapse.style.height = `${0}px`;
                collapse.style.paddingTop = `0px`;
            } else {
                collapse.style.height = `${height}px`;
                collapse.style.paddingTop = `8px`;
            }
        }
    </script>

    <script>
        function renderAttributeProduct() {
            const {
                target
            } = event;
            const attributeAdd = document.querySelector(".attribute_add");
            const attributeDetail = document.querySelector(".attribute-details")

            console.log(target.value);

            if (target.checked) {
                attributeAdd.style.display = "block";
                attributeDetail.style.display = "block"
            } else {
                attributeAdd.style.display = "none";
                attributeDetail.style.display = "none";
            }
        }
    </script>
    <script>
        document.getElementById('add-image-btn').onclick = function() {
            selectFilesWithCKFinder();
        };

        function selectFilesWithCKFinder() {
            CKFinder.popup({
                chooseFiles: true,
                width: 800,
                height: 600,
                onInit: function(finder) {
                    finder.on('files:choose', function(evt) {
                        const files = evt.data.files.toArray(); // Lấy mảng các tệp đã chọn

                        files.forEach((file) => {
                            const container = document.createElement('div');
                            container.className = 'image-container';

                            const img = document.createElement('img');
                            img.src = file.getUrl();
                            img.className = 'variant_image-show';

                            const input = document.createElement('input');
                            input.name = "gallery_product"
                            input.type = 'text';
                            input.value = file.getUrl();
                            input.className = 'image-url-input';
                            input.hidden = true

                            const removeBtn = document.createElement('span');
                            removeBtn.innerHTML = '✖';
                            removeBtn.className = 'remove-btn';

                            removeBtn.onclick = function() {
                                container.remove();
                            };

                            container.appendChild(img);
                            container.appendChild(input);
                            container.appendChild(removeBtn);

                            document.getElementById('image-gallery').insertBefore(container,
                                document.getElementById('add-image-btn'));
                        });
                    });
                }
            });
        }
    </script>
@endpush

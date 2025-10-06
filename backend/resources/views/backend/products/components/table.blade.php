<table class="table table-striped table-bordered ">
    <thead>
        <tr>
            <th class="text-center">STT</th>
            <th style="width: 200px" class="text-center">Hình ảnh</th>
            <th class="text-center">Thông tin sản phẩm</th>
            <th class="text-center">Ngày tạo</th>
            <th class="text-center">Trạng thái</th>
            <th class="text-center">Nổi bật</th>
            <th class="text-center">Thao tác</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($products as $index => $product)
            <tr>
                <td>
                    {{ $index + 1 }}
                </td>
                <td>
                    <img src="{{ asset($product->image_url) }}" alt="{{ $product->name }}" width="100%">
                </td>
                <td>
                    <strong>Tên sản phẩm:</strong>
                    {{-- <a onclick="clickHandel('{{$product->id}}')" data-toggle="modal" data-id={{ $product->id }}
                        data-target="#productModal">{{ $product->name ? $product->name : 'N/A' }}</a> <br> --}}
                        {{ $product->name ? $product->name : 'N/A' }}</a> <br>
                    <strong>Danh mục:</strong>
                    {{ $product->catelogues ? implode(',', $product->catelogues) : 'N/A' }}<br>
                    <strong>Nhãn hàng:</strong> {{ $product->brand->name ?? 'N/A' }}<br>
                    <strong>Giá:</strong>
                    @if ($product->discount_price && $product->discount_price < $product->price)
                        <span class="text-muted"><s>{{ number_format($product->price, 0, ',', '.') }} VND</s></span>
                        <span class="text-danger font-weight-bold ml-2">{{ number_format($product->discount_price, 0, ',', '.') }} VND</span>
                    @else
                        <span class="text-danger font-weight-bold">{{ number_format($product->price, 0, ',', '.') }} VND</span>
                    @endif
                    <br>
                    <strong>Tồn kho:</strong> {{ $product->display_stock }}
                </td>
                <td>{{ $product->created_at->format('d/m/Y') }}</td>
                <td class="text-center">
                    <form name="form_status" action="">
                        @csrf
                        <input type="hidden" name="attribute" value="status">
                        <input type="hidden" name="table" value="{{ $table }}">
                        <input type="checkbox" data-id="{{ $product['id'] }}"
                            @if ($product['status'] == 1) checked @endif
                            class="js-switch js-switch_{{ $product['id'] }}" style="display: none;"
                            data-switchery="true">
                    </form>
                </td>
                <td class="text-center">
                    <form name="form_status" action="">
                        @csrf
                        <input type="hidden" name="attribute" value="is_featured">
                        <input type="hidden" name="table" value="{{ $table }}">
                        <input type="checkbox" data-id="{{ $product['id'] }}"
                            @if ($product['is_featured'] == 1) checked @endif
                            class="js-switch js-switch_{{ $product['id'] }}" style="display: none;"
                            data-switchery="true">
                    </form>
                </td>
                <td style="text-align: center">
                    <div style="display: flex; justify-content: center;column-gap: 5px;">
                        <a href="{{ route('product.show', $product->id) }}" class="btn btn-primary">
                            <i class="fa fa-paste"></i>
                        </a>
                        <a href="{{ route('admin.product.edit', $product->id) }}" class="btn btn-info" title="Sửa"><i
                                class="fa fa-pencil"></i></a>
                        @if(auth()->user()->hasPermission('deleteProduct'))

                        <form action="" method="POST" data-url="product" class="form-delete">
                            @method('DELETE')
                            @csrf
                            <input type="hidden" value="{{ $product->id }}" name="id">
                            <button class="btn btn-danger  center" title="Xóa"><i class="fa fa-trash-o"></i></button>
                        </form>
                        @else
                        <a href="{{ route('permission.denied') }}" class="btn btn-warning center" title="Không có quyền">
                            <i class="fa fa-trash-o"></i>
                        </a> {{-- Hiển thị nút xóa nhưng không cho phép --}}
                        @endif
                    </div>

                </td>
            </tr>
        @endforeach
    </tbody>
</table>
<div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <!-- Header Section -->
            <div class="modal-header">
                <h4 class="modal-title font-weight-bold" id="productModalLabel"></h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <div class="row">
                    <!-- Product Image and Galleries -->
                    <div class="col-md-5 text-center">
                        <!-- Main Product Image -->
                        <img src="http://127.0.0.1:8000/images/shopping%20(5).webp" alt="Sản phẩm"
                            class="img-fluid rounded mb-3">

                        <!-- Image Gallery -->
                        <div class="gallery d-flex justify-content-start mt-3" style="margin-top:12px">
                            <img src="http://127.0.0.1:8000/images/shopping%20(1).webp" alt="Gallery Image 1"
                                class="img-thumbnail mx-1" style="width: 70px; height: 70px;">
                            <img src="http://127.0.0.1:8000/images/shopping%20(2).webp" alt="Gallery Image 2"
                                class="img-thumbnail mx-1" style="width: 70px; height: 70px;">
                            <img src="http://127.0.0.1:8000/images/shopping%20(3).webp" alt="Gallery Image 3"
                                class="img-thumbnail mx-1" style="width: 70px; height: 70px;">
                            <!-- Add more images as needed -->
                        </div>
                    </div>

                    <!-- Product Details -->
                    <div class="col-md-7">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>Danh mục</th>
                                    <td>Nội thất phòng khách</td>
                                </tr>
                                <tr>
                                    <th>Mã SKU</th>
                                    <td>SO001</td>
                                </tr>
                                <tr>
                                    <th>Mô tả chi tiết</th>
                                    <td>Sơn Đẹp trai bọc da, phù hợp cho phòng khách hiện đại.</td>
                                </tr>
                                <tr>
                                    <th>Giá</th>
                                    <td><span class="text-danger font-weight-bold">30,000 VND</span></td>
                                </tr>
                                <tr>
                                    <th>Tồn kho</th>
                                    <td>12</td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- Variants Table -->
                        <h5 class="font-weight-bold mt-4">Phiên bản:</h5>
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>SKU</th>
                                    <th>Giá</th>
                                    <th>Giảm giá</th>
                                    <th>Tồn kho</th>
                                    <th>Thuộc tính</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Test1231</td>
                                    <td>30,000 VND</td>
                                    <td>0.00 VND</td>
                                    <td>12</td>
                                    <td>Màu sắc: Màu Đen, Chất liệu: Gỗ Sồi</td>
                                </tr>
                                <tr>
                                    <td>Tê12312312</td>
                                    <td>30,000 VND</td>
                                    <td>0.00 VND</td>
                                    <td>12</td>
                                    <td>Màu sắc: Màu Đen, Chất liệu: Vải Nhung</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Footer Section -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                <button type="button" class="btn btn-primary">Chỉnh sửa sản phẩm</button>
            </div>
        </div>
    </div>
</div>
<script>

        // Khi nhấn nút xem chi tiết sản phẩm
        function clickHandel(id) {
            event.preventDefault();

            // Gọi API để lấy dữ liệu sản phẩm
            $.ajax({
                url: 'http://127.0.0.1:8000/api/products/' +id,
                type: 'GET',
                success: function(data) {
                    // Cập nhật tiêu đề sản phẩm
                    $('#productModalLabel').text(data.name);

                    // Cập nhật nội dung modal body
                    let modalContent = `
         <div class="row">
            <div class="col-md-5">
              <img src="${data.image_url}" alt="${data.name}" class="img-fluid rounded mb-3">
              <div class="gallery d-flex justify-content-start mt-3">
                ${data.geleries.length > 0 ? data.geleries.map(image => `<img src="${image}" alt="Gallery Image" class="img-thumbnail mx-1" style="width: 70px; height: 70px;">`).join('') : ""}
              </div>
            </div>
            <div class="col-md-7">
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <th>Danh mục</th>
                    <td>${data.catalogue_id || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th>Mã SKU</th>
                    <td>${data.sku}</td>
                  </tr>
                  <tr>
                    <th>Mô tả chi tiết</th>
                    <td>${data.detailed_description}</td>
                  </tr>
                  <tr>
                    <th>Giá</th>
                    <td>
                      <span class="text-danger font-weight-bold">
                      ${calculatePrice(data)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Tồn kho</th>
                    <td>${data.variants.length > 0 ? 'Xem phiên bản bên dưới' : (data.stock || 'N/A')}</td>
                  </tr>
                </tbody>
              </table>

              <h5 class="font-weight-bold mt-4">Phiên bản:</h5>
              <table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Giá</th>
                    <th>Giảm giá</th>
                    <th>Tồn kho</th>
                    <th>Thuộc tính</th>
                  </tr>
                </thead>
                <tbody>
                  ${data.variants.length > 0 ? data.variants.map(variant => `
                    <tr>
                      <td>${variant.sku}</td>
                      <td>${variant.price} VND</td>
                      <td>${variant.discount_price !== "0.00" ? variant.discount_price : 'Không có'}</td>
                      <td>${variant.stock}</td>
                      <td>${variant.attributes.map(attr => `${attr.attribute_value.name}: ${attr.attribute_value.attributes.name}`).join(', ')}</td>
                    </tr>`).join('') : '<tr><td colspan="5" class="text-center">Không có phiên bản nào</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>
        `;
                    // Cập nhật nội dung modal
                    document.querySelector(".modal-body").innerHTML = modalContent



                },
                error: function(error) {
                    console.error('Có lỗi xảy ra:', error);
                }
            });
        }

        // Hàm để tính toán giá hiển thị
        function calculatePrice(data) {
            let maxPrice = null;
            let minPrice = null;

            if (data.variants && data.variants.length > 0) {
                let prices = data.variants.map(variant => {
                    return variant.discounted_price ? parseFloat(variant.discounted_price) : parseFloat(
                        variant.price);
                });

                maxPrice = Math.max(...prices);
                minPrice = Math.min(...prices);
            } else {
                maxPrice = parseFloat(data.discounted_price) || parseFloat(data.price);
                minPrice = maxPrice; // Giá tối đa và tối thiểu giống nhau nếu không có variants
            }

            if (maxPrice === minPrice) {
                return `${maxPrice} đ`;
            } else {
                return `${minPrice} đ - ${maxPrice} đ`;
            }
        }

</script>

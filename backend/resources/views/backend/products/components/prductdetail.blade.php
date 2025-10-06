<div class="container mt-4">
    <div class="row" style="align-items: center;">
        <div class="col-md-5 " style="align-items: center;">
        <img src="{{ asset($product->image_url) }}" alt="{{ $product->name }}" width="100%">
        </div>

        <div class="col-md-7">
            <table class="table table-borderless">
                <tbody>
                <tr>
                        <th style="white-space: nowrap;">Tên sản phẩm</th>
                        <td>{{ $product->name ?? ''}}</td>
                    </tr>
                    <tr>
                        <th>Danh mục</th>
                        <td>{{ $product->catelogues ? implode(',',$product->catelogues) : 'Chưa có danh mục' }}</td>
                    </tr>
                    <tr>
                        <th>Nhãn hàng</th>
                        <td>{{ $product->brand->name ?? ''}}</td>
                    </tr>
                    <tr>
                        <th>Trọng lượng</th>
                        <td>{{ $product->weight }}Kg</td>
                    </tr>
                    <tr>
                        <th>Mã SKU</th>
                        <td>{{ $product->sku }}</td>
                    </tr>
                    <tr>
                        <th>Mô tả</th>
                        <td>
                            <div class="description-container">
                                <div id="productDescription" class="product-description">
                                    {!! $product->detailed_description !!}
                                </div>
                                <button id="toggleDescription" class="btn btn-link">Xem thêm</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>Giá</th>
                        <td>
                            @if($product->discount_price && $product->discount_price < $product->price)
                                <span class="text-muted"><s>{{ number_format($product->price, 0, ',', '.') }} VND</s></span>
                                <span class="text-danger font-weight-bold ml-2">{{ number_format($product->discount_price, 0, ',', '.') }} VND</span>
                            @else
                                <span class="text-danger font-weight-bold">{{ number_format($product->price, 0, ',', '.') }} VND</span>
                            @endif
                        </td>
                    <tr>
                        <th>Tồn kho</th>
                        <td>{{ $product->stock }}</td>
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
                    @if($product->variants && count($product->variants) > 0)
                        @foreach($product->variants as $variant)
                            <tr>
                                <td>{{ $variant->sku }}</td>
                                <td>{{ number_format($variant->price, 0, ',', '.') }} VND</td>
                                <td>{{ number_format($variant->discount, 0, ',', '.') }} VND</td>
                                <td>{{ $variant->stock }}</td>
                                <td>
                                {{ $variant->attributeValues->pluck('name')->implode(', ') }}
                                </td>
                            </tr>
                        @endforeach
                    @else
                        <tr>
                            <td colspan="5">Không có phiên bản nào.</td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>
</div>
<style>
    .description-container {
        position: relative;
    }
    .product-description {
        max-height: 100px; /* Chiều cao ban đầu */
        overflow: hidden;
        transition: max-height 0.3s ease;
    }
    .product-description.expanded {
        max-height: none; /* Mở rộng chiều cao */
    }
</style>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    $(document).ready(function() {
        $('#toggleDescription').on('click', function() {
            var description = $('#productDescription');
            var button = $(this);

            description.toggleClass('expanded');

            if (description.hasClass('expanded')) {
                button.text('Thu gọn');
            } else {
                button.text('Xem thêm');
            }
        });
    });
</script>
<style>
    .description-container {
    position: relative;
}

.product-description {
    max-height: 100px; /* Chiều cao mô tả ban đầu */
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.product-description.expanded {
    max-height: none; /* Mở rộng chiều cao khi nhấn "Xem thêm" */
}

.product-description img {
    max-width: 100%; /* Giữ kích thước hình ảnh không vượt quá chiều rộng của phần mô tả */
    height: auto;    /* Đảm bảo tỷ lệ hình ảnh không bị thay đổi */
    display: block;  /* Đảm bảo hình ảnh không bị lệch */
    margin: 10px 0;  /* Thêm khoảng cách giữa hình ảnh và văn bản */
}
</style>
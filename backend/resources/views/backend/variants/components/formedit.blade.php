<form action="{{route("admin.variant.update",$id)}}" method="POST" class="form-update" style="background-color: white; padding:40px" novalidate >
    @csrf
    @method("PUT")
    <div class="row">
        <div class="col-md-4">
                <h2>Thông tin biến thể</h2>
                <span>
                    Những trường có dấu ("*") là những trường bắt buộc và không được bỏ trống
                </span>
               
        </div>
        <div class="col-md-8" style="padding:20px 0 0 50px">
            <div class="row" style="display: flex; flex-wrap:wrap">
                <div class="form-group col-md-6">
                    <label for="">Giá trị biến thể*</label>
                    <input type="text"  name="name" class="form-control" value="{{old("name") ?? $data->name}}" autocomplete=""> 
                     <p  class=" text-danger message-error"></p>         
                </div>
                <div class="form-group col-md-6">
                    <label for="">Tên danh mục thuộc tính*</label>
                    <select name="attribute_id" class="attribute_id form-control" class="" id="">
                        <option value="">Lựa chọn loại biến thể</option>
                        @foreach($attributes as $attribute)
                        <option {{ $data->attribute_id == $attribute->id ? "selected" : ""}} value="{{$attribute->id}}">{{ $attribute->name}}</option>
                        @endforeach
                    </select>
                    <p  class=" text-danger message-error"></p> 
                </div>
               
            </div>
        </div>
    </div>
    <div class="row text-right mt-4">
          <button class="btn btn-primary">Sửa</button>
    </div>
</form>

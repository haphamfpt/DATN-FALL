import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

const ProductList = ({ products = [], title = "SẢN PHẨM NỔI BẬT" }) => {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-5 display-6 text-primary">
          {title}
        </h2>
        <Row xs={2} md={3} lg={4} className="g-4 g-lg-5">
          {products.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default ProductList;
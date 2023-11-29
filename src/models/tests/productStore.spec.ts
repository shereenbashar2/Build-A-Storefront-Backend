import { Product, ProductStore } from '../product';

const product = new ProductStore()


describe("Product Model", () => {
  it('should have an index method', () => {
    expect(product.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(product.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(product.index).toBeDefined();
  });

  it('should have a update method', () => {
    expect(product.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(product.delete).toBeDefined();
  });


  it('should have a getTop5PopularProducts method', () => {
    expect(product.getTop5PopularProducts).toBeDefined();
  });

  it('should have a getProductsByCategory method', () => {
    expect(product.getProductsByCategory).toBeDefined();
  });
});
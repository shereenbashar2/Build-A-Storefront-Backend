import { ProductStore } from '../product';

const store = new ProductStore();

describe('ProductStore', () => {
  describe('Methods', () => {
    beforeEach(() => {
      // Common setup code if needed
    });

    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });

    it('should have an update method', () => {
      expect(store.update).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(store.delete).toBeDefined();
    });

    it('should have a getTop5PopularProducts method', () => {
      expect(store.getTop5PopularProducts).toBeDefined();
    });

    it('should have a getProductsByCategory method', () => {
      expect(store.getProductsByCategory).toBeDefined();
    });
  });

  describe('Method: create', () => {
    it('should add a product', async () => {
      const result = await store.create({
        id: 1,
        name: 'Sample Product',
        price: Number(50),
        category_id:null
      });
      expect(result).toEqual({
        id: 1,
        name: 'Sample Product',
        price:  Number(50),
        category_id:null

      });
    });
  });

  describe('Method: index', () => {
    it('should return a list of products', async () => {
      const result = await store.index();
      expect(result).toEqual([
        {
          id: 1,
          name: 'Sample Product',
          price: Number(50),
          category_id:null
        },
      ]);
    });
  });
});

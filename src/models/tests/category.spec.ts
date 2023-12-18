 import { Category, CategoryModel } from '../category';

 const store = new CategoryModel();

 describe("Category Model", () => {
   it('should have an index method', () => {
     expect(store.index).toBeDefined();
   });

   it('should have a show method', () => {
     expect(store.show).toBeDefined();
   });

   it('should have a create method', () => {
     expect(store.create).toBeDefined();
   });

   //  Add similar checks for update and delete methods
   it('should have an update method', () => {
     expect(store.update).toBeDefined();
   });

   it('should have a delete method', () => {
     expect(store.delete).toBeDefined();
   });

   it('create method should add a category', async () => {
     const result = await store.create({
       id:1,
       name: 'TestCategory',
    
       description: 'TestDescription',
     });
     expect(result).toEqual({
       id: 1,
       name: 'TestCategory',
       description: 'TestDescription',
     });
   });

   it('index method should return a list of categories', async () => {
     const result = await store.index();
     expect(result).toEqual([{
       id: 1,
       name: 'TestCategory',
       description: 'TestDescription',
     }]);
   });

   it('show method should return the correct category', async () => {
 
     const result = await store.show(1);
     expect(result).toEqual({
       id:1,
       name: 'TestCategory',
       description: 'TestDescription',
     });
   });


 });

// import { Order, OrderModel } from '../order';

// const orderStore = new OrderModel();

// // Utility function for type assertion
// const assertIsOrder = (obj: Order): asserts obj is Order => {
//   expect(typeof obj.id).toBe('number');
//   expect(typeof obj.productId).toBe('number');
//   expect(typeof obj.quantity).toBe('number');
//   expect(typeof obj.userId).toBe('number');
//   expect(obj.status).toBe('active' || 'complete');
// };

// describe("Order Model", () => {
//   it('should have an index method', () => {
//     expect(orderStore.index).toBeDefined();
//   });

//   it('should have a show method', () => {
//     expect(orderStore.show).toBeDefined();
//   });

//   it('should have a create method', () => {
//     expect(orderStore.create).toBeDefined();
//   });

//   it('should have a getCurrentOrderByUser method', () => {
//     expect(orderStore.getCurrentOrderByUser).toBeDefined();
//   });

//   it('should have a getCompletedOrdersByUser method', () => {
//     expect(orderStore.getCompletedOrdersByUser).toBeDefined();
//   });

//   it('create method should add an order', async () => {
//     const result = await orderStore.create({
//       productId: 1,
//       quantity: 2,
//       userId: 3,
//       status: 'active',
//     });

//   //  assertIsOrder(result);

//     // At this point, TypeScript knows that `result` is of type `Order`
//     expect(result).toEqual({
//       id: result.id,
//       productId: result.productId,
//       quantity: result.quantity,
//       userId: result.userId,
//       status: result.status,
//     });
//   });

//   it('index method should return a list of orders', async () => {
//     const result = await orderStore.index();

//     // Ensure the result is an array of orders
//     result.forEach(assertIsOrder);
//   });

//   it('show method should return the correct order', async () => {
//     // Assuming there is an order with id 1 in the database
//     const result = await orderStore.show('1');

//     //assertIsOrder(result);

//     // At this point, TypeScript knows that `result` is of type `Order`
//     expect(result).toEqual({
//       id: result.id,
//       productId: result.productId,
//       quantity: result.quantity,
//       userId: result.userId,
//       status: result.status,
//     });
//   });

//   it('getCurrentOrderByUser method should return the current order for a user', async () => {
//     // Assuming there is an active order for user with id 3 in the database
//     const result = await orderStore.getCurrentOrderByUser('3');

//     //assertIsOrder(result);

//     // At this point, TypeScript knows that `result` is of type `Order`
//     expect(result).toEqual({
//       id: result.id,
//       productId: result.productId,
//       quantity: result.quantity,
//       userId: result.userId,
//       status: result.status,
//     });
//   });

//   it('getCompletedOrdersByUser method should return completed orders for a user', async () => {
//     // Assuming there are completed orders for user with id 3 in the database
//     const result = await orderStore.getCompletedOrdersByUser('3');

//     // Ensure the result is an array of orders
//     result.forEach(assertIsOrder);
//   });

//   // Add similar tests for update and delete methods if applicable
// });

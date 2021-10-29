Setup instructions:
1. Install Docker on your machine.
2. Install docker compose on your machine.
3. Build (the images) and run the project by typing the following command:
    docker-compose up --build

** The project will seed data of the transactions and the customers 
** in their respective tables.

4. Once the images were build and the project is running, visit
   visit localhost:3000 in your browser to view, update and create transactions.
5. To stop the project run:
    docker-compose down

@@ TODOS!
   1. Add a view for a single transaction .
   2. Add crud operations and view for customer.
   3. Add a map component showing markers of the customers locations.
   4. Wire up yep, react-hooks-form and typescript to play nicely and     enable amazing client side validation.
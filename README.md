# alfheimr_challenge
**Filter API**
----
  API for getting filtered data.

* **URL**

  localhost:8000/alfheimr/product/filter

* **Method:**
  
  POST

 | `POST` |`
  
*  **URL body example**

   Request body along with example 
   
   {<br />
    "name": "laptop",                                                                    **optional:**<br />
    "price": {  <br />
        "minimum":29999,<br />
        "maximum":61000<br />
    },                                                                                   **optional:**<br />
    "category":"laptop",                                                                 **optional:**<br />
    "subcategory": ["editing","gaming"],                                                 **optional:**<br />
    "specifications":[{"key":"ram","value":"6GB"},{"key":"processor","value":"i7"}]      **optional:**<br />
   }<br />
   
 
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `successfully done`
  


**Order API**
----
  POST API for placing order.

* **URL**

  localhost:8000/alfheimr/order

* **Method:**
  
  POST

 | `POST` |`
  
*  **URL body example**

   Request body along with example 
   
   {<br />
    "directPurchase": 1,  **Required** <br />
    "cartId": "5fd4615977287f1f14c13a59",  **conditional** (Required if directPurchase value is 0)<br />
    "productId": "5fd4615977287f1f14c13a59",  **conditional** (Required if directPurchase value is 1) <br />
    "deliveryOptions": 2,  **Required** (1->free delivery, 2-> instant delivery, 3->prime member delivery mode)<br />
    "paymentMethods":1  **Required** (1-> COD, 2->netbanking, 3->cards, 4->EMI)<br />
    }
   
 
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `successfully done`
  


**Cart API**
----
  POST API for adding product to cart.

* **URL**

  localhost:8000/alfheimr/cart

* **Method:**
  
  POST

 | `POST` |`
  
*  **URL body example**

   Request body along with example 
   
   { <br />
    "productId": "5fd4615977287f1f14c13a59", **required** (mongoId of product)<br />
    "quantity": 2, ** required** (quantity of product)<br />
    "vendor": "5fd4615977287f1f14c13a59", **required** (one kind of product may have multiple vendors)<br />
    "offers": ["5fd4615977287f1f14c13a59","5fd4615977287f1f14c13a59"], **optional** (offer module ids inside array)<br />
    "plans": ["5fd4615977287f1f14c13a59","5fd4615977287f1f14c13a59","5fd4615977287f1f14c13a59"],  **optional** (array of ids,example-> for mobiles, plans could be protection policies,accident or damage protection plans)<br />
    "giftCard": "5fd4615977287f1f14c13a59"  **optional** (add a giftcard id to redeem it)<br />
    } <br />
   
 
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `added to cart`
  


* **Notes:**

  Total 3 apis, mostly written in es6 along with redis cache implementation.Joi package is used for incoming data validation. sample mongoId "5fd4615977287f1f14c13a59" is used for example demonstration.

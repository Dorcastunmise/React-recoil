//  view 

import { useRecoilValue } from "recoil";


const FakeProducts = ({productsQuery,onAddCartItem}) => {
  //getting products list from recoil state -->
    const productsList = useRecoilValue(productsQuery);
  return(
    <>
      <div className="l-flex">
        <div className="l-fg3">
          {
            productsList.map((product) => (
              <div className="card" key={product.id}>
                <img src={product.image} alt="" />
                  <div className="card-body">
                    <h2>{product.title}</h2>
                    <h5>{product.category}</h5>
                    <p>{product.description}</p>
                    <h5>(#{product.price}) <button onClick={() =>
                    onAddCartItem(product)} className="button">
                      Add</button></h5>
                  </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
export default FakeProducts;
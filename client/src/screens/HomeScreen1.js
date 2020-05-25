import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }

  return <>
    {category &&
      <h2>{category}</h2>}
 <img className="image" src="https://www.sephora.fr/dw/image/v2/BCVW_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dw6686bd95/images/hi-res/SKU/SKU_1440/513272_swatch.jpg?sw=585&sh=585&sm=fit"></img>
    <ul className="filter">
      <li>
        <form onSubmit={submitHandler}>
          <input  
          
          
          onChange={(e) => setSearchKeyword(e.target.value)} />







          <button type="submit"><svg class="bi bi-search" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clip-rule="evenodd"/>
  <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clip-rule="evenodd"/>
</svg></button>
        </form>
      </li>
      
    </ul>
   
   

    
   








    {loading ? <div>Loading...</div> :
      error ? <div>{error}</div> :
        <ul className="products">
          {
            products.map(product =>
              <li key={product._id}>
                <div className="product">
                  <Link to={'/product/' + product._id}>
                    <img className="product-image" src={product.image} alt="product" />

                  </Link>
                  <div className="product-name">
                    <Link to={'/product/' + product._id}>{product.name}</Link>
                  </div>
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-price">${product.price}</div>
                  {/* <div className="product-rating">{product.rating} Stars ({product.numReiews} Reviews)</div> */}
                </div>
              </li>)
          }
        </ul>
    }
  </>

}
export default HomeScreen;
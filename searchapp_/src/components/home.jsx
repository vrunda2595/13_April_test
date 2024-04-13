import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Home()
{
    const [allProducts, setAllProducts] = useState([]); // to just get products 20 -> 20
    //   console.log(allProducts, "allProducts");
  
    const [search, setSearch] = useState(""); // shose
    const [filterProducts, setFilterProducts] = useState([]); // [{},{} ] setting here // 20 -> 10 4
  
    const router = useNavigate();
    async function getProducts() {
        // api call
        // alert("Jiii")
        try {
          const response = await axios.get("https://fakestoreapi.com/products");
          // console.log(response, "response from fakestore api")
          if (response?.data.length) {
            setAllProducts(response.data);
            setFilterProducts(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    
      function redirect(id) {
        // alert(id) 1 2 3 4 5
        router(`/singleproductpage/${id}`);
      }
    
      function handleChange(event) {
        console.log(event.target.value);
        setSearch(event.target.value);
    
        let userword = event.target.value.toLowerCase();
    
        const filteredProduts = allProducts.filter((product) => { // 20 -> men
          // 20 -> 4 -> 4 result show
          return product.title.toLowerCase().includes(userword);
        });
    
        setFilterProducts(filteredProduts); // 20 -> 4
    
        console.log(filteredProduts, "filteredProduts");
      }
    
      useEffect(() => {
        getProducts();
      }, []);
  
//end half code
    return(
        <div>
        <div className="searchsection">
        <div>
        <input placeholder="Search " value={search} onChange={handleChange} style={{marginTop:'110px' ,fontWeight:'bolder' ,height:'40px',width:'390px',margin:'auto',padding:'5px'}}/>
         </div>
       </div>
       {/* <!--products--> */} 
   <div>
      {filterProducts?.length ? (
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {filterProducts.map((productObj) => (
            <div
              onClick={() => redirect(productObj.id)}
              style={{
                font: 'arial',
                width: "40%",
                border: "1px ridge gray",
                height: "200px",
                //width: "600px",
                //border: "2px solid black",
                //margin:'30px',
                //height: "350px",
                //padding:'60px',
                fontSize:'medium',
                display:'flex',
                marginBottom:'40px',
              }}
            >
            <div style={{width:'50%',border:'1px ridge white',}}>  
            <img style={{ height: "100%", width: "70%" }} src={productObj.image}/>
            </div>
            <div style={{width:'50%',textAlign:'left',padding:'2px',justifyContent:'space-between',fontWeight:'bolder',}}>
              <span style={{color:'black'}}>{productObj.title}</span>
              <br/>
              <span style={{color:'black'}}>Price :{productObj.price}$</span>
              <br/>
              <span style={{color:'green',fontWeight:'bold'}}>Rate :{productObj.rating.rate}</span>
              <br/>
              <span style={{color:'maroon',fontWeight:'bold'}}>Count :{productObj.rating.count}</span>
              <br/>
              <button style={{borderRadius:'10px',backgroundColor:'black',border:'2px ridge black' ,height:'40px', width:'120px',color :'white'}}> + ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ marginTop:'200px' ,fontWeight:'bolder'}}>PRODUCT NOT FOUND ...</div>
      )}
    </div>
       {/* <!--end--> */}
        </div>
    )
}
export default Home;
import { useEffect, useState } from "react";
import ProductNode from "../ProductNode/ProductNode";
import styles from "./Dashboard.module.css";
import axios from "axios";
function Dashboard() {
  const [productData, setProductData] = useState([]);
  const [filteredProductData, setFilteredProductData] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage,setCurrentPage] = useState(0);
  const [maxPage,setMaxPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProductData(res.data);
        console.log(res.data);
        const page_count = Math.ceil(res.data.length/4);
        setMaxPage(page_count);
        // setFilteredProductData(res.data);
        setCurrentPage(1);
        // setProductsPagination();
        setIsLoading(false);
      } catch (err) {
        setErrMsg(err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(()=>{
    setIsLoading(true);
setProductsPagination();
setIsLoading(false);
  },[currentPage]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSubmit = (e) => {
    setIsLoading(true);
    let filteredData = [];
    if (searchInput && selectedCategory) {
      filteredData = productData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchInput.toLowerCase()) &&
          item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    } else if (searchInput && !selectedCategory) {
      filteredData = productData.filter((item) =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    } else {
      filteredData = productData.filter((item) => {
        return item.category.toLowerCase() === selectedCategory.toLowerCase();
      });
    }
    setFilteredProductData(filteredData);
    setIsLoading(false);
  };
  const handleReset = () => {
    setFilteredProductData(productData);
  };
  const handlecategoryFilter = (e) => {
    setSelectedCategory(e.target.value);
  };

  const setProductsPagination = ()=>{
    const startIndex = (currentPage*4)-4;
    const data = productData.slice(startIndex,startIndex+4+1);
    console.log(data);
    setFilteredProductData(data);
  }

  const handleNext = ()=>{
    setCurrentPage((prev)=>{
        if(prev === maxPage)return prev;
        else return (prev+1);
    });

    // setProductsPagination();
  }
  const handlePrevious = ()=>{
    setCurrentPage((prev)=>{
        if(prev === 1)return 1;
        else return prev-1;
  });
//   setProductsPagination();
  }


  return (
    <div>
      <div className="d-flex align-items-center gap-4">
        <div className="d-flex my-3">
          <input
            type="text"
            value={searchInput}
            placeholder="Search Product Here..."
            onChange={handleInputChange}
          />
          <select onChange={handlecategoryFilter}>
            <option selected value="">
              Select category
            </option>
            <option value="men's clothing">Men</option>
            <option value="women's clothing">Women</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelary</option>
          </select>
          <button onClick={handleSubmit}>Search</button>
          <button onClick={handleReset}>Reset Filters</button>
        </div>
        <div></div>
      </div>

      <div className="container ml-auto mr-auto mt-2 mb-2">
        <div className="row">
          {isLoading ? (
            <div className="text-center">Loading Products......</div>
          ) : filteredProductData.length !== 0 ? (
            filteredProductData.map((item) => {
              return (
                <div className="col-3 col-sm-6 col-md-4 col-lg-3 m-auto">
                  <ProductNode
                    key={item.title + item.price + item.id}
                    product={item}
                  />
                </div>
              );
            })
          ) : (
            <div className="text-center">No Products Found!!</div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center aling-items-center">
          <div>
            <p className="text-center"><button onClick={handlePrevious}>{'<'}</button>{currentPage}<button onClick={handleNext}>{'>'}</button></p>
          </div>

      </div>

      {errMsg && (
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          {/* <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg> */}
          <div>{errMsg}</div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

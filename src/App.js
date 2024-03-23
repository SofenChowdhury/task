import React, { useEffect, useState, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './responsive.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/Home/index';
import About from './pages/About/index';
import Listing from './pages/Listing';
import NotFound from './pages/NotFound';
import DetailsPage from './pages/Details';
import axios from 'axios';
import Cart from './pages/cart';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Loader from './assets/images/loading.gif';

import data from './data';

const MyContext = createContext();

function App() {

  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [isopenNavigation, setIsopenNavigation] = useState(false);

  const [isLogin, setIsLogin] = useState();
  const [isOpenFilters, setIsopenFilters] = useState(false);
  let category = [];
// console.log("data");
// console.log(productData);

  useEffect(() => {
    getData('https://dummyjson.com/products?skip=0&limit=100');
    // getCartData("http://localhost:5000/cartItems");

    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);

   
      setTimeout(() => {
        // setProductData(data[1]);
        setIsloading(false);
      }, 3000);


  
  }, []);

  const getData = async (url) => {
    try {
      await axios.get(url).then((response) => {
        // console.log('jhgdkhasjsdhads');
        setProductData(response.data);
        response.data.products.map((item, index)=>{
          category[index] = item.category
          // console.log(category[index]);
        })
        const uniqueArray = [...new Set(category)];
        setCategoryData(uniqueArray);
        // console.log("category.length");
        // console.log(category.length);
        setTimeout(()=>{
          setIsloading(false);
        },2000); 
      })


      // await axios.get('https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=27dad2d0abd34a22965727ce8d939077').then((response) => {
      //     console.log(response)
      // })



    } catch (error) {
      console.log(error.message);
    }
  }

  // function cat (data) {
  //   console.log('slcjasdjhajfhafhjkfhjshfjshfjhffsj');
  //   console.log(data);
  //   // for (let index = 0; index < data.length; index++) {
  //   //   // category.push(data[index].category);
  //   //   console.log("data[index]");
  //   //   console.log(data[index]);
  //   // }
  //     data.products.map((item, index)=>{
  //     // setCategoryData(...categoryData,item.category);
  //     category[index] = item.category
  //     console.log(category[index]);
  //   })
  // }

  // console.log('CategoryData');
  // console.log(categoryData);
  // console.log("category");
  // console.log(category);
  const getCartData = async (url) => {
    try {
      await axios.get(url).then((response) => {
        setCartItems(response.data);
      })

    } catch (error) {
      console.log(error.message);
    }
  }

  const addToCart = async (item) => {
    item.quantity = 1;

    try {
      await axios.post("http://localhost:5000/cartItems", item).then((res) => {
        if (res !== undefined) {
          setCartItems([...cartItems, { ...item, quantity: 1 }])
        }
      })
    } catch (error) {
      console.log(error)
    }

  }

  const removeItemsFromCart = (id) => {
    const arr = cartItems.filter((obj) => obj.id !== id);
    setCartItems(arr)
  }

  const emptyCart = () => {
    setCartItems([])
  }


  const signIn = () => {
    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);
  }


  const signOut = () => {
    localStorage.removeItem('isLogin');
    setIsLogin(false);
  }


  const openFilters=()=>{
    setIsopenFilters(!isOpenFilters)
  }

  const value = {
    cartItems,
    isLogin,
    windowWidth,
    isOpenFilters,
    addToCart,
    removeItemsFromCart,
    emptyCart,
    signOut,
    signIn,
    openFilters,
    isopenNavigation,
    setIsopenNavigation
  }

  return (
    
    data.productData.length !== 0 &&
    <BrowserRouter>
      <MyContext.Provider value={value}>
        {
          isLoading===true && <div className='loader'><img src={Loader}/></div>
        }

        
        <Header data={data.productData} new={productData.products} category={categoryData}/>
        <Routes>
          {/* <Route exact={true} path="/" element={<Home data={data.productData} />} /> */}
          <Route exact={true} path="/" element={<Listing data={data.productData} new={productData.products} single={true} />} />
          <Route exact={true} path="/cat/:id" element={<Listing data={data.productData} single={true} />} />
          <Route exact={true} path="/cat/:id/:id" element={<Listing data={data.productData} single={false} />} />
          <Route exact={true} path="/product/:id" element={<DetailsPage data={data.productData} new={productData.products} />} />
          <Route exact={true} path="/cart" element={<Cart />} />
          <Route exact={true} path="/signIn" element={<SignIn />} />
          <Route exact={true} path="/signUp" element={<SignUp />} />
          <Route exact={true} path="*" element={<NotFound />} />
        </Routes>
       {/* <Footer/> */}
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;

export { MyContext }

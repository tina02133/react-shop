import logo from './logo.svg';
import './App.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import data from './data.js';
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './detail';

function App() {

  // import한 상품 data state에 저장하기
  let [shoe] = useState(data);
  let navigate = useNavigate();


  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* Router 사용하여 페이지 나누기  */}
      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg"></div>
            <div className="container">
              <div className="row">
                {/* map 반복문 사용 시 {} 로 묶어주기 
                     ()안의 a는 해당 반복회차의  shoe 데이터를 의미.
                     i는 반복하며 올라가는 고유의 수 ex) 0, 1, 2
                 */}
                {
                  shoe.map(function (a, i) {
                    return (
                      <Product shoe={shoe[i]} i={i} />
                    )
                  })
                }
              </div>
            </div>
          </>
        }></Route>
        {/* detail 상세페이지 여러개 만들때 :id 파라미터 이용하기 */}
        <Route path='/detail/:id' element={<Detail data = {data}/>}></Route>
        {/* 404페이지 */}
        <Route path='*' element={<div>없는 페이지입니다</div>}></Route>
        {/* nested routes */}
        <Route path='/about' element={<About/>}>
          <Route path='tel' element={<div>연락처 정보입니다</div>}></Route>
          <Route path='location' element={<div>위치 정보입니다</div>}></Route>
        </Route>
        <Route path='/event' element={<Event/>}>
           <Route path='one' element={<h4>첫 주문 시 양배추즙 서비스</h4>}></Route>
           <Route path='two' element={<h4>생일 기념 쿠폰</h4>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

//About => 회사 정보 컴포넌트 
function About(){
  return (
    <>
      <h3>회사 소개페이지입니다</h3>
      <Outlet></Outlet>
    </>
  )

}

//Event => 이벤트 정보 컴포넌트 만들기
function Event(){
  return(
    <>
      <h3>오늘의 이벤트</h3>
      <Outlet></Outlet>
    </>
  )
}


// 상품목록 컴포넌트 만들기 
function Product(props) {
  return (
    <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"} width="80%" />
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.content}</p>
      <p>{props.shoe.price}</p>
    </div>
  )
}

export default App;

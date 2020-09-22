import React from 'react';

import "./Home.css"
import Product from './Product';

function Home() {
    return (
      <div className="home">
        <img
          className="home__img"
          src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_es_US_1x._CB432534552_.jpg"
        />
        <div className="home__row">
          <Product
            id="22231"
            title="title"
            price={11.63}
            image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/July/amazonbasics_520x520._SY304_CB442725065_.jpg"
            rating={5}
          />
          <Product
            id="22231"
            title="title"
            price={11.63}
            image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/July/amazonbasics_520x520._SY304_CB442725065_.jpg"
            rating={5}
          />
        </div>
        <div className="home__row">
          <Product
            id="22231"
            title="title"
            price={11.63}
            image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/July/amazonbasics_520x520._SY304_CB442725065_.jpg"
            rating={5}
          />
          <Product
            id="22231"
            title="title"
            price={11.63}
            image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/July/amazonbasics_520x520._SY304_CB442725065_.jpg"
            rating={5}
          />
          <Product
            id="22231"
            title="title"
            price={11.63}
            image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/July/amazonbasics_520x520._SY304_CB442725065_.jpg"
            rating={5}
          />
        </div>
        <div className="home__row">
          <Product
            id="22231"
            title="title"
            price={11.63}
            image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/July/amazonbasics_520x520._SY304_CB442725065_.jpg"
            rating={5}
          />
        </div>
      </div>
    );
}

export default Home;

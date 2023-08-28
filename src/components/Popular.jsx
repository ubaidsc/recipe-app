import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import { Splide,SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

function Popular() {

  const [popular, setpopular] = useState([]);
  useEffect(() => {
    getpopularrecipies();
  }, []);
  const getpopularrecipies = async () => {
    const check =localStorage.getItem("popular");
    if(check){
      setpopular(JSON.parse(check));
    }else{
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=9&apiKey=${process.env.REACT_APP_API_KEY}`);
    const data = await response.json();
    localStorage.setItem("popular",JSON.stringify(data.recipes));
    setpopular(data.recipes);
    console.log(data.recipes);
    }
  };
  return (
    <div>
            <h3>Popular Picks</h3>
          <Wrapper>
    <Splide
   options={{
              perPage: 4,
              arrows: false,
              pagination: false,
              drag: 'free',
              gap: '5rem',
            }}>
      {popular.map((recipe) => {
        return (
            <SplideSlide key={recipe.id}>
            <Card>
              <p>{recipe.title}</p>
              <img src={recipe.image} alt={recipe.title} />
              <Gradient />
            </Card>
            </SplideSlide>
        )

      })}
      </Splide>
          </Wrapper>
          </div>
  )
}

const Wrapper = styled.div`
margin: 4rem 0rem;`;

const Card = styled.div`
min-height: 25rem;
border-radius: 2rem;
overflow: hidden;
img {
  border-radius: 2rem;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
p {
  position: absolute;
  z-index: 10;
  left: 50%;
  bottom: 2%;
  transform: translate(-50%, 0%);
  color: white;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}`;
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width : 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0,0,0,0.5));
  border-radius: 2rem;
`;

export default Popular
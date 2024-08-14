import React from 'react'
import Header from './Header'
import MainContainer from './MainContainer'

const NewPage = () => {
  const text1 = 'Marketplace For local Services';
  const text2 = 'Make your community turnkey.';
  const subText1 = 'At Assembly HOA Management, we combine Los Angeles best managers with modern transparent software to make your HOA experience seamless and stress-free.';
  const subText2 = 'At Assembly, we actively enhance and preserve your property value through strategic maintenance, improvements, and community engagement. Our industry expertise ensures your investment is protected and your property remains appealing for all homeowners.';
   return (
    <>
      <Header />
      <MainContainer text={text1} subText={subText1} img={'https://tagzybucket.s3.ap-south-1.amazonaws.com/tree.png'}/>
      <MainContainer text={text2} subText={subText2} img={'https://tagzybucket.s3.ap-south-1.amazonaws.com/home.jpeg'} reverse={true}/>
    </>
  )
}

export default NewPage
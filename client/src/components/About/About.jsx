import React from 'react';
import { BiCreditCard, BiGlobe, BiHomeAlt } from 'react-icons/bi';
import Aboutus_small from "../../assets/Home/Aboutus_small.jpg"
import Aboutus_Main from "../../assets/Home/Aboutus_Main.webp"


const AboutUs = () => {
  return (
    <div id="about-us" style={{ paddingTop: '4rem', paddingBottom: '5rem', paddingLeft: '25px', paddingRight: '25px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6rem' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '15rem' }}>
          <img
            // src="https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto/e_improve/e_sharpen:10/e_saturation:10/f_auto,q_auto/v1658734750/Website/CMS-Uploads/wg6h122g6xuyjzw90tyw.jpg"
            src={Aboutus_Main}
             alt=""
            style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '1rem' }}
          />
          <img
            src={Aboutus_small}
            alt=""
            style={{
              position: 'absolute',
              objectFit: 'cover',
              width: '12rem',
              height: '16rem',
              border: '4px solid white',
              borderRadius: '0.5rem',
              bottom: '-5rem',
              right: '-0.5rem',
              '@media (min-width: 640px)': { width: '18rem', height: '20rem', borderColor: '#2f3343' },
              '@media (min-width: 768px)': { right: '-5rem' }
            }}
          />
        </div>
        <div style={{ position: 'relative', flex: '1', minWidth: '22rem', marginLeft: '-10px' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#9dcd0e' }}>About us</h1>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#2078e3' }}>
          Find Your Perfect Stay, Effortlessly
          </h1>
          <p style={{ marginTop: '0.75rem' }}>
            At PGHub, we simplify your search for the perfect paying guest accommodation. Our platform connects you with a range of verified listings, ensuring comfort and convenience while you find your ideal home away from home.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '3rem',  // Increased size for square shape
                height: '2rem', // Increased size for square shape
                borderRadius: '0.5rem',
                backgroundColor: '#0096FF',
                color: 'white',
                fontSize: '1rem'  // Adjust font size to fit within the square container
              }}>
                <BiHomeAlt />
              </div>
              <div>
                <h1 style={{ fontWeight: '600', textTransform: 'capitalize' }}>the perfect residency</h1>
                <p>
                  Discover carefully vetted paying guest accommodations that match your lifestyle and budget, ensuring a comfortable and hassle-free living experience.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '3rem',  // Increased size for square shape
                height: '2rem', // Increased size for square shape
                borderRadius: '0.5rem',
                backgroundColor: '#0096FF',
                color: 'white',
                fontSize: '1rem'  // Adjust font size to fit within the square container
              }}>
                <BiGlobe />
              </div>
              <div>
                <h1 style={{ fontWeight: '600', textTransform: 'capitalize' }}>Accommodation Excellence</h1>
                <p>
                  Benefit from expert insights and recommendations tailored to your needs, provided by a team of professionals with extensive knowledge in accommodation standards.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '3rem',  // Increased size for square shape
                height: '2rem', // Increased size for square shape
                borderRadius: '0.5rem',
                backgroundColor: '#0096FF',
                color: 'white',
                fontSize: '1rem'  // Adjust font size to fit within the square container
              }}>
                <BiCreditCard />
              </div>
              <div>
                <h1 style={{ fontWeight: '600', textTransform: 'capitalize' }}>total payment transparency</h1>
                <p>
                  Enjoy clear and upfront pricing with no hidden fees, allowing you to make informed decisions and manage your budget with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

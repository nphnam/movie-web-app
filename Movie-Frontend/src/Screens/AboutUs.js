import React from 'react'
import Layout from './../Layout/Layout';
import Head from '../Components/Head';

function AboutUs() {
  return (
    <Layout>
      <div className='min-height-screen container mx-auto px-2 my-6'>
        <Head title ="About Us"/>
        <div className='xl:py-20 py-10 px-4'>
          <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center'>
            <div>
              <h3 className='text-xl lg:text-3xl mb-4 font-semibold'>
                Welcome to our Netflix Clone!
              </h3>
          
            <div className='mt-3 text-sm leading-8 text-text'>
              <p>
                Lorem  ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore etThis is a 
                project created by the team of students. This project is 
                a clone of the popular streaming service  Netflix. The aim  
                of this project is to create an application that provides  
                users with access to a vast library  of movies and TV shows, 
                as well as original content produced exclusively for  the  
                platform.  Users can search for content by genre or actor,
                add their favorite shows and films to a watch list, and rate  
                them so others know what they should be watching. Members 
                can also make comments on episodes and films.
              </p>
              <p>
                Lorem  ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore etThis is a 
                project created by the team of students. This project is 
                a clone of the popular streaming service  Netflix. The aim  
                of this project is to create an application that provides  
                users with access to a vast library  of movies and TV shows, 
                as well as original content produced exclusively for  the  
                platform.  Users can search for content by genre or actor,
                add their favorite shows and films to a watch list, and rate  
                them so others know what they should be watching. Members 
                can also make comments on episodes and films.
              </p>
            </div>
            <div className='grid md:grid-cols-2 gap-6 mt-8'>
                <div className='p-8 bg-dry rounded-lg'>
                  <span className='text-3xl block font-extrabold mt-4'>
                    10K
                  </span>
                  <h4 className='text-lg font-semibold my-2'>Listed Movies</h4>
                  <p className='mb-0 text-text leading-7 text-sm'>
                    Lorem Ipsum is simply dummy text of the printing and
                  </p>
                </div>
                <div className='p-8 bg-dry rounded-lg'>
                  <span className='text-3xl block font-extrabold mt-4'>
                    8K
                  </span>
                  <h4 className='text-lg font-semibold my-2'>Lovely Users</h4>
                  <p className='mb-0 text-text leading-7 text-sm'>
                    Lorem Ipsum is simply dummy text of the printing and
                  </p>
                </div>
            </div>
            </div>
            <div className='mt-10 lg:mt-0'>
              <img
              src="/images/head.png"
              alt='aboutus'
              className='w-full xl:block hidden h-header rounded-lg object-cover'
              />

          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default AboutUs

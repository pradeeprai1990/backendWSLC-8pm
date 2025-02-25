import React from 'react'

export default function FeaturedCategories({category,categoryPath}) {
    let apiBaseUrl=process.env.NEXT_PUBLIC_APIURL;  
  return (
    <section className='max-w-[1460px] mx-auto py-[50px]'>
        <h3 className='md:text-[32px] text-[22px] font-medium'>Featured Categories</h3>
        <div className='grid md:grid-cols-4 grid-cols-2 md:space-y-0 xs:space-y-8 space-y-12 py-[50px] md:gap-5 gap-3'>
           {category.map((data,index)=>   <div className='cursor-pointer '>
                <div className=' w-full h-full'>
                    <img className='w-full h-full object-cover' src={apiBaseUrl+categoryPath+data.catImage} alt="Womens Denim" />
                <h5 className='text-[15px] mt-2 font-semibold'>
                    {data.catName}
                </h5>
                </div>
            </div>)}
         
            
        </div>
    </section>
  )
}
import React from 'react';

const SectionTitle = ({heading , subHeading}) => {
    return (
        <div className='md:w-4/12 text-center mx-auto my-8'>
            <p className='text-yellow-500 mb-2'>---{heading}---</p>
            <h3 className='text-3xl uppercase border-y-4 py-4'>{subHeading}</h3>
        </div>
    );
};

export default SectionTitle;
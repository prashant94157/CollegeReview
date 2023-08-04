import React from 'react';

const User = () => {
  return (
    <div className='grid grid-cols-3 gap-2 px-4 shadow-md py-7 rounded-2xl'>
      <div className='col-span-2'>Bright Way Inter College</div>
      <div>&#9733;&#9733;&#9733;&#9733;&#9733;</div>

      <div className='col-span-2'>Degree</div>
      <div>Date</div>
      <div className='col-span-3 font-bold'>title</div>

      <div className='col-span-3'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
        ratione aliquam, cumque quis magni doloribus ut id veniam incidunt
        ducimus, quidem molestiae. Sed, accusantium. Sunt unde illo possimus
        optio accusamus.
      </div>
    </div>
  );
};

export default User;

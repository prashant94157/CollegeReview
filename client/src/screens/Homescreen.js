import React from 'react';
import Register from '../components/Register';
import Login from '../components/Login';

export default function Homescreen() {
  return (
    <div className=''>
      <div className='pt-10 text-6xl font-bold text-center'>College Review</div>
      <div className='flex justify-center'>
        <div className='w-1/2 px-24 py-20'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          vel, assumenda at voluptatum pariatur enim nemo atque praesentium
          provident. Atque eligendi cum eius fugit porro minima dignissimos
          possimus ipsa maxime, voluptatum quasi odio eaque soluta?
          Reprehenderit alias, similique architecto, fugiat iure quo fuga
          obcaecati beatae ut laboriosam sequi, eius perspiciatis ea maxime
          inventore corporis ex quae ratione possimus. Neque cumque, maxime
          consequatur assumenda suscipit quisquam, veritatis non rem quis,
          repudiandae voluptate in delectus accusantium necessitatibus sed
          aspernatur omnis enim et recusandae explicabo accusamus mollitia
          libero quam ab. In, excepturi exercitationem! Nisi rem excepturi iste
          eaque consequuntur magnam est doloribus dolorem!
        </div>
        <div className='w-1/2'>
          {/* <Register /> */}
          <Login />
        </div>
      </div>
    </div>
  );
}

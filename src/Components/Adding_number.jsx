import React, { useState } from 'react';

function Adding_number() {
  const [a, setA] = useState(40);

  return (
    <div className='w-full h-screen bg-zinc-900 text-white p-5'>
      <h1 className='w-40 h-45 bg-sky-400 rounded-sm justify-center text-center p-5'>{a}</h1>
      <button onClick={() => setA(a + 1)} className='w-40 h-45 bg-blue-900'>
        Click
      </button>
    </div>
  );
}

export default Adding_number;

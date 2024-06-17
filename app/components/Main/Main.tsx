'use client';

import { useState } from 'react';
import { getResponse } from '../../actions';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export default function Home() {
  const [generation, setGeneration] = useState<string>('');

  return (
    <section className='py-20'>
      <div className="inner">
        <button className='bg-blue-600 px-10 py-5 rounded-xl text-white font-bold hover:bg-blue-700 transition-colors duration-200 ease-in-out'
          onClick={async () => {
            const { text } = await getResponse('Generate me 5 funny medieval/fancy insults.');
            setGeneration(text);
          }}
        >
          Give me a fancy insult
        </button>
        <div>{generation}</div>
      </div>
    </section>
  );
}
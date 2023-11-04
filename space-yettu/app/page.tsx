"use client";

import { useState } from 'react';
import { UserButton } from "@clerk/nextjs";

interface Space {
  name: string;
  description: string;
  image: string;
}

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [spaces, setSpaces] = useState<Space[]>([]);

  const handleListSpaceClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const image = URL.createObjectURL(formData.get('image') as Blob);
    const newSpace = { name, description, image };
    setSpaces([...spaces, newSpace]);
    setShowForm(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-end items-center w-full">
        {showForm ? (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label htmlFor="name" className="font-bold">Name:</label>
          <input type="text" id="name" name="name" className="border-2 border-gray-300 p-2 rounded-md" />
          
          <label htmlFor="description" className="font-bold">Description:</label>
          <input type="text" id="description" name="description" className="border-2 border-gray-300 p-2 rounded-md" />
          
          <input type="file" id="image" name="image" className="border-2 border-gray-300 p-2 rounded-md" />
          <label htmlFor='image' className="font-bold">Upload Image</label>
          
          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
        ) : (
          <div className="flex space-x-4">
            <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded' onClick={handleListSpaceClick}>
              + List your space
            </button>
            <UserButton afterSignOutUrl="/"/>
          </div>
        )}
      </div>
      {spaces.map((space, index) => (
        <div key={index}>
          <h2>{space.name}</h2>
          <p>{space.description}</p>
          <img src={space.image} alt={space.name} />
        </div>
      ))}
    </main>
  );
}
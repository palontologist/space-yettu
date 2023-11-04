"use client";

import { useState, useEffect } from 'react';
import { UserButton } from "@clerk/nextjs";

interface Space {
  name: string;
  description: string;
  image: string;
}

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [spaces, setSpaces] = useState<Space[]>([]);

  useEffect(() => {
    const storedSpaces = localStorage.getItem('spaces');
    if (storedSpaces) {
      setSpaces(JSON.parse(storedSpaces));
    }
  }, []);

  const handleListSpaceClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const file = formData.get('image') as File;
    const reader = new FileReader();

    reader.onloadend = function () {
      const base64String = reader.result as string;
      const newSpace = { name, description, image: base64String };
      const updatedSpaces = [...spaces, newSpace];
      setSpaces(updatedSpaces);
      localStorage.setItem('spaces', JSON.stringify(updatedSpaces));
      setShowForm(false);
    };

    reader.readAsDataURL(file);
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
  <div key={index} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
    <div className="md:flex">
      <div className="md:flex-shrink-0">
        <img className="h-48 w-full object-cover md:w-48" src={space.image} alt={space.name} />
      </div>
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{space.name}</div>
        <p className="mt-2 text-gray-500">{space.description}</p>
      </div>
    </div>
  </div>
))}
    </main>
  );
}
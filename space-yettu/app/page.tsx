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
  const [showBetaForm, setShowBetaForm] = useState(false);
  const [spaces, setSpaces] = useState<Space[]>([]);

  useEffect(() => {
    const storedSpaces = localStorage.getItem('spaces');
    if (storedSpaces) {
      setSpaces(JSON.parse(storedSpaces));
    }
  }, []);

  const handleListSpaceClick = () => {
    setShowForm(!showForm);
  };

  const handleBookSpaceClick = () => {
    setShowBetaForm(!showBetaForm);
  };

  const handleClearSpaces = () => {
    localStorage.removeItem('spaces');
    setSpaces([]);
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

  const handleBetaFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you can handle the beta form submission, for example, send the data to an API or store it in LocalStorage
    setShowBetaForm(false);
  };

  return (
    <main className="bg-gray-100 min-h-screen p-6">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-4xl font-bold text-blue-600">Space Yettu</h1>
        <div className="flex space-x-4">
          <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded' onClick={handleListSpaceClick}>
            + List your space
          </button>
          <button className='bg-green-500 text-white font-bold py-2 px-4 rounded' onClick={handleBookSpaceClick}>
            Book your space
          </button>
          <button className='bg-white-500 text-white font-bold py-2 px-4 rounded' onClick={handleClearSpaces}>
            Clear spaces
          </button>
          <UserButton afterSignOutUrl="/"/>
        </div>
      </div>

      <header className="container mx-auto text-center mt-10">
        <p className="max-w-4xl text-2xl md:text-3xl lg:text-4xl text-gray-700 mt-2 mx-auto">Connecting <span className='text-blue-600'>creatives</span> with spaces to work and create</p>
      </header>

      {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-10">
          <label htmlFor="name" className="font-bold">Name:</label>
          <input type="text" id="name" name="name" className="text-black border-2 border-gray-300 p-2 rounded-md" />
          
          <label htmlFor="description" className="font-bold">Description:</label>
          <input type="text" id="description" name="description" className="border-2 border-gray-300 text-black p-2 rounded-md" />
          
          <input type="file" id="image" name="image" className="border-2 border-gray-300 p-2 rounded-md" />
          <label htmlFor='image' className="font-bold">Upload Image</label>
          
          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
      )}

      {showBetaForm && (
        <form onSubmit={handleBetaFormSubmit} className="flex flex-col space-y-4 mt-10">
          <label htmlFor="email" className="font-bold">Email:</label>
          <input type="email" id="email" name="email" className="border-2 border-gray-300 p-2 rounded-md" required />
          
          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
      )}

      <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {spaces.map((space, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
            <img className="h-full w-full object-cover md:w-full" src={space.image} alt={space.name} />
            <div className="p-6">
              <h2 className="text-2xl font-bold">{space.name}</h2>
              <p className="text-gray-700 mt-2">{space.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
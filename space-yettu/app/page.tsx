"use client";

import { useState } from 'react';

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
      <div className="flex flex-col items-center justify-center">
        {showForm ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" />
            <input type="file" id="image" name="image" />
            <label htmlFor='image'>Upload Image</label>
            <button type="submit">Submit</button>
          </form>
        ) : (
          <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded' onClick={handleListSpaceClick}>
            + List your space
          </button>
        )}
        {spaces.map((space, index) => (
          <div key={index}>
            <h2>{space.name}</h2>
            <p>{space.description}</p>
            <img src={space.image} alt={space.name} />
          </div>
        ))}
      </div>
    </main>
  );
}
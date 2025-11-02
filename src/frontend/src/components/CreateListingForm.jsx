import { useState, useEffect } from 'react';
import { TextInput, Textarea, NumberInput, FileInput, Button, Group, Box, Image } from '@mantine/core';
import { useNavigate } from 'react-router-dom';


export function CreateListingForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState(''); 
  const [location, setLocation] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [price, setPrice] = useState(1); 
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  // const [description, setDescription] = useState('');



  useEffect(() => {
    if (!file) {
      setPreviewUrl(null); // Reset preview if no file
      return;
    }

    const objectUrl = URL.createObjectURL(file); // Create temporary URL for preview
    setPreviewUrl(objectUrl);

    // Cleanup URL when component unmounts or file changes to avoid memory leaks
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  // this should generate a description given a file
  // this formData seems to be correct
  const generateDescription = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('prompt', 'You are a food reviewer but are not critical. Generate a short, detailed, and appetizing description for a food listing based on the image provided. Do not speak to me. Only describe the food.');

    // You can replace this with a real AI-generated string later
    const response = await fetch('http://localhost:3000/generate', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json();
    setDescription(data.text);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setIsLoading(true);

    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('location', location) 

    // await fetch('http://localhost:3000/listings', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   file: file,
    //   body: JSON.stringify({ "title": title, "description": description, "price": price, "location": location }),
    // })
    await fetch('http://localhost:3000/listings', {
      method: 'POST',
      body: formData,
    })
    setIsLoading(false)
    navigate('/')

  };

  return (
    <Box component="form" maw={500} mx="auto" onSubmit={handleSubmit}>
      <TextInput
        label="Food Title:"
        placeholder="e.g., Chicken Alfredo"
        required
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
      />

      <TextInput
        label="Pickup Location:"
        placeholder="Where can the food be picked up?"
        required
        mt="md"
        value={location}
        onChange={(event) => setLocation(event.currentTarget.value)}
      />

      <>
      <Textarea
        label="Description:"
        placeholder="Tell us about the food..."
        required
        mt="md"
        value={description}
        onChange={(event) => setDescription(event.currentTarget.value)}
      />

      <Group mt="xs">
        <Button variant="light" onClick={generateDescription}>
          Generate Description
        </Button>
        <Button variant="default" onClick={() => setDescription('')}>
          Clear
        </Button>
      </Group>
    </>

      <NumberInput
        label="Price:"
        placeholder="Set a price"
        required
        min={0}
        max={10}
        mt="md"
        value={price}
        onChange={setPrice}
        prefix="$"
      />

      <FileInput
        label="Upload Food Photo:"
        placeholder="Click to upload an image"
        required
        mt="md"
        value={file}
        onChange={setFile}
        accept="image/png,image/jpeg"
      />

      {previewUrl && (
        <Image
          src={previewUrl}
          alt="Food preview"
          mt="md"
          radius="md"
          withPlaceholder
          height={500}
          fit="cover"
        />
      )}

      <Group justify="flex-end" mt="xl">
        <Button type="submit" loading={isLoading}>
          Post Meal
        </Button>
      </Group>
    </Box>
  );
}
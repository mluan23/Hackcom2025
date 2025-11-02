import { useState } from 'react';
import { TextInput, Textarea, NumberInput, FileInput, Button, Group, Box } from '@mantine/core';

export function CreateListingForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(1);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    // TODO: 
    // 1. Upload the 'file' to your storage (like Supabase storage).
    // 2. Get the image URL back.
    // 3. Send title, description, price, and the image URL to your backend.
    
    console.log({ title, description, price, file });
    
    setTimeout(() => {
      alert('Listing created!');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box component="form" maw={500} mx="auto" onSubmit={handleSubmit}>
      <TextInput
        label="Food Title"
        placeholder="e.g., Leftover Lasagna"
        required
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
      />
      <Textarea
        label="Description"
        placeholder="Tell us about the food..."
        required
        mt="md"
        value={description}
        onChange={(event) => setDescription(event.currentTarget.value)}
      />
      <NumberInput
        label="Price"
        placeholder="Set a price"
        required
        min={1}
        max={20}
        mt="md"
        value={price}
        onChange={setPrice}
        prefix="$"
      />
      <FileInput
        label="Upload Food Photo"
        placeholder="Click to upload an image"
        required
        mt="md"
        value={file}
        onChange={setFile}
        accept="image/png,image/jpeg"
      />
      <Group justify="flex-end" mt="xl">
        <Button type="submit" loading={isLoading}>
          Post Meal
        </Button>
      </Group>
    </Box>
  );
}
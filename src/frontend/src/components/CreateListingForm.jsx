import { useState, useEffect } from 'react';
import { TextInput, Textarea, NumberInput, FileInput, Button, Group, Box, Image } from '@mantine/core';

export function CreateListingForm() {
  // 1️⃣ Form state
  const [title, setTitle] = useState(''); // Food title
  const [description, setDescription] = useState(''); // Food description
  const [price, setPrice] = useState(1); // Food price
  const [file, setFile] = useState(null); // Uploaded image file
  const [previewUrl, setPreviewUrl] = useState(null); // Preview URL for image
  const [isLoading, setIsLoading] = useState(false); // Loading state for submit button

  // 2️⃣ Generate preview when user selects a file
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

  // 3️⃣ Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    setIsLoading(true); // Show loading state

    // TODO: Upload file & send listing data to backend
    console.log({ title, description, price, file });

    // Simulate an API call
    setTimeout(() => {
      alert('Listing created!');
      setIsLoading(false);
    }, 1000);
  };

  // 4️⃣ Render form
  return (
    <Box component="form" maw={500} mx="auto" onSubmit={handleSubmit}>
      {/* Food title input */}
      <TextInput
        label="Food Title:"
        placeholder="e.g., Chicken Alfredo"
        required
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
      />

      {/* Description input */}
      <Textarea
        label="Description:"
        placeholder="Tell us about the food..."
        required
        mt="md"
        value={description}
        onChange={(event) => setDescription(event.currentTarget.value)}
      />

      {/* Price input */}
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

      {/* File upload input */}
      <FileInput
        label="Upload Food Photo:"
        placeholder="Click to upload an image"
        required
        mt="md"
        value={file}
        onChange={setFile}
        accept="image/png,image/jpeg"
      />

      {/* Live image preview */}
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

      {/* Submit button */}
      <Group justify="flex-end" mt="xl">
        <Button type="submit" loading={isLoading}>
          Post Meal
        </Button>
      </Group>
    </Box>
  );
}
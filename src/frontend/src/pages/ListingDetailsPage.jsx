import { useEffect, useState } from 'react';
import { Title, Button } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';

export function ListingDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [purchased, setPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchListing() {
      const response = await fetch(`http://localhost:3000/listings/${id}`);
      const data = await response.json();
      setPurchased(data.purchased);
      setIsLoading(false);
    }

    fetchListing();
  }, [id]);

  const handlePurchase = async () => {
    if (purchased) return;

    await fetch(`http://localhost:3000/listings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });

    navigate('/');
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Title>Listing Details Page</Title>
      <p>This is where the details of a specific food listing will go!</p>
      <Button
        onClick={handlePurchase}
        disabled={purchased}
        color={purchased ? 'gray' : 'green'}
      >
        {purchased ? 'Already Purchased' : 'Purchase'}
      </Button>

      <elevenlabs-convai agent-id="agent_5301k91vw62efr3vpgck0ggw3qd7"></elevenlabs-convai>
      <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
    </div>
  );
}
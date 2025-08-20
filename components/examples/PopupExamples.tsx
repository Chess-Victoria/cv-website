'use client'

import { useState } from 'react';
import Popup from '@/components/layout/Popup';
import { PopupContent } from '@/lib/types/popup';

export default function PopupExamples() {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  // Example 1: Simple popup with basic content
  const simplePopup: PopupContent = {
    title: "Welcome to Chess Victoria",
    description: "Join our community and discover the world of chess.",
    actionButton: {
      text: "Join Now",
      url: "/members"
    }
  };

  // Example 2: Popup with items list
  const itemsPopup: PopupContent = {
    title: "Upcoming Events",
    description: "Don't miss these exciting chess events:",
    items: [
      "Chess Tournament - March 15th",
      "Beginner Workshop - March 20th",
      "Advanced Strategy Session - March 25th"
    ],
    actionButton: {
      text: "View All Events",
      url: "/events"
    }
  };

  // Example 3: Popup with custom logo and no "No thanks" button
  const customPopup: PopupContent = {
    title: "Special Offer",
    description: "Get 50% off your first membership!",
    logo: {
      src: "/assets/img/logo/cvlogo.png",
      alt: "Chess Victoria Logo"
    },
    actionButton: {
      text: "Claim Offer",
      onClick: () => {
        setActivePopup(null);
      }
    },
    showNoThanks: false
  };

  // Example 4: Popup with custom "No thanks" text
  const customNoThanksPopup: PopupContent = {
    title: "Newsletter Subscription",
    description: "Stay updated with the latest chess news and tips.",
    actionButton: {
      text: "Subscribe",
      onClick: () => {
        setActivePopup(null);
      }
    },
    noThanksText: "Maybe later"
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Popup Component Examples</h1>
      <p>This page demonstrates different ways to use the decoupled Popup component.</p>

      <div style={{ marginBottom: '30px' }}>
        <h2>Example 1: Simple Popup</h2>
        <button 
          onClick={() => setActivePopup('simple')}
          style={{ padding: '10px 20px', marginRight: '10px' }}
        >
          Show Simple Popup
        </button>
        <p>Basic popup with title, description, and action button.</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Example 2: Popup with Items List</h2>
        <button 
          onClick={() => setActivePopup('items')}
          style={{ padding: '10px 20px', marginRight: '10px' }}
        >
          Show Items Popup
        </button>
        <p>Popup with a list of items and action button.</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Example 3: Custom Popup (No "No thanks" button)</h2>
        <button 
          onClick={() => setActivePopup('custom')}
          style={{ padding: '10px 20px', marginRight: '10px' }}
        >
          Show Custom Popup
        </button>
        <p>Popup with custom logo and no "No thanks" option.</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Example 4: Custom "No thanks" Text</h2>
        <button 
          onClick={() => setActivePopup('customNoThanks')}
          style={{ padding: '10px 20px', marginRight: '10px' }}
        >
          Show Custom No Thanks Popup
        </button>
        <p>Popup with custom "No thanks" text.</p>
      </div>

      {/* Render active popup */}
      {activePopup === 'simple' && (
        <Popup
          content={simplePopup}
          isVisible={true}
          onClose={() => setActivePopup(null)}
          onNoThanks={() => setActivePopup(null)}
          onAction={() => {
            setActivePopup(null);
          }}
        />
      )}

      {activePopup === 'items' && (
        <Popup
          content={itemsPopup}
          isVisible={true}
          onClose={() => setActivePopup(null)}
          onNoThanks={() => setActivePopup(null)}
          onAction={() => {
            setActivePopup(null);
          }}
        />
      )}

      {activePopup === 'custom' && (
        <Popup
          content={customPopup}
          isVisible={true}
          onClose={() => setActivePopup(null)}
          onAction={() => {
            setActivePopup(null);
          }}
        />
      )}

      {activePopup === 'customNoThanks' && (
        <Popup
          content={customNoThanksPopup}
          isVisible={true}
          onClose={() => setActivePopup(null)}
          onNoThanks={() => setActivePopup(null)}
          onAction={() => {
            setActivePopup(null);
          }}
        />
      )}
    </div>
  );
}


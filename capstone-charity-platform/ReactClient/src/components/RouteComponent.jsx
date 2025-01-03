import React from "react";
import { useState } from "react";

function RouteComponent() {

    const [photo, setPhoto] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [summary, setSummary] = useState('');
    
        const fetchRoute = async (e) => {
            e.preventDefault();

            try {
                const response = await fetch(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/Charities`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ photo, title, category, summary })
                });
                
                if (response.ok) {
                    console.log('Data sent successfully:')
                } else {
                    console.error('Error sending data:', response.status)
                }

            } catch (error) {
                console.error('Error sending data:', error);
            }
        };
       
//check to see if type for photo is text or something else, and if the other type="" are correct
    return (
        <>
        <form onSubmit={fetchRoute}>
            <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="image" />
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="category" />
            <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="summary" />
            <button type="submit">Submit</button>
        </form>
        </>
    )
};

export default RouteComponent

/*
_id: "1", //unique ID for each of the post
      photo:
        "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?cs=srgb&dl=pexels-rdne-6646918.jpg&fm=jpg",
      title: "Lunchroom Volunteer",
      category: "Food",
      summary:
        "Help out the lunch team at local schools",
*/
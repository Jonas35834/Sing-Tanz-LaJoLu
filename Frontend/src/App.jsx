import React, { useEffect, useState } from 'react';
async function fetchSongs() {
setLoading(true);
try {
const res = await axios.get(`${API_BASE}/api/songs`);
setSongs(res.data);
} catch (err) {
console.error(err);
} finally {
setLoading(false);
}
}


async function handleUpload(formData) {
try {
const res = await axios.post(`${API_BASE}/api/songs/upload`, formData, {
headers: { 'Content-Type': 'multipart/form-data' }
});
setSongs(prev => [res.data, ...prev]);
return { ok: true };
} catch (err) {
console.error(err);
return { ok: false, error: err.response?.data || err.message };
}
}


return (
<div className="max-w-4xl mx-auto p-6">
<header className="mb-6">
<h1 className="text-3xl font-bold">Unsere Familienmusik</h1>
<p className="text-sm text-gray-600">Lieder hochladen und anhören — für eure kleinen Konzerte.</p>
</header>


<section className="mb-6">
<UploadForm onUpload={handleUpload} />
</section>


<section>
<h2 className="text-2xl font-semibold mb-4">Songs</h2>
{loading ? (
<p>Lade Songs...</p>
) : songs.length === 0 ? (
<p>Noch keine Songs. Ladet euer erstes Lied hoch!</p>
) : (
<div className="grid gap-4">
{songs.map(song => (
<SongCard key={song.id} song={song} apiBase={API_BASE} />
))}
</div>
)}
</section>
</div>
);
}

import React, { useState } from 'react';


export default function UploadForm({ onUpload }) {
const [title, setTitle] = useState('');
const [artist, setArtist] = useState('');
const [file, setFile] = useState(null);
const [busy, setBusy] = useState(false);
const [msg, setMsg] = useState(null);


async function submit(e) {
e.preventDefault();
if (!file) return setMsg('Bitte eine Audiodatei wählen.');
const fd = new FormData();
fd.append('audio', file);
fd.append('title', title);
fd.append('artist', artist);


setBusy(true);
const res = await onUpload(fd);
setBusy(false);


if (res.ok) {
setMsg('Upload erfolgreich!');
setTitle(''); setArtist(''); setFile(null);
} else {
setMsg('Upload fehlgeschlagen');
}
}


return (
<form onSubmit={submit} className="p-4 bg-white rounded shadow">
<div className="mb-2">
<label className="block text-sm">Titel</label>
<input value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" />
</div>
<div className="mb-2">
<label className="block text-sm">Künstler</label>
<input value={artist} onChange={e => setArtist(e.target.value)} className="w-full p-2 border rounded" />
</div>
<div className="mb-2">
<label className="block text-sm">Audiodatei (MP3/WAV)</label>
<input type="file" accept="audio/*" onChange={e => setFile(e.target.files[0])} />
</div>
<div className="flex items-center gap-3">
<button disabled={busy} className="px-4 py-2 bg-blue-600 text-white rounded">{busy ? 'Lade...' : 'Hochladen'}</button>
{msg && <span className="text-sm text-gray-600">{msg}</span>}
</div>
</form>
);
}

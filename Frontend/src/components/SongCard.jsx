import React from 'react';


export default function SongCard({ song, apiBase }) {
const audioSrc = song.url.startsWith('http') ? song.url : `${apiBase}${song.url}`;


return (
<div className="p-4 bg-white rounded shadow flex items-center gap-4">
<div className="flex-1">
<div className="fo

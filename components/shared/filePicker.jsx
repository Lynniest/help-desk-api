import { useFilePicker } from 'use-file-picker';
import React, { useEffect } from 'react';
import Image from 'next/image';


export default function FilePicker({ onFilesChange }) {
  const { openFilePicker, filesContent, loading, clear } = useFilePicker({
    accept: '.txt,image/*,application/pdf,.doc,.docx,',
    multiple: false,
    readAs: 'DataURL',
  });

  useEffect(() => {
    onFilesChange(filesContent);
  }, [filesContent, onFilesChange]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => openFilePicker()}>Select files</button>
      <br />
      <button onClick={() => clear()}>Clear</button>
      {/* Display the selected files */}
      {filesContent.map((file, index) => {
        const extension = file.name.split('.').pop().toLowerCase();
        return (
          <div key={index}>
            {['jpg', 'jpeg', 'png', 'gif'].includes(extension) ?
              <Image src={file.content} alt={file.name} width={300} height={300} /> :
              <h2>{file.name}</h2>
            }
          </div>
        );
      })}
    </div>
  );
}
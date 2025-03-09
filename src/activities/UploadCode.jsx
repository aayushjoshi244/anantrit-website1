import React, { useState, useEffect } from "react";
import { FaFolder, FaFileUpload } from "react-icons/fa";

const Repository = () => {
  const [folders, setFolders] = useState({});
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({});

  useEffect(() => {
    const storedFolders = JSON.parse(localStorage.getItem("folders")) || {};
    setFolders(storedFolders);
  }, []);

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;

    const updatedFolders = { ...folders, [newFolderName]: [] };
    setFolders(updatedFolders);
    setNewFolderName("");
    localStorage.setItem("folders", JSON.stringify(updatedFolders));
  };

  const handleFileUpload = (event) => {
    if (!selectedFolder) return;

    const files = Array.from(event.target.files);
    const updatedFolders = {
      ...folders,
      [selectedFolder]: [...(folders[selectedFolder] || []), ...files.map((file) => file.name)],
    };
    
    setFolders(updatedFolders);
    setUploadedFiles({ ...uploadedFiles, [selectedFolder]: files });
    localStorage.setItem("folders", JSON.stringify(updatedFolders));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold mb-5">Repository</h1>
      
      <div className="mb-5 flex gap-3">
        <input
          type="text"
          placeholder="Enter folder name"
          className="p-2 rounded bg-gray-800 border border-gray-600 text-white"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button
          onClick={handleCreateFolder}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Create Folder
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {Object.keys(folders).map((folder) => (
          <div
            key={folder}
            className="p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
            onClick={() => setSelectedFolder(folder)}
          >
            <FaFolder className="text-yellow-400 text-3xl" />
            <p className="mt-2 text-lg">{folder}</p>
          </div>
        ))}
      </div>

      {selectedFolder && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">{selectedFolder} - Upload Files</h2>
          <input type="file" multiple onChange={handleFileUpload} className="mb-3" />
          
          <h3 className="text-lg font-semibold mt-3">Files:</h3>
          <ul className="mt-2 text-gray-300">
            {folders[selectedFolder].length === 0 ? (
              <p>No files uploaded.</p>
            ) : (
              folders[selectedFolder].map((file, index) => (
                <li key={index} className="mt-1">📄 {file}</li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Repository;

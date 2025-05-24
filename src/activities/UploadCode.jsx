import React, { useState, useRef, useEffect } from 'react';
import {
  FaUpload,
  FaTrash,
  FaDownload,
  FaShare,
  FaStar,
  FaFolder,
  FaFolderOpen,
  FaTimes
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const RepositorySection = ({ user }) => {
  // State for repository creation
  const [newRepoName, setNewRepoName] = useState('');
  const [newRepoDescription, setNewRepoDescription] = useState('');
  const [newRepoLanguage, setNewRepoLanguage] = useState('JavaScript');
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [repositories, setRepositories] = useState([]);
  
  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Load repositories from localStorage on component mount
  useEffect(() => {
    const storedRepos = JSON.parse(localStorage.getItem("repositories")) || [];
    setRepositories(storedRepos);
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
  };

  const handleUpload = async () => {
    if (!newRepoName || !newRepoLanguage) {
      toast.error('Repository name and language are required');
      return;
    }

    if (uploadedFiles.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      uploadedFiles.forEach(file => {
        formData.append('files', file);
      });

      formData.append('name', newRepoName);
      formData.append('description', newRepoDescription);
      formData.append('language', newRepoLanguage);

      const response = await axios.post('/api/repositories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });

      const updatedRepos = [response.data, ...repositories];
      setRepositories(updatedRepos);
      localStorage.setItem("repositories", JSON.stringify(updatedRepos));
      
      // Reset form
      setNewRepoName('');
      setNewRepoDescription('');
      setNewRepoLanguage('JavaScript');
      setUploadedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      toast.success('Repository created successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(`Upload failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteRepo = (repoId) => {
    const updatedRepos = repositories.filter(repo => repo.id !== repoId);
    setRepositories(updatedRepos);
    localStorage.setItem("repositories", JSON.stringify(updatedRepos));
    if (selectedRepo && selectedRepo.id === repoId) {
      setSelectedRepo(null);
    }
    toast.success('Repository deleted');
  };

  const handleStarRepo = (repoId) => {
    const updatedRepos = repositories.map(repo => 
      repo.id === repoId ? { ...repo, stars: repo.stars + 1 } : repo
    );
    setRepositories(updatedRepos);
    localStorage.setItem("repositories", JSON.stringify(updatedRepos));
    toast.success('Repository starred!');
  };

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      Python: '#3572A5',
      Java: '#b07219',
      'C++': '#f34b7d',
      Go: '#00ADD8',
      Ruby: '#701516',
      TypeScript: '#2b7489',
      PHP: '#4F5D95'
    };
    return colors[language] || '#cccccc';
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Create Repository Card */}
      <div className="bg-gray-800/90 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-white">Create a Repository</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Repository Name*</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="my-awesome-project"
                value={newRepoName}
                onChange={(e) => setNewRepoName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Language*</label>
              <select
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900/80 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newRepoLanguage}
                onChange={(e) => setNewRepoLanguage(e.target.value)}
                required
              >
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="Go">Go</option>
                <option value="Ruby">Ruby</option>
                <option value="TypeScript">TypeScript</option>
                <option value="PHP">PHP</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="A brief description of your project"
              value={newRepoDescription}
              onChange={(e) => setNewRepoDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* File Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Project Files*</label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center transition-colors hover:border-blue-500">
              <input
                type="file"
                id="repo-upload"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                webkitdirectory="true"
                directory="true"
                multiple
              />
              <label
                htmlFor="repo-upload"
                className="cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                <FaUpload className="text-3xl text-blue-400" />
                <p className="text-lg font-medium">Upload Project Directory</p>
                <p className="text-sm text-gray-400">
                  {uploadedFiles.length > 0 
                    ? `${uploadedFiles.length} files selected` 
                    : "Drag and drop your project folder here or click to browse"}
                </p>
                {isUploading && (
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={handleUpload}
          className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          disabled={isUploading || !newRepoName || !newRepoLanguage || uploadedFiles.length === 0}
        >
          {isUploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            'Create Repository'
          )}
        </button>
      </div>

      {/* Repositories List */}
      <div className="bg-gray-800/90 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Your Repositories</h2>
          <span className="text-gray-400 text-sm">{repositories.length} {repositories.length === 1 ? 'repository' : 'repositories'}</span>
        </div>
        
        {repositories.length === 0 ? (
          <div className="text-center py-8">
            <FaFolderOpen className="mx-auto text-gray-500 text-4xl mb-2" />
            <p className="text-gray-400">No repositories yet. Create your first repository!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repositories.map((repo) => (
              <div
                key={repo.id}
                className="bg-gray-900/80 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors duration-200 group cursor-pointer"
                onClick={() => setSelectedRepo(repo)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <FaFolder className="text-blue-400 mr-2 flex-shrink-0" />
                      <h3 className="text-lg font-semibold truncate">{repo.name}</h3>
                    </div>
                    <p className="text-gray-400 text-sm mt-1 truncate">
                      {repo.description || "No description provided"}
                    </p>
                    <div className="flex items-center mt-3 text-xs space-x-4">
                      <span className="flex items-center">
                        <span 
                          className="w-2.5 h-2.5 rounded-full mr-1.5"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        ></span>
                        {repo.language}
                      </span>
                      <span className="flex items-center text-yellow-400">
                        <FaStar className="mr-1" />
                        {repo.stars}
                      </span>
                    </div>
                  </div>
                  <button
                    className="text-gray-500 hover:text-red-500 ml-2 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRepo(repo.id);
                    }}
                    aria-label="Delete repository"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Repository Detail Modal */}
      {selectedRepo && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedRepo.name}</h2>
                <div className="flex items-center mt-1 text-sm text-gray-400 space-x-4">
                  <span className="flex items-center">
                    <span 
                      className="w-2.5 h-2.5 rounded-full mr-1.5"
                      style={{ backgroundColor: getLanguageColor(selectedRepo.language) }}
                    ></span>
                    {selectedRepo.language}
                  </span>
                  <span>
                    Created: {new Date(selectedRepo.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center text-yellow-400">
                    <FaStar className="mr-1" />
                    {selectedRepo.stars}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition-colors duration-200"
                  onClick={() => handleStarRepo(selectedRepo.id)}
                >
                  <FaStar /> Star
                </button>
                <button className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition-colors duration-200">
                  <FaShare /> Share
                </button>
                <button className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition-colors duration-200">
                  <FaDownload /> Download
                </button>
                <button
                  className="ml-2 text-gray-400 hover:text-white p-1"
                  onClick={() => setSelectedRepo(null)}
                  aria-label="Close modal"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>
            
            <div className="p-4 overflow-auto flex-1">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-300">
                  {selectedRepo.description || "No description provided"}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Project Files</h3>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  {selectedRepo.files?.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedRepo.files.map((file, index) => (
                        <li key={index} className="flex items-center py-1 px-2 hover:bg-gray-800 rounded">
                          {file.endsWith('/') ? (
                            <FaFolder className="text-blue-400 mr-2 flex-shrink-0" />
                          ) : (
                            <span className="w-5 h-5 mr-2"></span>
                          )}
                          <span className="text-gray-300">{file}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">No files available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepositorySection;
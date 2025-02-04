import axios from 'axios';

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL || 'http://localhost:5000/storage';

class StorageService {
  constructor() {
    this.client = axios.create({
      baseURL: STORAGE_URL,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    // Add auth token to requests
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Single file upload
  async uploadFile(file, folder = 'general') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      const response = await this.client.post('/upload', formData);
      return response.data;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }

  // Multiple files upload
  async uploadMultipleFiles(files, folder = 'general') {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('folder', folder);

    try {
      const response = await this.client.post('/upload/multiple', formData);
      return response.data;
    } catch (error) {
      console.error('Multiple upload failed:', error);
      throw error;
    }
  }

  // Delete file
  async deleteFile(fileUrl) {
    try {
      const response = await this.client.delete('/delete', {
        data: { url: fileUrl }
      });
      return response.data;
    } catch (error) {
      console.error('Delete failed:', error);
      throw error;
    }
  }

  // Get full URL for a file path
  getFileUrl(path) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${STORAGE_URL}/${path}`;
  }

  // Specific upload methods for different types
  async uploadProductImage(file) {
    return this.uploadFile(file, 'products');
  }

  async uploadProfileImage(file) {
    return this.uploadFile(file, 'profiles');
  }

  async uploadCategoryImage(file) {
    return this.uploadFile(file, 'categories');
  }

  // Helper method to get image dimensions
  getImageDimensions(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height
        });
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  // Helper method to validate file type
  validateFileType(file, allowedTypes = ['image/jpeg', 'image/png', 'image/gif']) {
    return allowedTypes.includes(file.type);
  }

  // Helper method to validate file size
  validateFileSize(file, maxSizeInMB = 5) {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
  }

  // Helper method to format file size
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Helper method to get file extension
  getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  }

  // Helper method to generate a unique filename
  generateUniqueFilename(originalFilename) {
    const extension = this.getFileExtension(originalFilename);
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${random}.${extension}`;
  }

  // Helper method to check if file is an image
  isImage(file) {
    return file.type.startsWith('image/');
  }

  // Helper method to compress image before upload
  async compressImage(file, { maxWidth = 1920, maxHeight = 1080, quality = 0.8 } = {}) {
    if (!this.isImage(file)) {
      throw new Error('File is not an image');
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }
}

export const storage = new StorageService();
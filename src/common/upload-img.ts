import axios from 'axios';
async function uploadImg(files) {
  const headers = {
    Authorization: `Client-ID ${process.env.IMGUR_URL}`,
  };

  try {
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        const data = file.buffer.toString('base64');
        const response = await axios.post(
          'https://api.imgur.com/3/image',
          data,
          {
            headers,
          },
        );
        if (response.data.data) {
          return response.data.data.link;
        } else {
          throw new Error('Image upload failed.');
        }
      }),
    );

    // 处理响应
    console.log('Image links:', imageUrls);
    return { imageUrls };
  } catch (error) {
    // 处理错误
    console.error('Error uploading images:', error);
    throw new Error(`Error uploading images: ${error.message}`);
  }
}

export default uploadImg;

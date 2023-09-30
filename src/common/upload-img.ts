import axios from 'axios';
import fs from 'fs/promises';
import * as sharp from 'sharp';

async function handleImg(files) {
  try {
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        try {
          // 转换上传的文件为 WebP 格式
          const outputBuffer = await sharp(file.buffer)
            .png({ quality: 80 })
            .toBuffer();

          // 将转换后的 WebP 数据保存到文件或将其发送给客户端
          // const outputPath = '/output-image.webp'; // 设置输出文件路径
          // await fs.writeFile(outputPath, outputBuffer);
          return outputBuffer;
          console.log('done');
        } catch (err) {
          console.error('Error converting image to WebP:', err);
        }
      }),
    );

    // 处理响应
    // console.log('Image links:', imageUrls);
    return imageUrls;
  } catch (error) {
    // 处理错误
    console.error('Error uploading images:', error);
    throw new Error(`Error uploading images: ${error.message}`);
  }
}
async function uploadImg(files) {
  uploadImg2(files);
  return;
  const newFiles: any = await handleImg(files);
  const headers = {
    Authorization: `Client-ID ${process.env.IMGUR_URL}`,
  };

  try {
    const imageUrls = await Promise.all(
      newFiles.map(async (file) => {
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

async function uploadImg2(files) {
  const newFiles: any = await handleImg(files);

  try {
    const imageUrls = await Promise.all(
      newFiles.map(async (file) => {
        const data = file.toString('base64');
        const response = await axios.post(
          'https://api.imgbb.com/1/upload?key=e72373b6ebb62cdec6b09807df7c6001',
          `image=${encodeURIComponent(data)}`, // 将图像数据作为表单数据发送
        );
        if (response.data.data) {
          return response.data.data.url;
        } else {
          throw new Error('Image upload failed.');
        }
      }),
    );

    // 处理响应
    console.log('Image links:', imageUrls);
    return imageUrls;
  } catch (error) {
    // 处理错误
    console.error('Error uploading images:', error);
    throw new Error(`Error uploading images: ${error.message}`);
  }
}

export default uploadImg;

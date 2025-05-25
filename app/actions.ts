'use server'
import {S3Client} from "@aws-sdk/client-s3"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import {nanoid} from "nanoid"

{/* Goated video btw https://www.youtube.com/watch?v=3Knsg3Js8jI*/}
export async function onSubmit(formData: FormData) {
  try {
    const client = new S3Client({
      region: process.env.AWS_Region,
    });

    // ---------- FOto ----------
    const { url: url1, fields: fields1 } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME || '',
      Key: nanoid(),
    });

    const formDataS3_1 = new FormData();
    Object.entries(fields1).forEach(([key, value]) => {
      formDataS3_1.append(key, value);
    });
    formDataS3_1.append('file', formData.get('file1') as File);

    const response1 = await fetch(url1, {
      method: 'POST',
      body: formDataS3_1,
    });

    // ---------- Documento ----------
    const { url: url2, fields: fields2 } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME || '',
      Key: nanoid(),
    });

    const formDataS3_2 = new FormData();
    Object.entries(fields2).forEach(([key, value]) => {
      formDataS3_2.append(key, value);
    });
    formDataS3_2.append('file', formData.get('file2') as File);

    const response2 = await fetch(url2, {
      method: 'POST',
      body: formDataS3_2,
    });

    if (response1.ok && response2.ok) {
      console.log('Both files uploaded');
    } else {
      console.log('Error uploading one or both files');
    }
  } catch (err: any) {
    console.error(err);
  }
}

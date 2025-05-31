'use server'
import { S3Client } from "@aws-sdk/client-s3"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post"
import { nanoid } from "nanoid"

export async function onSubmit(formData: FormData) {
  let compararResultado = null;
  try {
    const client = new S3Client({
      region: process.env.AWS_Region,
    });

    // ---------- Selfie ----------
    const { url: url1, fields: fields1 } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME || '',
      Key: nanoid(),
    });
    const key1 = fields1.key;

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
    const key2 = fields2.key;

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

      const compararResponse = await fetch("http://localhost:8000/comparar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selfie_key: key1,
          document_key: key2,
        }),
      });

      if (!compararResponse.ok) {
        const texto = await compararResponse.text();
        throw new Error("Error al comparar imágenes");
      }

      compararResultado = await compararResponse.json(); // 👈 sin const
      {/*const compararResultado = await compararResponse.json();*/} {/* tonto, por eso no regresaba nada, porque la volvia a delcarar en const*/}
      console.log("Resultado comparación:", compararResultado);

    } else {
      console.log('Error uploading one or both files');
    }
  } catch (err: any) {
    console.error(err);
  }
  
  return compararResultado; {/* esto sera vital para el useState que usaremos luego*/}
  
}

{/* Goated video btw https://www.youtube.com/watch?v=3Knsg3Js8jI*/}
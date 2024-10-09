const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      }
});
const bucketName = 'calvin-netflix-clone';
const s3Upload = async (req,res)=>{
    await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: "my-first-object.txt",
          Body: "Hello JavaScript SDK!",
        })
      );
      res.status(200).json({ message: 'Insert successful'});
      console.log('S3 Bucket')
}

const s3Get = async(req,res)=>{
    try{
    const image = await s3Client.send(
        new GetObjectCommand({
          Bucket: bucketName,
          Key: "posters/Naruto.jpg",
        })
      );
      res.setHeader('Content-Type', image.ContentType);
      res.setHeader('Content-Length', image.ContentLength);
      image.Body.pipe(res);
    }catch(err){
        console.error('Error retrieving from S3:', err);
        res.status(500).send('Error retrieving image from S3');
    }
}


module.exports={
    s3Upload,
    s3Get
}

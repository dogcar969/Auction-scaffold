const pinataSDK = require("@pinata/sdk");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

interface Response {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

async function storeImages(imagesFilePath: string) {
  const fullImagesPath = path.resolve(imagesFilePath);

  // Filter the files in case there's a file that in not a .png, .jpg or .jpeg
  const files = fs.readdirSync(fullImagesPath).filter((file: string) => /\b.png|\b.jpg|\b.jpeg/.test(file));

  const responses: Response[] = [];
  console.log("Uploading to IPFS");

  for (const fileIndex in files) {
    const readableStreamForFile = fs.createReadStream(`${fullImagesPath}/${files[fileIndex]}`);
    const options = {
      pinataMetadata: {
        name: files[fileIndex],
      },
    };
    try {
      await pinata
        .pinFileToIPFS(readableStreamForFile, options)
        .then((result: Response) => {
          responses.push(result);
        })
        .catch((err: any) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }
  return { responses, files };
}

async function storeTokenUriMetadata(metadata: { name: "string" }) {
  const options = {
    pinataMetadata: {
      name: metadata.name,
    },
  };
  try {
    const response = await pinata.pinJSONToIPFS(metadata, options);
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
}

module.exports = { storeImages, storeTokenUriMetadata };

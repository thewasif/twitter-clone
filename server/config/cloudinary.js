const cloudinary = require("cloudinary");
//import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "ddrsfmh8b",
  api_key: "252646448572539",
  api_secret: "1LhADmxpBlCVwUDSRkykAQZOllg",
});

exports.uploads = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: "auto" }
    );
  });
};

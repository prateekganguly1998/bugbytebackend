var async = require("async");
var multer = require("multer");
var multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");
var s3 = require("./s3Conf");
var ep;

var s3Client = s3.s3Client;
const params = s3.uploadParams;
// exports.getSignedURL = (key) => {
//     return new Promise((resolve, reject) => {
//         var urlParams = { Bucket: params.Bucket, Key: key, Expires: 345600 }; // 4 days expiry
//         s3Client.getSignedUrl("getObject", urlParams, function (err, url) {
//             if (err) {
//                 console.log(
//                     "s3Service.getSignedUrl: Error for key: " +
//                         key +
//                         " err: " +
//                         JSON.stringify(err)
//                 );
//                 return reject(err);
//             }
//             return resolve(url);
//         });
//     });
// };

var filefilter = (req, file, cb) => {
    console.log(file.mimetype);
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/webp"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only jpg and png"), false);
    }
};
const upload = multer({
    limits: { fieldSize: 25 * 1024 * 1024 },
    fileFilter: filefilter,
    storage: multerS3({
        s3: s3Client,

        bucket: params.Bucket,
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: "Testing Metadata" });
        },
        key: function (req, file, cb) {
            const unique = uuidv4();

            console.log(file);
            cb(
                null,
                `profileImg/${Date.now().toString()}_${unique}_pimg.${
                    file.mimetype.split("/")[1]
                }`
            );
        },
    }),
});

module.exports = upload;

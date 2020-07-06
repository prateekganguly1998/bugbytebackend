const upload = require("../config/s3Service");
const singleUpload = upload.single("image");
exports.testUpload = (req, res, next) => {
    singleUpload(req, res, function (err) {
        if (err) {
            return res
                .status(422)
                .send({
                    errors: [
                        {
                            title: "Error in uploading image",
                            detail: err.message,
                        },
                    ],
                });
        }
        console.log(req.file.location);
        return res.json(req.file.location);
    });
};


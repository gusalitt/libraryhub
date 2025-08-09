const bookService = require("../services/book.service");
const { validationResult } = require("express-validator");

const getBookDetailData = async (req, res, next) => {
    try {
        if (!req.params.slug) {
            throw new Error("Slug is required");
        }

        const data = await bookService.fetchBookDetail(req.params.slug);

        if (data.error) throw new Error(data.error.message);

        return res.status(200).json({
            status: "success",
            message: "Data fetched successfully",
            data
        });
    } catch (error) {
        next(error);
    }
}


const downloadBookFile = async (req, res, next) => {
    try {
        const { path, filename } = req.query;
        const { buffer, contentType } = await bookService.fetchSignedBookFile(path);

        await bookService.fetchIncrementBookDownload(req.params.slug);

        res.set({
            "Content-Type": contentType,
            "Content-Disposition": `attachment; filename="${filename}.pdf"`,
        });

        res.send(buffer);
    } catch (error) {
        next(error);
    }
}

const getBookReadingPage = async (req, res, next) => {
    try {
        const data = await bookService.fetchBookReadingPage(req.params.slug);

        if (data.error) throw new Error(data.error.message);

        return res.status(200).json({
            status: "success",
            message: "Data fetched successfully",
            data
        });
    } catch (error) {
        next(error);
    }
}

const addBookComment = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "error", message: "Validation failed", errors: errors.array() });
        }

        const { comment, rating } = req.body;
        const { slug } = req.params;
        const userId = req.user.id;

        const data = await bookService.addBookComment(slug, userId, comment, rating);

        return res.status(200).json({
            status: "success",
            message: "Comment added successfully",
            data
        });
    } catch (error) {
        next(error);
    }
}


module.exports = { getBookDetailData, downloadBookFile, getBookReadingPage, addBookComment };

// const downloadBookFile = async (req, res, next) => {
//     try {
//         const { path } = req.query;
//         const { signedUrl, error } = await bookService.fetchSignedBookFile(path);

//         if (error) throw new Error(error.message);

//         await bookService.fetchIncrementBookDownload(req.params.slug);

//         return res.status(200).json({
//             status: "success",
//             message: "Data fetched successfully",
//             signedUrl
//         });
//     } catch (error) {
//         next(error);
//     }
// }

// Api to increment download count
// const incrementBookDownload = async (req, res, next) => {
//     try {
//         const { slug } = req.body;
//         const data = await bookService.fetchIncrementBookDownload(slug);

//         if (data.error) throw new Error(data.error.message);

//         return res.status(200).json({
//             status: "success",
//             message: "Incremented download count successfully",
//         });
//     } catch (error) {
//         next(error);
//     }
// }
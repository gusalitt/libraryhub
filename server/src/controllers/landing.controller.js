const landingService = require("../services/landing.service");

const getLandingData = async (req, res, next) => {
    try {
        const data = await landingService.fetchLandingStats();
        return res.status(200).json({
            status: "success",
            message: "Data fetched successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

const getFilteredBooksData = async (req, res, next) => {
    try {
        const data = await landingService.fetchPaginatedBooks();

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

const getAllCategoriesData = async (req, res, next) => {
    try {
        const { data, error } = await landingService.fetchAllCategories();

        if (error) throw new Error(error.message);

        return res.status(200).json({
            status: "success",
            message: "Data fetched successfully",
            data
        });
    } catch (error) {
        next(error);
    }
}

const getAboutData = async (req, res, next) => {
    try {
        const data = await landingService.fetchCoreStats();
        return res.status(200).json({
            status: "success",
            message: "Data fetched successfully",
            data
        });
    } catch (error) {
        next(error);
    }
}


module.exports = { getLandingData, getFilteredBooksData, getAllCategoriesData, getAboutData };

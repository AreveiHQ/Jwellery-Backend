const Home = require("../model/homePageModel");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dphocopji',
    api_key: '469697768441764',
    api_secret: 's-Diyw5wOQI6SKqSqD3Bqh763pA',
});

// Helper function to upload image to Cloudinary
const uploadImageToCloudinary = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: "slides"
        });
        return result.secure_url; // Return the URL of the uploaded image
    } catch (error) {
        throw new Error("Image upload failed");
    }
};

const addSlide = async (req, res) => {
    try {
        const { images, links, section } = req.body;

        if (!images || !links || !section) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Upload each image to Cloudinary
        const uploadedImages = [];
        for (const image of images) {
            const uploadedImage = await uploadImageToCloudinary(image);
            uploadedImages.push(uploadedImage);
        }

        const home = await Home.create({
            images: uploadedImages,
            links,
            section
        });

        if (!home) {
            return res.status(500).json({
                message: "Slide not added"
            });
        }

        res.status(201).json({
            message: "Slide added successfully",
            home
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSlidesBySection = async (req, res) => {
    try {
        const { section } = req.params;
        const slides = await Home.find({ section });

        if (!slides.length) {
            return res.status(404).json({
                message: "No slides found in this section"
            });
        }

        res.status(200).json({slides:slides});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllSlides = async (req, res) => {
    try {
        const slides = await Home.find({});
        if (!slides.length) {
            return res.status(404).json({
                message: "No slides found"
            });
        }
        res.status(200).json(slides);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateSlide = async (req, res) => {
    try {
        const { id } = req.params;
        const { images, links, section } = req.body;

        // If new images are provided, upload them to Cloudinary
        let uploadedImages;
        if (images && images.length) {
            uploadedImages = [];
            for (const image of images) {
                const uploadedImage = await uploadImageToCloudinary(image);
                uploadedImages.push(uploadedImage);
            }
        }

        const slide = await Home.findByIdAndUpdate(
            id,
            {
                images: uploadedImages || undefined,  // Only update images if provided
                links,
                section
            },
            { new: true }
        );

        if (!slide) {
            return res.status(404).json({ message: "Slide not found" });
        }

        res.status(200).json({
            message: "Slide updated successfully",
            slide
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteSlide = async (req, res) => {
    try {
        const { id } = req.params;

        const slide = await Home.findByIdAndDelete(id);

        if (!slide) {
            return res.status(404).json({ message: "Slide not found" });
        }

        res.status(200).json({ message: "Slide deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addSlide, getSlidesBySection, getAllSlides, updateSlide, deleteSlide };

import api from "@/services/axios";

export const fetchBookDetail = async (slug) => await api.get(`/book/${slug}`);

export const fetchSignedBookFile = async (slug, path, filename) => await api.get(`/book/${slug}/download?path=${path}&filename=${filename}`, {
    responseType: "blob",
});

export const fetchBookReadingPage = async (slug) => await api.get(`/book/${slug}/reading`);

export const fetchBookComments = async (slug, data) => await api.post(`/book/${slug}/comments`, data);

// export const fetchSignedBookFile = async (slug, path) => await api.get(`/book/${slug}/download?path=${path}`);
